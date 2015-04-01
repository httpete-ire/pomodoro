(function() {

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
     *
     * @ngInject
     */
    function MainCtrl(Pomodoro, $scope, TimeParser) {

        var vm = this;

        // store the state of the UI in an object
        vm.states = {
            started: false,
            paused: true,
            btn: 'paused',
            background: 'active',
            settings: false,
            allowNotifactions: false
        };

        vm.models = {
            notifications: (localStorage.notifications === 'true') || false,
            audioNotifications: (localStorage.audioNotifications === 'true') || false
        };

        vm.init = function() {

            // create a new instance of the pomodoro object
            // and set the tick function to be executed every second
            vm.pomodoro = new Pomodoro (function(time) {
                vm.setTime(time);
            });

            // set the time to that of the pomodoro
            vm.time = TimeParser.parse(vm.pomodoro.getDuration());

            // see if allowNotifactionss are supported
            vm.states.allowNotifactions = vm.pomodoro.noticaftions();

            // set btn text
            vm.timerState = vm.setBtn();

            // set weither the timer should notify when complete
            vm.pomodoro.allowNotifaction(vm.models.notifications);
        };

        // return if the timer is active or not
        vm.isPaused = function() {
            return vm.states.btn === 'paused';
        };

        // set the time on the view
        // parse the time so it is formatted correctly
        vm.setTime = function(value) {
            vm.time = TimeParser.parse(value);
            $scope.$apply();
        };

        // toggle the timer from start to pause
        vm.toggleTimer = function() {

            if (!vm.states.started) {
                vm.states.started = true;
                vm.states.paused = false;

                vm.closeSettings();

                // timer hasnt been started so we activate it
                vm.pomodoro.start();

            } else if (vm.pomodoro.isPaused()) {

                vm.states.paused = false;

                vm.closeSettings();

                // timer is paused so we resume it
                vm.pomodoro.resume();
            } else {
                vm.states.paused = true;

                // timer is active so we pause it
                vm.pomodoro.pause();
            }

            // set btn text
            vm.timerState = vm.setBtn();
        };

        // set text on btn depedning on the app state
        vm.setBtn = function() {

            // if timer is new
            if (!vm.states.started) {
                return 'start';
            }

            return (!vm.states.paused) ? 'pause' : 'resume';
        };

        vm.toggleSettings = function() {
            vm.states.settings = !vm.states.settings;
        };

        vm.closeSettings = function() {
            vm.states.settings = false;
        };

        vm.allowDesktopNotifications = function() {
            // ask the user to allow desktop notifications
            vm.pomodoro._notifier.grantPermission();

            // store the result in localStorage to persist the settings
            localStorage.setItem('notifications', vm.models.notifications);

            // toggle the notifer
            vm.pomodoro.allowNotifaction(vm.models.notifications);
        };

        vm.toggleAudioNotifications = function() {

            // store the result in localStorage to persist the settings
            localStorage.setItem('audioNotifications', vm.models.audioNotifications);

            vm.pomodoro._audioNotification = vm.models.audioNotifications;
        };

        // listen for typeChange events and update the background
        // depending on the timer type
        $scope.$on('typeChange', function(e, data) {
            vm.states.background = data.type;
        });

    }

    MainCtrl.$inject = ['Pomodoro', '$scope', 'TimeParser'];

})();
