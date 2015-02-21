(function () {

    'use strict';

    angular
    .module('pomodoro')
    .service('TimeParser', TimeParser);

    /**
     * @ngdoc function
     * @name doro.service: TimeParser
     *
     * @description
     * Service of the doro
     *
     * @ngInject
     */
    function TimeParser () {

        var _TimeParser = {};

        // format a number for the timer
        // eg "10 : 25"
        _TimeParser.parse = function (value) {

            if(isNaN(value)) {
                return '';
            }

            var mins,
                secs;

            mins = prefixTime(Math.floor(value / 60));

            secs = prefixTime(value - (mins * 60));

            return mins + ' : ' + secs;
        };

        return _TimeParser;
    }

    /**
     * prefix a 0 to a single digit
     *
     * @param  {Number} value
     * @return {String} prefixed value
     */
    function prefixTime (value) {
        return (value < 10) ? '0' + value : value;
    }

})();
