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

        service.setTime = function(type, value) {
            times[type] = Number(value * 60);
        };

        service.getTime = function(type) {
            return times[type] || 0;
        };

        service.getMsg = function(type) {
            var time = times[type];

            if (type !== 'active') {
                return 'enjoy a ' + time + ' min break';
            } else {
                return 'keep up the good work, only ' + time + ' mins till your next break'
            }
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
