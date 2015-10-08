/* global self */
/* global postMessage */
'use strict';

// store the timer so we can clear it
var timer = null;
var time = null;
var SECOND = 1000;

self.onmessage = function(e) {
    switch (e.data.command) {
        case 'start':
            startTimer(e.data.time);
            break;
        case 'clear':
            clearTimer();
            break;
    }
};

/**
 * start the web worker timer for a specific time, after every second
 * the tick message is sent to the window causing a callback to execute,
 * when the time reaches 0 the complete message is sent back to the
 * window
 *
 * if a time is not provided as a parameter it will use the existing time,
 * this is used when a timer is paused and it is started. it simply resumes
 * the timer with the remaining time
 *
 * @param  {Number} value : time to set timer to
 */
function startTimer(value) {

    time = (value) ? value - 1 : time;

    timer = setInterval(function() {

        postMessage({
            message: 'tick',
            time: time
        });

        if (time === 0) {

            postMessage({
                message: 'complete'
            });

            clearTimer();
        }

        time--;

    }, SECOND);

    // return that the timer has started
    postMessage({
        started: !!timer
    });
}

/**
 * if a timer interval is set clear it and set to null
 */
function clearTimer() {

    if (!timer) {
        return;
    }

    clearInterval(timer);
    timer = null;
}
