(function() {
    'use strict';

    angular
    .module('pomodoro')
    .service('TimerSettings', TimerSettings);

    /**
     * @ngdoc service
     * @name pomodoro.service:TimerSettings
     * @description methods for accessing timer settings
     * @requires '$window', 'Storage'
     * @author Peter Redmond https://github.com/httpete-ire
     * @returns {Object} Object with 'setTime', 'getTime, 'getMsg
     *
     * @ngInject
     */
    function TimerSettings($window, Storage) {

        // on start up set values to localStorage
        var times = {
            shortBreak: Storage.get('shortBreak') || 3,
            longBreak: Storage.get('longBreak') || 15,
            active: Storage.get('active') || 25
        };

        // return object with methods attached
        return {
            setTime: setTime,
            getTime: getTime,
            getMsg: getMsg,
            setNotification: setNotification,
            getNotification: getNotification
        };

        /**
         * set the time for the timer, set on the times object and
         * persist the data in localStorage
         *
         * @param {String} type : timer type eg 'shortBreak'
         * @param {Number} value : time to set, eg 25
         */
        function setTime(type, value) {

            if (!angular.isNumber(value)) {
                return false;
            }

            times[type] = Number(value);

            // persist the time data
            Storage.set(type, value);
        }

        /**
         * retrieve the required time in minutes, if value not
         * set return 0
         *
         * @param  {String} type : timer type eg 'shortBreak'
         * @return {Number}
         */
        function getTime(type) {
            return times[type] * 60 || 0;
        }
        /**
         * return a message based on the current active timer,
         * message is output the desktop notification
         *
         * @param  {String} type : timer type eg 'shortBreak'
         * @return {String}      message to output to notification
         */
        function getMsg(type) {
            var time = times[type];

            if (type !== 'active') {
                return 'enjoy a ' + time + ' min break';
            } else {
                return 'keep up the good work, only ' + time + ' mins till your next break';
            }
        }

        /**
         * store if the type of notifcation ('desktop', 'audio') should be set
         *
         * @param {String} type : timer type eg 'shortBreak'
         * @param {boolean} value :: value to set, stored as string
         */
        function setNotification(type, value) {
            Storage.set(type, value);
        }

        /**
         * retrieve if the notifcation is active or not from localStorage,
         * localStorage can only store Strings so boolean values are converted
         * to string on input, a simple comparision is used to return a valid
         * boolean
         *
         * @param  {String} type : timer type eg 'shortBreak'
         * @return {Boolean}
         */
        function getNotification(type) {
            return (Storage.get(type) === 'true') || false;
        }
    }

})();
