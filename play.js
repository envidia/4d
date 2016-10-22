var dist = require('./dist/4d');


var {
	request, 
	cancel, 
	requestNative, 
	once, 
	timeout, 
	interval, 
	debounce,
	throttle,
	windowResize
} = require('./dist/4d');


window.request = request;
window.cancel =  cancel;
window.requestNative =  requestNative;
window.once =  once; 
window.timeout =  timeout;
window.interval =  interval;
window.debounce =  debounce;
window.throttle =  throttle;
window.windowResize =  windowResize;


