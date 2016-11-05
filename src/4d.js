import requestFrame from 'request-frame';
import once from 'run-once';
import { setAnimationFrame, clearAnimationFrame } from 'set-animation-frame';
import interval from 'set-animation-interval';
import {debounce, throttle} from 'volve';
import windowResize from '../resizilla.es';


const $4d = {
    windowResize,
    debounce,
    throttle,
    once,
    setDelay: setAnimationFrame,
    clearDelay: clearAnimationFrame,
    interval,
    request: requestFrame('request'),
    cancel: requestFrame('cancel'),
    requestNative: () => {requestFrame('native');}
}; 
 
export default $4d; 