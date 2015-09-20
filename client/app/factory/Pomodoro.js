(function() {

    'use strict';

    angular
    .module('pomodoro')
    .factory('Pomodoro', Pomodoro);

    /**
     * @ngdoc pomodoro
     * @name app.factory: Pomodoro
     * @requires 'Timer', '$rootScope', 'Notifier', 'TimerSettings'
     * @description pomodoro object that keeps track of the timer state
     * and set notifications if required
     * @author Peter Redmond https://github.com/httpete-ire
     *
     * @ngInject
     */
    function Pomodoro(Timer, $rootScope, Notifier, TimerSettings) {

        var timerType;

        /**
         * object that contains the count, the type of timer
         * a callback to execute on every tick
         *
         * @param  {Function} cb
         */
        function _pomodoro(cb) {
            /*jshint validthis:true */
            this._callback = cb;
            this._duration = TimerSettings.getTime('active');
            this._count = 0;
            this._isBreak = false;
            this._timer = null;
            this._isPaused = true;
            this._notifier = new Notifier();
            this._desktopNotification = false;
            this._audioNotification = false;
            this._state = 'active';
        }

        /**
         * function to get exectued when timer is complete, call either
         * desktop or audio notifications if required. Increment
         * the timer count and toggle break
         */
        _pomodoro.prototype.complete = function() {

            var type;

            // increment the count only when active
            if (!this._isBreak) {
                this._count++;
            }

            // if notifactions are on on set message
            if (this._desktopNotification) {
                this.setDesktopNotification();
            }

            // play audio if set
            if (this._audioNotification) {
                this._notifier.playSound();
            }

            type = (this._isBreak) ? 'active' : 'break';

            // brodacast type change
            $rootScope.$broadcast('typeChange', {
                type: type
            });

            // toggle breaks
            this._isBreak = !this._isBreak;

            // reset the web worker timer
            this.cancelTimer();

            this.start();
        };

        /**
         * set the timer type and state and start timer
         */
        _pomodoro.prototype.start = function() {

            if (this._timer) {
                return;
            }

            this._timer = true;

            if (this._isBreak && this._count % 4 === 0) {
                timerType = 'break';
                this._state = 'longBreak';
            } else if (this._isBreak && this._count % 4 !== 0) {
                // after every timer set a short break
                timerType = 'break';
                this._state = 'shortBreak';
            } else {
                timerType = 'active';
                this._state = 'active';
            }

            this.run();
        };

        /**
         * reset the timer by cancelling it and then restarting it
         */
        _pomodoro.prototype.reset = function() {
            this.cancelTimer();
            this.run();
        };

        /**
         * cancel the web worker timer
         */
        _pomodoro.prototype.pause = function() {
            this.cancelTimer();
        };

        /**
         * clear the timer
         */
        _pomodoro.prototype.cancelTimer = function() {
            this._isPaused = true;
            Timer.clearTimer();
            this._timer = false;
        };

        /**
         * resume the timer by calling the start method on it without passing
         * a time as a parmaeter
         */
        _pomodoro.prototype.resume = function() {
            this._isPaused = false;
            Timer.startTimer({
                callback: this._callback,
                self: this
            });
        };

        /**
         * start the timer and pass it an object with the time, a callback
         * function and a refence to the pomodoro object
         */
        _pomodoro.prototype.run = function() {

            this._duration = TimerSettings.getTime(this._state);

            this._isPaused = false;

            Timer.startTimer({
                time: this._duration,
                callback: this._callback,
                self: this
            });

        };

        /**
         * return the duration of the timer
         */
        _pomodoro.prototype.getDuration = function() {
            return TimerSettings.getTime(this._state);
        };

        /**
         * return if the timer is active
         */
        _pomodoro.prototype.isPaused = function() {
            return this._isPaused;
        };

        /**
         * check if desktop notifactions are supported
         */
        _pomodoro.prototype.noticaftions = function() {
            return this._notifier.isSupported();
        };

        /**
         * set the notifications on the pomodoro object
         */
        _pomodoro.prototype.allowNotifaction = function(desktop, audio) {
            this._desktopNotification = desktop;
            this._audioNotification = audio;
        };

        /**
         * set the correct desktop notification based on the state
         */
        _pomodoro.prototype.setDesktopNotification = function() {

            if (!this._isBreak) {

                // check to see if its a long or short break
                if (this._count % 4 === 0) {
                    this._notifier.setNotifaction(TimerSettings.getMsg('longBreak'), 'break');
                } else {
                    this._notifier.setNotifaction(TimerSettings.getMsg('shortBreak'), 'break');
                }

            } else {
                this._notifier.setNotifaction(TimerSettings.getMsg('active'), 'active');
            }

        };

        return _pomodoro;
    }

})();
