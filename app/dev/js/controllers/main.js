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
            paused: true,
            btn: 'paused',
            background: 'active',
            settings: false
        };

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
                vm.states.started = true;
                vm.states.paused = false;

                // timer hasnt been started so we activate it
                vm.pomodoro.start();

            } else if (vm.pomodoro.isPaused()) {
                vm.states.paused = false;

                // timer is paused so we resume it
                vm.pomodoro.resume();
            } else {
                vm.states.paused = true;

                // timer is active so we pause it
                vm.pomodoro.pause();
            }

            // set btn text
            vm.btnText = vm.setBtn();
        }

        // set text on btn depedning on the app state
        vm.setBtn = function () {

            // if timer is new
            if (!vm.states.started) {
                return 'start';
            }

            return (!vm.states.paused) ? 'pause' : 'resume';
        };

        vm.toggleSettings = function () {
            vm.states.settings = !vm.states.settings;
        }

        vm.btnText = vm.setBtn();

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
