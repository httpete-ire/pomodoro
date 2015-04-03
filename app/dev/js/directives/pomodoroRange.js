(function() {
    'use strict';

    angular
        .module('pomodoro')
        .directive('pomodoroRange',pomodoroRange);

    /**
     * @ngdoc directive
     *
     */
    function pomodoroRange() {

        var template = ['<input class="pomodoro__range pomodoro__range--{{timer}}" type="range" min="{{min}}" max="{{max}}" step="{{step}}" ng-model="time">'].join('');

        return {
            restrict: 'E',
            scope:{
                min:    '@',
                max:    '@',
                step:   '@',
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

            // when the input has changed call the update function
            // on the pomodoro timer
            input.on('change', function(e){
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
