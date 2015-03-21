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
                change: '&',
                label: '@',
                klass: '@'
            },
            template: [
            '<div class="toggle__container {{klass}}">',
                '<p class="toggle__label">{{label}}</p>',
                '<div class="toggle">',
                    '<input type="checkbox" class="toggle__checkbox" ng-model="notification" ng-click="change()">',
                    '<b class="toggle__switch"></b>',
                    '<b class="toggle__track"></b>',
                '</div>',
            '</div>'
            ].join(''),
        };
    }

})();
