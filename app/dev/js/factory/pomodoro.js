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
    function Pomodoro(Timer, $rootScope, Notifier) {

        var timerType;

        // private variables
        var times = {
            shortBreak: 10,
            longBreak: 15,
            active: 30
        };

        // messages for the notifications
        var messages = {
            shortBreak: 'enjoy a ' + times.shortBreak + ' min break',
            longBreak: 'enjoy a ' + times.longBreak + ' min break, you deserve it',
            active: 'keep up the good work, only ' + times.active + ' mins till your next break'
        };

        /**
         * object that contains the count, the type of timer
         * a callback to execute on every tick
         *
         * @param  {Function} cb
         */
        function _pomodoro(cb) {
            /*jshint validthis:true */
            this._callback = cb;
            this._duration = times.active;
            this._count = 0;
            this._isBreak = false;
            this._timer = null;
            this._isPaused = true;
            this._notifier = new Notifier();
            this._desktopNotification = false;
            this._audioNotification = false;
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

                this._duration = times.longBreak;
                timerType = 'break';

            } else if (this._isBreak && this._count % 4 !== 0) {
                // after every timer set a short break
                this._duration = times.shortBreak;
                timerType = 'break';

            } else {
                // else a normal timer (25 mins)
                this._duration = times.active;
                timerType = 'active';
            }

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

            this._isPaused = false;

            Timer.startTimer({
                time: this._duration,
                callback: this._callback,
                self: this
            });

        };

        // return how long the timer was set for
        _pomodoro.prototype.getDuration = function() {
            return this._duration;
        };

        // return if the timer is active
        _pomodoro.prototype.isPaused = function() {
            return this._isPaused;
        };

        // update the settings of the timer
        _pomodoro.prototype.updateSettings = function(settings) {

            if (!angular.isObject(settings)) {
                return false;
            }

            // update the times
            times = {
                active: settings.active || times.active,
                short_break: settings.short_break || times.shortBreak,
                long_break: settings.long_break || times.longBreak
            };

            // update the timer settings
            this._duration = times.active;

            // reset the settings
            this.cancelTimer();
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
                    this._notifier.setNotifaction(messages.longBreak);
                } else {
                    this._notifier.setNotifaction(messages.shortBreak);
                }

            } else {
                this._notifier.setNotifaction(messages.active);
            }

        };

        return _pomodoro;
    }

})();
