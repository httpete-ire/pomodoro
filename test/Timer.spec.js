describe('Timer', function() {

    var Timer;

    var started = false;

    beforeEach(module('pomodoro'));

    beforeEach(inject(function(_Timer_) {
        Timer = _Timer_;
    }));

    it('should de an object', function () {
        expect(Timer).to.be.an('object');
    });

});
