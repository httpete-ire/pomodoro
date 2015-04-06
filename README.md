# pomodoro
a simple pomodoro timer app build using Angular and web workers

![Image of the app](https://cloud.githubusercontent.com/assets/1556430/7013191/2e438bea-dcaf-11e4-842e-de9d5e73fa28.png)

[view app](http://httpete.com/pomodoro/)

### pomodoro

The pomodoro technique is a time management method for breaking down large tasks into small, timed intervals that are seperated by a short break.

### how to build

to build the app run the following commands

	npm install
	
	bower install
	
	gulp setup

### web worker

When a tab is inactive in Chrome it automatcilly buffers the setTimeout and setInterval functions to excute at maximum every second. The timer function gets executed approximately every 1.3 / 1.4 seconds, not ideal for a timer appliaction.

Web workers allow any script to run in a background thread and are not effected by buffering when the tab is inactive.

### todo

- [x] audio when complete
- [x] ability to changes the settings
- [x] add HTML 5 notifications
- [x] custom input ranges to change time
