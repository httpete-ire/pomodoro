(function() {

    'use strict';

    angular
    .module('pomodoro')
    .service('TimeParser', TimeParser);

    /**
     * @ngdoc function
     * @name doro.service: TimeParser
     * @author Peter Redmond https://github.com/httpete-ire
     * @description service to parse a time and format it in the
     * mm : ss format
     *
     * @ngInject
     */
    function TimeParser() {


        return {
            parse: parse
        }

        /**
         * format the number for the timer so it
         * displays consistently no mater the time eg 01 : 34
         *
         * @param  {Number} value : time to format
         * @return {String}
         */
        function parse(value) {
            if (isNaN(value)) {
                return '';
            }

            var mins;
            var secs;

            mins = prefixTime(Math.floor(value / 60));

            secs = prefixTime(value - (mins * 60));

            return mins + ' : ' + secs;
        }

        /**
         * prefix a 0 to a single digit
         *
         * @param  {Number} value
         * @return {String} prefixed value
         */
        function prefixTime(value) {
            return (value < 10) ? '0' + value : value;
        }

    }

})();
