(function () {
    'use strict';

    angular
    .module('pomodoro')
    .directive('spacebarListener',spacebarListener);

    var SPACE = 32;

    function spacebarListener ($document) {
        return {
            restrict: 'A',
            scope: {
                listener: '&'
            },
            link: function (scope, elem, attr) {

                $document.bind('keydown', function(e) {

                    if (e.keyCode === SPACE) {

                        scope.listener();

                        scope.$apply();
                    }

                });

            }
        };
    }

})();
