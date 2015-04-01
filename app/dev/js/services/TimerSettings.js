(function() {
    'use strict';

    angular
    .module('pomodoro')
    .service('TimerSettings', TimerSettings);

    /**
     * @ngdoc service
     * @name pomodoro.service:TimerSettings
     * @description store the timer settings
     *
     * @ngInject
     */
    function TimerSettings($window) {
        var service = {};

        service.setNotification = function(type, value) {
            $window.localStorage.setItem(type, value);
        };

        service.getNotification = function(type) {
            return ($window.localStorage.getItem(type) === 'true') || false;
        };

        return service;
    }

})();
