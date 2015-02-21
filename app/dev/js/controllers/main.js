(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name pomodoro.controller: MainCtrl
     *
     * @description
     * Controller of the pomodoro
     */
    function MainCtrl () {

        var vm = this;

        vm.title = 'Hello world!!!';

    }

    angular
    .module('pomodoro')
    .controller('MainCtrl', MainCtrl);


})();
