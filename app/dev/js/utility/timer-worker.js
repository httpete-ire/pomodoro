// store the timer so we can clear it
var timer = null;

var time = null;

self.onmessage = function (e) {
    switch (e.data.command) {
        case 'start':
            startTimer(e.data.time);
            break;
        case 'clear':
            clearTimer();
            break;
    }
};


function startTimer (value) {

    console.log(value);

    var SECOND = 1000;

    // if time is not passed we continue the countdown with the time
    time = value || time;


    timer = setInterval(function(){

        postMessage({
            message: 'tick',
            time: time
        });

        if (time === 0) {

            postMessage({
                message: 'complete'
            });

            // set tick and call callback function
            //  clearTimer
            clearTimer();
        }

        time--;

    }, SECOND);


    // return that the timer has started
    postMessage({
        started: !!timer
    });
}

function clearTimer () {

    if(!timer) {
        return;
    }

    // stop the timer and set to null
    clearInterval(timer);
    timer = null;

}
