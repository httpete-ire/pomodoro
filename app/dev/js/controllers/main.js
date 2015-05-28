(function() {

    'use strict';

    angular
    .module('pomodoro')
    .controller('MainCtrl', MainCtrl);

    /**
     * @ngdoc function
     * @name pomodoro.controller: MainCtrl
     * @requires 'Pomodoro', '$scope', 'TimeParser', 'TimerSettings'
     * @description store the UI states and models and bind functions for
     * updating times and settings notifications
     * @author Peter Redmond https://github.com/httpete-ire
     *
     * @ngInject
     */
    function MainCtrl(Pomodoro, $scope, TimeParser, TimerSettings) {

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
            desktopNotification: TimerSettings.getNotification('desktop'),
            audioNotifications: TimerSettings.getNotification('audio'),
            activeTime: TimerSettings.getTime('active') / 60,
            shortBreak: TimerSettings.getTime('shortBreak') / 60,
            longBreak: TimerSettings.getTime('longBreak') / 60,
            count: 0
        };

        /**
         * set up the Pomodoro object and the UI states
         */
        vm.init = function() {

            // create a new instance of the pomodoro object
            // and set the tick function to be executed every second
            vm.pomodoro = new Pomodoro(function(time) {
                vm.setTime(time);
            });

            // set the time to that of the pomodoro
            vm.time = TimeParser.parse(vm.pomodoro.getDuration());

            // see if allowNotifactionss are supported
            vm.states.allowNotifactions = vm.pomodoro.noticaftions();

            // set btn text
            vm.timerState = vm.setTimerState();

            // set weither the timer should notify when complete
            vm.pomodoro.allowNotifaction(vm.models.desktopNotification, vm.models.audioNotifications);
        };

        /**
         * @return {Boolean} return if the timer is active or not
         */
        vm.isPaused = function() {
            return vm.states.btn === 'paused';
        };

        /**
         * set the parse time on the view so it is
         * formatted correctly
         *
         * @param {Number} value : time to parse
         */
        vm.setTime = function(value) {
            vm.time = TimeParser.parse(value);
            $scope.$apply();
        };


        /**
         * if the timer is new then start it, otherwise pause it, if already
         * paused then resume the current timer, also set the state of
         * the UI
         */
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
            vm.timerState = vm.setTimerState();
        };

        /**
         * set the UI state depending on the app state
         */
        vm.setTimerState = function() {

            // if timer is new
            if (!vm.states.started) {
                return 'start';
            }

            return (!vm.states.paused) ? 'pause' : 'resume';
        };

        /**
         * open or close the settings panel
         */
        vm.toggleSettings = function() {
            vm.states.settings = !vm.states.settings;
        };

        /**
         * force close the settings panel
         */
        vm.closeSettings = function() {
            vm.states.settings = false;
        };

        /**
         * ask the user to grant permission for desktop notifactions, store
         * the result in localStorage and tell the pomodoro to either allow or
         * disallow both desktop and audio notifcations
         */
        vm.allowDesktopNotifications = function() {
            // ask the user to allow desktop notifications
            vm.pomodoro._notifier.grantPermission();

            // store the result in localStorage to persist the settings
            TimerSettings.setNotification('desktop', vm.models.desktopNotification);

            // toggle the notifer
            vm.pomodoro.allowNotifaction(vm.models.desktopNotification);
        };

        /**
         * toggle to allow audio notifactions when timer complete, store
         * the result in localStorage and notify pomodoro to either
         * allow audio notifactions
         */
        vm.toggleAudioNotifications = function() {

            TimerSettings.setNotification('audio', vm.models.audioNotifications);

            vm.pomodoro._audioNotification = vm.models.audioNotifications;
        };

        /**
         * restart the current timer without incrementing the count
         */
        vm.restart = function() {
            vm.pomodoro.cancelTimer();

            // update the UI state
            vm.states.started = false;
            vm.timerState = vm.setTimerState();
            vm.time = TimeParser.parse(vm.pomodoro.getDuration());
        };

        /**
         * update the time for each pomodoro ('active' eg) and if timer has
         * not been started updates the UI state, otherwise wait till
         * the timer has complete before using the new time
         *
         * @param  {Sting} type     : timer type eg 'active'
         * @param  {Number} newTime : time to set
         */
        vm.updateTime = function(type, newTime) {
            TimerSettings.setTime(type, newTime);

            // if time is paused update the time, otherwise wait till next timer
            if (!vm.states.started) {
                vm.time = TimeParser.parse(vm.pomodoro.getDuration());

                // call the digest cycle to update the timer
                $scope.$apply();
            }
        };

        // listen for typeChange events and update the background
        // depending on the timer type
        $scope.$on('typeChange', function(e, data) {
            vm.states.background = data.type;
            vm.models.count = vm.pomodoro._count;
        });

    }

    MainCtrl.$inject = ['Pomodoro', '$scope', 'TimeParser', 'TimerSettings'];

})();
