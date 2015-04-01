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

        var times = {
            shortBreak: 10,
            longBreak: 15,
            active: 3
        };

        var messages = {
            shortBreak: 'enjoy a ' + times.shortBreak + ' min break',
            longBreak: 'enjoy a ' + times.longBreak + ' min break, you deserve it',
            active: 'keep up the good work, only ' + times.active + ' mins till your next break'
        };

        service.setTime = function(type, value) {
            times[type] = value;
        };

        service.getTime = function(type) {
            return times[type] || 0;
        };

        service.getMsg = function(type) {
            return messages[type] || 'Beam me up Scotty!!!';
        };

        service.setNotification = function(type, value) {
            $window.localStorage.setItem(type, value);
        };

        service.getNotification = function(type) {
            return ($window.localStorage.getItem(type) === 'true') || false;
        };

        return service;
    }

})();
