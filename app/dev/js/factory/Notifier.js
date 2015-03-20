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
            dismiss: 3000
        };

        function _notifier(opts) {
            this.settings = opts || {};
            this.permission = false;
            this._notifaction = null;
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

            var self;

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

                console.log('working');
            };
        };

        return _notifier;
    };

})();
