describe('MainCtrl', function() {

    var scope;
    var ctrl;
    var pomodoro;
    var audioOriginal;
    var audioMock;

    beforeEach(module('pomodoro'));

    beforeEach(inject(function(_$rootScope_, _$controller_, _Pomodoro_, _TimeParser_, _$document_) {

        scope = _$rootScope_.$new();
        pomodoro = _Pomodoro_;

        ctrl = _$controller_('MainCtrl', {
            Pomodoro: pomodoro,
            $scope: scope,
            TimeParser: _TimeParser_,
            $document: _$document_
        });

        audioOriginal = window.Audio;
        audioMock = {};
        window.Audio = function() {
            return audioMock;
        };

    }));

    // afterEach(function() {
    //     window.Audio = audioOriginal;
    // });

    it('controller should be defined', function() {
        expect(ctrl).to.not.be.undefined;
    });

    it('the controller should have an instance of Pomodoro', function() {
        ctrl.init();
        expect(ctrl.pomodoro).to.be.an.instanceOf(pomodoro);
    });

    it('the toggleTimer method should start the timer', function() {

        ctrl.init();

        expect(ctrl.states.started).to.equal.false;
        ctrl.toggleTimer();
        expect(ctrl.states.started).to.equal.true;
        expect(ctrl.states.paused).to.equal.false;

    });

    it('the toggleTimer should pause a active timer', function() {

        ctrl.init();

        // start the timer
        ctrl.toggleTimer();
        expect(ctrl.states.paused).to.equal.false;

        // pause the timer
        ctrl.toggleTimer();
        expect(ctrl.states.paused).to.equal.true;

    });

    it('should update the btn text', function() {

        ctrl.init();
        expect(ctrl.timerState).to.equal('start');

        ctrl.toggleTimer();
        expect(ctrl.timerState).to.equal('pause');

        ctrl.toggleTimer();
        expect(ctrl.timerState).to.equal('resume');

    });

});
