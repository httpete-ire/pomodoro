(function() {
    'use strict';

    angular.module('pomodoro')
    .directive('settingsListener', settingsListener);

    /**
     * @ngDoc directive
     * @name pomodoro.directive:settingsListener
     * @description bind a listener to the esc keydown
     * @restrict A
     * @scope
     * @requires '$document'
     * @author Peter Redmond https://github.com/httpete-ire
     *
     * @ngInject
     */
    function settingsListener($document) {

        var ESC_CAP = 27;

        return {
            restrict: 'A',
            scope: {
                listener: '&',
                open: '='
            },
            link: link
        };

        // bind a keydown event that will clode the settings panel if it
        // is open
        function link(scope, elem, attr) {
            $document.on('keydown', function(e) {
                // if settings panel is open and esc key is
                // pressed close panel
                if (scope.open && e.keyCode === ESC_CAP) {
                    scope.listener();
                    scope.$apply();
                }
            });
        }
    }

})();
