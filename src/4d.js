import requestFrame from 'request-frame';
import once from 'run-once';
import timeout from 'set-animation-frame';
import interval from 'set-animation-interval';
import volve from 'volve';
import windowResize from '../resizilla.es';


const $4d = {
    windowResize,
    debounce: volve.debounce,
    throttle: volve.throttle,
    once,
    timeout,
    interval,
    request: requestFrame('request'),
    cancel: requestFrame('cancel'),
    requestNative: () => {requestFrame('native');}
}; 
 
export default $4d; 