(function() {
    'use strict';

    angular
        .module('pomodoro')
        .directive('pomodoroRange',pomodoroRange);

    /**
     * @ngdoc directive
     * @name pomodoro.directive: pomodoroRange
     * @description custom range input with listeners for 'input' and
     * 'change' events
     * @restrict A 'E' eg. <pomodoro-range></pomodoro-range>
     * @scope
     * @author Peter Redmond https://github.com/httpete-ire
     */
    function pomodoroRange() {

        var template = ['<div class="pomodoro-range__container">',
                            '<p class="pomodoro__label">{{label}}</p>',
                            '<input class="pomodoro__range pomodoro__range--{{timer}}" type="range" min="{{min}}" max="{{max}}" step="{{step}}" ng-model="time">',
                            '<span class="pomodoro__time">{{time}}</span>',
                            '<style>.pomodoro__range--{{timer}}::-webkit-slider-runnable-track{background-size:{{perc}}% 100%</style>',
                        '</div>'].join('');

        return {
            restrict: 'E',
            scope:{
                min:    '@',
                max:    '@',
                step:   '@',
                label:  '@',
                timer:  '@',
                time:   '=',
                update: '&'
            },
            template: template,
            link: link
        }

        /**
         * link function for directive, bind 'input' and 'change'
         * events on the range input to update the pomodoro time
         *
         * @param  {Object} scope
         * @param  {Object} elem
         * @param  {Object} attr
         */
        function link(scope, elem, attr) {
            var input = elem.find('input');

            // set the percentage of the timer range input
            scope.perc = calcPercent(scope.min, scope.max, scope.time);

            // calculate the percentage of the slider
            input.on('input', function(e) {
                scope.perc = calcPercent(scope.min, scope.max, this.value);
                scope.$apply();
            });

            // when the input has changed call the update function
            // on the pomodoro timer
            input.on('change', function(e) {
                scope.update({
                    timer: String(scope.timer),
                    time: Number(scope.time)
                });
            });
        }

        /**
         * calculate the percentage based on the value,
         * the minimum the value can be and the maximum it
         * can be set to
         *
         *
         * @return {Number} percentage
         */
        function calcPercent(min, max, value) {
            return 100 * ((value - min) / (max - min));
        }
    }

})();
