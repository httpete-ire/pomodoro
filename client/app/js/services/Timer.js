(function() {

    'use strict';

    angular
    .module('pomodoro')
    .service('Timer', Timer);

    /**
     * @ngdoc pomodoro
     * @name pomodoro.service: Timer
     * @author Peter Redmond https://github.com/httpete-ire
     * @description
     * controller to handle the web worker timer
     *
     * @ngInject
     */
    function Timer() {

        var _timer = {};

        // create a new web worker
        var worker = new Worker('./js/utility/timer-worker.js');

        var started = false;

        return {
            startTimer: startTimer,
            clearTimer: clearTimer,
            isActive: isActive
        };

        /**
         * start the timer and then handle the web workers response,
         * 'tick' : invokes the callback function every second
         * 'complete' : invokes the complete function when the timer is done
         *
         * @param  {Object} config
         */
        function startTimer(config) {

            worker.postMessage({
                command: 'start',
                time: config.time
            });

            worker.onmessage = function(e) {

                if (e.data.started) {
                    started = e.data.started;
                    return started;
                }

                switch (e.data.message) {
                    case 'tick':
                        config.callback.call(this, e.data.time);
                        break;
                    case 'complete':
                        config.self.complete.call(config.self);
                        break;
                }

            };

        }

        /**
         * if a timer has been started clear it
         */
        function clearTimer() {
            // only clear an active timer
            if (!started) {
                return;
            }

            worker.postMessage({
                command: 'clear'
            });

            worker.onmessage = function(e) {
                started = !e.data.cleared;
            };
        }

        /**
         * return if the timer is active or not
         */
        function isActive() {
            return started;
        }


    }

})();
