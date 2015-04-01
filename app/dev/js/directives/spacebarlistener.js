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

        function link(scope) {
            $document.bind('keydown', function(e) {
                if (e.keyCode === SPACE_KEY) {
                    scope.listener();
                    scope.$apply();
                }
            });
        }
    }

})();
