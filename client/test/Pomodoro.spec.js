describe('Pomodoro', function() {

    var Pomodoro;
    var doro;
    var audioOriginal;
    var audioMock;

    beforeEach(module('pomodoro'));

    beforeEach(inject(function(_Pomodoro_) {
        Pomodoro = _Pomodoro_;
    }));

    // create a new instance of Pomodoro
    beforeEach(function() {
        doro = new Pomodoro(function() {
            console.log('working');
        });

        audioOriginal = window.Audio;
        audioMock = {};
        window.Audio = function() {
            return audioMock;
        };
    });

    it('should be an instance of Pomodoro', function() {
        assert.instanceOf(doro, Pomodoro, 'doro is an instance of Pomodoro');
    });

    it('should be paused when inactive', function() {
        expect(doro.isPaused()).to.be.true;
    });

    it('should be active when the start method is called', function() {
        doro.start();

        expect(doro.isPaused()).to.be.false;

        expect(doro._timer).to.be.true;
    });

    it('should pause / clear the timer', function() {
        doro.start();

        doro.pause();

        expect(doro.isPaused()).to.be.true;

        expect(doro._timer).to.be.false;
    });

    // teardown object
    afterEach(function() {
        doro.cancelTimer();
        doro = null;

        // window.Audio = audioOriginal;
    });

});
