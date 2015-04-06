(function() {
    'use strict';

    angular
    .module('pomodoro')
    .service('Storage', Storage);

    /**
     * @ngdoc service
     * @name pomodoro.service:Storage
     * @description ability to persist data in localStorage
     * @requires '$window'
     * @author Peter Redmond https://github.com/httpete-ire
     * @returns {Object} get and set methods attached to object
     *
     * ngInject
     */
    function Storage($window) {

        return {
            set: set,
            get: get
        };

        /**
         * persist the data by storing in localStorage
         *
         * @param  {String} key : key to access data
         * @param  {?} value : value of data to store
         */
        function set(key, value) {
            $window.localStorage.setItem(key, value);
        }

        /**
         * retrieve the value from localstore
         *
         * @param  {String} key : key to access data
         * @return {String}  localStorage can only store Strings
         */
        function get(key) {
            return $window.localStorage.getItem(key);
        }
    }

})();
