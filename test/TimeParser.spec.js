describe('TimeParser', function() {
    var TimeParser;

    // load the app
    beforeEach(module('pomodoro'));

    // inject the TimeParser
    beforeEach(inject(function(_TimeParser_){
        TimeParser = _TimeParser_;
    }));

    describe('TimeParser service', function () {

        var times = {
            ten: 600,
            twenty: 1200,
            five: 300,
            one: 1
        };

        it('should return a string', function () {
            expect(TimeParser.parse(times.ten)).to.be.a('string');
        });

        it('should return the time in minutes and seconds', function () {
            expect(TimeParser.parse(times.ten)).to.equal('10 : 00');
        });

        it('should return a empty string if the number is not valid', function () {
            expect(TimeParser.parse('test')).to.equal('');
        });

        it('should prefix a 0 to a single digit', function () {
            expect(TimeParser.parse(times.one)).to.equal('00 : 01');
        });

    });

});
