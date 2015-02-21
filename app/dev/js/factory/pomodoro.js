(function () {

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
    function Pomodoro (Timer, $rootScope) {

        var timerType;

        var times = {
            short_break: 300,
            long_break: 900,
            active: 3
        };

        /**
         * object that contains the count, the type of timer
         * a callback to execute on every tick
         *
         * @param  {Function} cb
         */
        function _pomodoro (cb) {

            this._callback = cb;
            this._duration = times.active;
            this._count = 0;
            this._isBreak = false;
            this._timer = null;
        }

        _pomodoro.prototype.complete = function() {

            var type;

            // increment the count only when active
            if (!this._isBreak) {
                this._count++;
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

        _pomodoro.prototype.start = function() {

            if (this._timer) {
                return;
            }

            this._timer = true;

            if (this._isBreak && this._count % 4 === 0) {

                this._duration = times.long_break;
                timerType = 'break';

            } else if (this._isBreak && this._count % 4 !== 0) {
                    // after every timer set a short break
                this._duration = times.short_break;

                timerType = 'break';

            } else {
                    // else a normal timer (25 mins)
                this._duration = times.active;

                timerType = 'active';
            }

            this.run();
        };

        _pomodoro.prototype.pause = function(first_argument) {
            this.cancelTimer();
        };

        _pomodoro.prototype.cancelTimer = function() {
            Timer.clearTimer();
            this._timer = false;
        };

        _pomodoro.prototype.resume = function() {
            Timer.startTimer({
                callback: this._callback,
                self: this
            });
        };

        _pomodoro.prototype.run = function() {

            var _this = this;

            Timer.startTimer({
                time: this._duration,
                callback: this._callback,
                self: this
            });

        };

        _pomodoro.prototype.getDuration = function() {
            return times.active;
        };

        return _pomodoro;
    }

})();
