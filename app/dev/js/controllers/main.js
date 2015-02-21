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
    function MainCtrl (Pomodoro, $scope, TimeParser, $document) {

        var vm = this;

        // store the state of the UI in an obejct
        vm.states = {
            started: false,
            btn: 'paused',
            background: 'active'
        };

        vm.btnText = 'Start';

        // create a new instance of the pomodoro object
        // and set the tick function to be executed every second
        vm.pomodoro = new Pomodoro (function(time){
            vm.setTime(time);
        });

        // set the time to that of the pomodoro
        vm.time = TimeParser.parse(vm.pomodoro.getDuration());

        // return if the timer is active or not
        vm.isPaused = function () {
            return vm.states.btn === 'paused';
        }

        // set the time on the view
        // parse the time so it is formatted correctly
        vm.setTime = function (value) {
            vm.time = TimeParser.parse(value);
            $scope.$apply();
        }

        // toggle the timer from start to pause
        vm.toggleTimer = function () {

            if (!vm.states.started) {

                // timer hasnt been started so we activate it
                vm.states.started = true;
                vm.btnText = 'pause';
                vm.pomodoro.start();
            } else if (vm.pomodoro.isPaused()) {
                vm.btnText = 'pause';
                // timer is paused so we resume it
                vm.pomodoro.resume();
            } else {
                vm.btnText = 'resume';
                // timer is active so we pause it
                vm.pomodoro.pause();

            }

        }

        // listen for tpyeChange events and update the background
        // depending on the timer type
        $scope.$on('typeChange', function(e, data){
            vm.states.background = data.type;
        });

        //
        // bind keyboard events
        //
        $document.bind('keydown', function(e) {

            var SPACE = 32;

            if (e.keyCode === SPACE) {
                vm.toggleTimer();

                // call the digest to the btn text updates
                $scope.$apply();
            }
        });

    }

    MainCtrl.$inject = ['Pomodoro', '$scope', 'TimeParser', '$document'];

})();
