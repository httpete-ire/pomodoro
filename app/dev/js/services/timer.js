(function () {

    'use strict';

    angular
    .module('pomodoro')
    .service('Timer', Timer);

    /**
     * @ngdoc function
     * @name pomodoro.service: Timer
     *
     * @description
     * Service of the pomodoro
     *
     * @ngInject
     */
    function Timer () {

        var _timer = {};

        // create a new web worker
        var worker = new Worker('./dev/js/utility/timer-worker.js');

        var started = false;

        _timer.startTimer = function (config) {

            worker.postMessage({
                command: 'start',
                time: config.time
            });

            worker.onmessage = function (e) {

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

        };

        _timer.clearTimer = function () {
            // only clear an active timer
            if (!started) {
                return;
            }

            worker.postMessage({
                command: 'clear'
            });

            worker.onmessage = function (e) {
                started = !e.data.cleared;
            }
        };

        _timer.isActive = function () {
            return started;
        };

        return _timer;
    }

})();
