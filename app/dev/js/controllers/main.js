(function () {

    'use strict';

    angular
    .module('pomodoro')
    .controller('MainCtrl', MainCtrl);

    /**
     * @ngdoc function
     * @name pomodoro.controller: MainCtrl
     *
     * @description
     * Controller of the pomodoro
     */
    function MainCtrl (Pomodoro, $scope, TimeParser) {

        var vm = this;

        // store the state of the UI in an obejct
        vm.states = {
            started: false,
            btn: 'paused',
            background: 'active'
        };

        vm.pomodoro = new Pomodoro (function(time){
            vm.setTime(time);
        });

        vm.time = TimeParser.parse(vm.pomodoro.getDuration());

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
            vm.time = TimeParser.parse(value);

            $scope.$apply();
        }

        $scope.$on('typeChange', function(e, data){
            vm.states.background = data.type;
        });
    }

    MainCtrl.$inject = ['Pomodoro', '$scope', 'TimeParser'];

})();
