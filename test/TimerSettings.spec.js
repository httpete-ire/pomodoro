describe('TimerSettings service', function() {
    var TimerSettings;

    beforeEach(module('pomodoro'));

    beforeEach(inject(function(_TimerSettings_) {
        TimerSettings = _TimerSettings_;

        TimerSettings.setTime('active', 25);
    }));

    it('should return a time given a timer type', function () {
        expect(TimerSettings.getTime('active')).to.equals(1500);
        expect(TimerSettings.getTime()).to.equals(0);
    });

    it('should set the time', function () {
        TimerSettings.setTime('active', 10);
        expect(TimerSettings.getTime('active')).to.equals(600);
    });

    it('if given an invalid number the function should return false', function () {
        expect(TimerSettings.setTime('active', 'asdfsad')).to.be.false;
    });
});
