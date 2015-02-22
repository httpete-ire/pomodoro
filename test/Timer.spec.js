describe('Timer', function () {

    var Timer;

    var started = false;

    var time = {
        ten: 15
    };

    beforeEach(module('pomodoro'));

    beforeEach(inject(function(_Timer_){
        Timer = _Timer_;
    }));

    // start timer
    // beforeEach(function (done) {
    //     Timer.startTimer({
    //         time: time.ten,
    //         callback: function () {
    //             console.log('hello');
    //         }
    //     });

    //     done();
    // });




    // it('should de an object', function () {
    //     expect(Timer).to.be.an('object');
    // });

    // it('should active the timer web worker', function (done) {

    //     setTimeout(function () {
    //         started = Timer.isActive();
    //         expect(started).to.be.true;
    //         done();
    //     }, 500);

    // });

});
