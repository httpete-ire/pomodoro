(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name pomodoro.controller: MainCtrl
     *
     * @description
     * Controller of the pomodoro
     */
    function MainCtrl (Pomodoro, $scope) {

        var vm = this;

        // store the state of the UI in an obejct
        vm.states = {
            started: false,
            btn: 'paused'
        };

        vm.time = '00 : 00';

        vm.pomodoro = new Pomodoro (function(time){
            vm.setTime(time);
        });

        vm.start = function () {
            (!vm.states.started) ? vm.pomodoro.start() : vm.pomodoro.resume();
            vm.states.started = true;
            vm.states.btn = 'active';
        }

        vm.pause = function () {
            vm.pomodoro.pause();
            vm.states.btn = 'paused';
        }

        vm.isPaused = function () {
            return vm.states.btn === 'paused';
        }

        vm.setTime = function (value) {
            vm.time = value;

            $scope.$apply();
        }
    }

    MainCtrl.$inject = ['Pomodoro', '$scope'];

    angular
    .module('pomodoro')
    .controller('MainCtrl', MainCtrl);


})();
