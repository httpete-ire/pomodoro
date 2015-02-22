# pomodoro
a simple pomodoro timer app build using Angular and web workers

### pomodoro

### how to build

to build the app run the following commands

	npm install
	
	bower install
	
	gulp setup

### web worker

When a tab is inactive in Chrome it automatcilly buffers the setTimeout and setInterval functions to excute at maximum every second. The timer function gets executed approximately every 1.3 / 1.4 seconds, not ideal for a timer appliaction.

Web workers allow any script to run in a background thread and are not effected by buffering when the tab is inactive.

### todo

- audio when complete
- ability to changes the settings
- add HTML 5 notifications
- finish read me