(function () {
    'use strict';

    angular
    .module('pomodoro')
    .directive('toggle', toggle);


    function toggle () {
        return {
            restrict: 'E',
            scope: {
                notification: '=',
                change: '&'
            },
            template: [ '<div class="toggle">',
                            '<input type="checkbox" class="toggle__checkbox" ng-model="notification" ng-click="change()">',
                            '<span class="toggle__switch"></span>',
                            '<span class="toggle__track"></span>',
                        '</div>'
                    ].join(''),

        };
    }

})();
