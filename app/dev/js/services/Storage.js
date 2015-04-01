(function() {
    'use strict';

    angular
    .module('pomodoro')
    .service('Storage', Storage);

    /**
     * ngInject
     */
    function Storage($window) {

        return {
            set: set,
            get: get
        };

        function set(type, value) {
            $window.localStorage.setItem(type, value);
        }

        function get(type) {
            return $window.localStorage.getItem(type);
        }
    }

})();
