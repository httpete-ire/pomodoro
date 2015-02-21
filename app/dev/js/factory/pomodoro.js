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
    function Pomodoro (Timer) {

        var times = {
            short_break: 3,
            long_break: 9,
            active: 15
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
            this._complete = null;
        }

        _pomodoro.prototype.complete = function() {

            // increment the count only when active
            if (!this.isBreak) {
                this._count++;
            }

            // toggle breaks
            this._isBreak = !this._isBreak;

            this.start();
        };

        _pomodoro.prototype.start = function(cb) {

            if (this._timer) {
                return;
            }

            this._timer = true;

            // set complete callback
            if(!this._complete) {
                this._complete = cb;
            }

            var timerType;

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

        return _pomodoro;
    }

})();
