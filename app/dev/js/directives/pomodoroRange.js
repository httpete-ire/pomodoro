(function() {
    'use strict';

    angular
        .module('pomodoro')
        .directive('pomodoroRange',pomodoroRange);

    // .pomodoro__range--active::-webkit-slider-runnable-track

    /**
     * @ngdoc directive
     *
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
                time:   '=',
                timer:  '@',
                update: '&'
            },
            template: template,
            link: link
        }

        function link(scope, elem, attr) {
            var input = elem.find('input');
            var min = attr['min'];
            var max = attr['max'];

            scope.perc = calcPercent(min, max, scope.time);

            // calculate the percentage of the slider
            input.on('input', function(e) {
                scope.perc = calcPercent(min, max, this.value);
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
