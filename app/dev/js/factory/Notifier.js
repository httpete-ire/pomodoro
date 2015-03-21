(function () {
    'use strict';

    angular
    .module('pomodoro')
    .factory('Notifier',Notifier);

    /**
     * [Notifier description]
     */
    function Notifier ($window, $timeout) {

        var notifierSettings = {
            title: 'Pomodoro',
            tag: 'pomodoro',
            dismiss: 3000,
            sound: './../../sounds/alarm.mp3'
        };

        function _notifier(opts) {
            this.settings = opts || {};
            this.permission = false;
            this._notifaction = null;
            this._audio = new Audio(notifierSettings.sound);
        }

        /**
         * check to see if the browser supports desktop notifications
         *
         */
        _notifier.prototype.isSupported = function() {
            return 'Notification' in $window;
        };

        _notifier.prototype.grantPermission = function() {

            var self = this;

            Notification.requestPermission(function(permission){
                // set the permission property to true or false
                self.permission = (permission === 'granted');
            });
        };

        _notifier.prototype.setNotifaction = function(msg) {

            var self = this;

            // set notifaction
            var n = this._notifaction = new Notification(notifierSettings.title,{
                body: msg,
                tag: notifierSettings.tag
            });

            // close notifaction after a timer
            this._notifaction.onshow = function () {
                // call the close method and bind the value of this to
                // be the notifier
                $timeout(n.close.bind(n), notifierSettings.dismiss);
            };

            // stop the alarm when notification is clicked
            this._notifaction.onclose = stopAudio;
            this._notifaction.onclick = stopAudio;

            // pause the alarm and reset it
            function stopAudio () {
                self._audio.pause();
                self._audio.currentTime = 0;
            }

        };

        // play the alarm
        _notifier.prototype.playSound = function() {
            this._audio.play();
        };

        // return if the user granted permission for the notifications
        _notifier.prototype.getPermission = function(){
            return this.permission;
        }

        return _notifier;
    };

})();
