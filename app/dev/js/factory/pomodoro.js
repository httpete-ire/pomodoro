(function() {

    'use strict';

    angular
    .module('pomodoro')
    .factory('Pomodoro', Pomodoro);

    /**
     * @ngdoc function
     * @name app.factory: Pomodoro
     *
     * @description
     * Factory of the app
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

        // call this function when the timer has complete
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

            this.cancelTimer();
            this.start();
        };

        // start a new timer using the set times
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

        _pomodoro.prototype.reset = function() {
            this.cancelTimer();
            this.run();
        };

        // pause the timer by clearing it
        _pomodoro.prototype.pause = function() {
            this.cancelTimer();
        };

        // clear the timer and remove the refernce to it
        _pomodoro.prototype.cancelTimer = function() {
            this._isPaused = true;
            Timer.clearTimer();
            this._timer = false;
        };

        // start the timer but dont pass a time
        // the timer keeps the current time
        _pomodoro.prototype.resume = function() {
            this._isPaused = false;
            Timer.startTimer({
                callback: this._callback,
                self: this
            });
        };

        // start the timer and pass it an object with the time, a callback
        // function and a refence to the pomodoro object
        _pomodoro.prototype.run = function() {

            this._duration = TimerSettings.getTime(this._state);

            this._isPaused = false;

            Timer.startTimer({
                time: this._duration,
                callback: this._callback,
                self: this
            });

        };

        // return how long the timer was set for
        _pomodoro.prototype.getDuration = function() {
            return TimerSettings.getTime(this._state);
        };

        // return if the timer is active
        _pomodoro.prototype.isPaused = function() {
            return this._isPaused;
        };

        /**
         * check if desktop notifactions are supported
         *
         */
        _pomodoro.prototype.noticaftions = function() {
            return this._notifier.isSupported();
        };

        /**
         * toggle notifactions
         *
         */
        _pomodoro.prototype.allowNotifaction = function(allowNotifcations) {
            this._desktopNotification = allowNotifcations;
        };

        _pomodoro.prototype.setDesktopNotification = function() {

            if (!this._isBreak) {

                // check to see if its a long or short break
                if (this._count % 4 === 0) {
                    this._notifier.setNotifaction(TimerSettings.getMsg('longBreak'));
                } else {
                    this._notifier.setNotifaction(TimerSettings.getMsg('shortBreak'));
                }

            } else {
                this._notifier.setNotifaction(TimerSettings.getMsg('active'));
            }

        };

        return _pomodoro;
    }

})();
