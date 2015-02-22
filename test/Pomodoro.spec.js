describe('Pomodoro', function () {

    var Pomodoro;

    var doro;

    beforeEach(module('pomodoro'));

    beforeEach(inject(function (_Pomodoro_) {
        Pomodoro = _Pomodoro_;
    }));


    // create a new instance of Pomodoro
    beforeEach(function () {
        doro = new Pomodoro(function () {
            console.log('working');
        });
    });

    it('should be an instance of Pomodoro', function () {
        assert.instanceOf(doro, Pomodoro, 'doro is an instance of Pomodoro');
    });

    it('should be paused when inactive', function () {
        expect(doro.isPaused()).to.be.true;
    });

    it('should be active when the start method is called', function () {
        doro.start();

        expect(doro.isPaused()).to.be.false;

        expect(doro._timer).to.be.true;
    });

    it('should pause / clear the timer', function () {
        doro.start();

        doro.pause();

        expect(doro.isPaused()).to.be.true;

        expect(doro._timer).to.be.false;
    });

    it('should update the settings', function () {

        expect(doro.getDuration()).to.equal(1500);

         doro.updateSettings({
            acll: 1
        });

        expect(doro.getDuration()).to.equal(1500);

        var updatedTimes = {
            active: 1000,
            short_break: 100,
            long_break: 500
        };

        doro.updateSettings(updatedTimes);

        expect(doro.getDuration()).to.equal(updatedTimes.active);

        expect(doro.updateSettings(10)).to.equal.false;


    });


    // teardown object
    afterEach(function(){
        doro.cancelTimer();
        doro = null;
    });

});
