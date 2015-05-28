(function() {
    'use strict';

    angular
    .module('pomodoro')
    .directive('spacebarListener', spacebarListener);

    /**
     * @ngdoc directive
     * @name pomodoro.directive:spacebarListener
     * @description bind a listener to a spacebar keydown
     * @restrict A
     * @scope
     * @requires '$document'
     * @author Peter Redmond https://github.com/httpete-ire
     *
     * @ngInject
     */
    function spacebarListener($document) {

        var SPACE_KEY = 32;

        return {
            restrict: 'A',
            scope: {
                listener: '&'
            },
            link: link
        };

        /**
         * link function to bind listeners to keydown events on
         * the
         *
         * @param  {Object} scope
         */
        function link(scope) {
            $document.on('keydown', function(e) {
                if (e.keyCode === SPACE_KEY) {
                    scope.listener();
                    scope.$apply();
                }
            });
        }
    }

})();
