(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.$4d = factory());
}(this, (function () { 'use strict';

/**
 * request-frame - requestAnimationFrame & cancelAnimationFrame polyfill for optimal cross-browser development.
 * @version v1.5.3
 * @license MIT
 * Copyright Julien Etienne 2015 All Rights Reserved.
 */
/**
 * @param  {String} type - request | cancel | native.
 * @return {Function} Timing function.
 */
function requestFrame(type) {
    // The only vendor prefixes required.
    var vendors = ['moz', 'webkit'];

    // Disassembled timing function abbreviations.
    var aF = 'AnimationFrame';
    var rqAF = 'Request' + aF;

    // Checks for firefox 4 - 10 function pair mismatch.
    var mozRAF = window.mozRequestAnimationFrame;
    var mozCAF = window.mozCancelAnimationFrame;
    var hasMozMismatch = mozRAF && !mozCAF;

    // Final assigned functions.
    var assignedRequestAnimationFrame;
    var assignedCancelAnimationFrame;

    // Initial time of the timing lapse.
    var previousTime = 0;

    var requestFrameMain;

    // Date.now polyfill, mainly for legacy IE versions.
    if (!Date.now) {
        Date.now = function () {
            return new Date().getTime();
        };
    }

    /**
     * hasIOS6RequestAnimationFrameBug.
     * @See {@Link https://gist.github.com/julienetie/86ac394ec41f1271ff0a}
     * - for Commentary.
     * @Copyright 2015 - Julien Etienne. 
     * @License: MIT.
     */
    function hasIOS6RequestAnimationFrameBug() {
        var webkitRAF = window.webkitRequestAnimationFrame;
        var rAF = window.requestAnimationFrame;

        // CSS/ Device with max for iOS6 Devices.
        var hasMobileDeviceWidth = screen.width <= 768 ? true : false;

        // Only supports webkit prefixed requestAnimtionFrane.
        var requiresWebkitprefix = !(webkitRAF && rAF);

        // iOS6 webkit browsers don't support performance now.
        var hasNoNavigationTiming = window.performance ? false : true;

        var iOS6Notice = 'setTimeout is being used as a substitiue for \n            requestAnimationFrame due to a bug within iOS 6 builds';

        var hasIOS6Bug = requiresWebkitprefix && hasMobileDeviceWidth && hasNoNavigationTiming;

        var bugCheckresults = function bugCheckresults(timingFnA, timingFnB, notice) {
            if (timingFnA || timingFnB) {
                console.warn(notice);
                return true;
            } else {
                return false;
            }
        };

        var displayResults = function displayResults(hasBug, hasBugNotice, webkitFn, nativeFn) {
            if (hasBug) {
                return bugCheckresults(webkitFn, nativeFn, hasBugNotice);
            } else {
                return false;
            }
        };

        return displayResults(hasIOS6Bug, iOS6Notice, webkitRAF, rAF);
    }

    /**
     * Native clearTimeout function.
     * @return {Function}
     */
    function clearTimeoutWithId(id) {
        clearTimeout(id);
    }

    /**
     * Based on a polyfill by Erik, introduced by Paul Irish & 
     * further improved by Darius Bacon.
     * @see  {@link http://www.paulirish.com/2011/
     * requestanimationframe-for-smart-animating}
     * @see  {@link https://github.com/darius/requestAnimationFrame/blob/
     * master/requestAnimationFrame.js}
     * @callback {Number} Timestamp.
     * @return {Function} setTimeout Function.
     */
    function setTimeoutWithTimestamp(callback) {
        var immediateTime = Date.now();
        var lapsedTime = Math.max(previousTime + 16, immediateTime);
        return setTimeout(function () {
            callback(previousTime = lapsedTime);
        }, lapsedTime - immediateTime);
    }

    /**
     * Queries the native function, prefixed function 
     * or use the setTimeoutWithTimestamp function.
     * @return {Function}
     */
    function queryRequestAnimationFrame() {
        if (Array.prototype.filter) {
            assignedRequestAnimationFrame = window['request' + aF] || window[vendors.filter(function (vendor) {
                if (window[vendor + rqAF] !== undefined) return vendor;
            }) + rqAF] || setTimeoutWithTimestamp;
        } else {
            return setTimeoutWithTimestamp;
        }
        if (!hasIOS6RequestAnimationFrameBug()) {
            return assignedRequestAnimationFrame;
        } else {
            return setTimeoutWithTimestamp;
        }
    }

    /**
     * Queries the native function, prefixed function 
     * or use the clearTimeoutWithId function.
     * @return {Function}
     */
    function queryCancelAnimationFrame() {
        var cancellationNames = [];
        if (Array.prototype.map) {
            vendors.map(function (vendor) {
                return ['Cancel', 'CancelRequest'].map(function (cancellationNamePrefix) {
                    cancellationNames.push(vendor + cancellationNamePrefix + aF);
                });
            });
        } else {
            return clearTimeoutWithId;
        }

        /**
         * Checks for the prefixed cancelAnimationFrame implementation.
         * @param  {Array} prefixedNames - An array of the prefixed names. 
         * @param  {Number} i - Iteration start point.
         * @return {Function} prefixed cancelAnimationFrame function.
         */
        function prefixedCancelAnimationFrame(prefixedNames, i) {
            var cancellationFunction = void 0;
            for (; i < prefixedNames.length; i++) {
                if (window[prefixedNames[i]]) {
                    cancellationFunction = window[prefixedNames[i]];
                    break;
                }
            }
            return cancellationFunction;
        }

        // Use truthly function
        assignedCancelAnimationFrame = window['cancel' + aF] || prefixedCancelAnimationFrame(cancellationNames, 0) || clearTimeoutWithId;

        // Check for iOS 6 bug
        if (!hasIOS6RequestAnimationFrameBug()) {
            return assignedCancelAnimationFrame;
        } else {
            return clearTimeoutWithId;
        }
    }

    function getRequestFn() {
        if (hasMozMismatch) {
            return setTimeoutWithTimestamp;
        } else {
            return queryRequestAnimationFrame();
        }
    }

    function getCancelFn() {
        return queryCancelAnimationFrame();
    }

    function setNativeFn() {
        if (hasMozMismatch) {
            window.requestAnimationFrame = setTimeoutWithTimestamp;
            window.cancelAnimationFrame = clearTimeoutWithId;
        } else {
            window.requestAnimationFrame = queryRequestAnimationFrame();
            window.cancelAnimationFrame = queryCancelAnimationFrame();
        }
    }

    /**
     * The type value "request" singles out firefox 4 - 10 and 
     * assigns the setTimeout function if plausible.
     */

    switch (type) {
        case 'request':
        case '':
            requestFrameMain = getRequestFn();
            break;

        case 'cancel':
            requestFrameMain = getCancelFn();
            break;

        case 'native':
            setNativeFn();
            break;
        default:
            throw new Error('RequestFrame parameter is not a type.');
    }
    return requestFrameMain;
}

/**
 * Pass a condition once with a given reference.
 * @param {string} reference - A unique reference per conditon.
 * @return {Boolean}
 */
function once(reference) {
    if (!once.prototype.references) {
        once.prototype.references = {};
    }
    // Store reference if dosen't exist.
    if (!once.prototype.references.hasOwnProperty(reference)) {
        once.prototype.references[reference] = null;
        return true;
    } else {
        return false;
    }
}

/**
 *  set-animation-frame - Delay function calls without setTimeout.
 *     License:  MIT
 *      Copyright Julien Etienne 2016 All Rights Reserved.
 *        github:  https://github.com/julienetie/set-animation-frame
 *‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
 */

/**
 * @param {Function} callback
 * @param {Number} delay
 */
var setAnimationFrame = function setAnimationFrame(callback, delay) {
  var duration = 0;
  var terminate = false;
  var requestId;

  /**
   * The duration increments until it satisfys the delay.
   * Once the delay is ready to be terminated, the requestID
   * is returned. Whilst unsatisfied requestAnimationFrame
   * calls the loop with the incremented timestamp
   */
  function loop(timestamp) {
    if (!duration) {
      duration = timestamp;
    }

    if (timestamp > duration + delay && !terminate) {
      if (callback) callback(timestamp);
      terminate = true;
    } else {
      requestId = requestAnimationFrame(loop);
    }
  }

  /**
   * Start the loop. 
   */
  loop(1);

  /**
   * Returns the timestamp relative to the navigationStart attribute of the 
   * PerformanceTiming interface
   * @return {Number} - DOMHighResTimeStamp
   */
  return requestId;
};

/**
 *  set-animation-interval - Repeatedly call a function without setInterval,
 *    call a function by approximate frames per second.
 *     License:  MIT
 *      Copyright Julien Etienne 2016 All Rights Reserved.
 *        github:  https://github.com/julienetie/set-animation-interval
 *‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
 */

/**
 * @param {Function} - Callback.
 * @param {Number}   - Delay in milliseconds or frames per second.
 * @param {Boolean}  - use FPS.
 */
function setAnimationInterval(callback, delay, useFPS) {
  var fPSTimeStamp = 0;
  var interval = useFPS ? 1000 / delay : delay;
  var requestId = void 0;

  /**
   * Iterates the call back.
   * Compare the timestamp.
   * @return {Number} - DOMHighResTimeStamp.
   */
  (function loopCallback(timestamp) {
    if (timestamp > fPSTimeStamp) {
      fPSTimeStamp += interval;
      callback(fPSTimeStamp);
    }
    requestId = requestAnimationFrame(loopCallback);
  })();

  /**
   * Returns the timestamp relative to the navigationStart attribute of the 
   * PerformanceTiming interface
   * @return {Number} - DOMHighResTimeStamp
   */
  return requestId;
}

/**
 *  volve - Tiny, Performant Debounce and Throttle Functions,
 *     License:  MIT
 *      Copyright Julien Etienne 2016 All Rights Reserved.
 *        github:  https://github.com/julienetie/volve
 *‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
 */

/**
 * Date.now polyfill.
 * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/now}
 */
if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}

var volve = {
    /**
     * Throttle a function call during repetiton.
     * @param {Function} - Callback function.
     * @param {Number}   - Limit in milliseconds.
     * @return {Function} - The throttle function. 
     */
    throttle: function throttle(callback, limit) {
        var lastCallTime;
        return function (parameters) {
            var currentCallTime = Date.now();
            if (!lastCallTime || currentCallTime > lastCallTime + limit) {
                callback(parameters);
                lastCallTime = currentCallTime;
            }
        };
    },


    // !!The two functions are not to be refactored!!

    /**
     * Debounce a function call during repetiton.
     * @param {Function} - Callback function.
     * @param {Number}   - Delay in milliseconds.
     * @return {Function} - The debounce function. 
     */
    debounce: function debounce(callback, delay) {
        var lastCallTime;
        return function (parameters) {
            var currentCallTime = Date.now();
            if (!lastCallTime || currentCallTime - lastCallTime > delay) {
                callback(parameters);
                lastCallTime = currentCallTime;
            }
        };
    }
};

var request = window.requestAnimationFrame; //TODO replace in code.
var cancel = window.cancelAnimationFrame; //TODO replace in code.
var self = window;
var store = {};
var start;

/**
 * An Alternative to setTimeout using requestAnimationFrame
 * @param  {Function} handler
 * @param  {Number}   delay - In milisectonds 
 * @return {Number}   time lapse
 */
function requestTimeout(handler, delay) {
    start = Date.now();

    function increment(constant) {
        store.k = !store.k ? constant : null;
        return store.k += 1;
    }

    function loop() {
        store.delta = Date.now() - start;
        store.callHandler = store.delta >= delay ? handler.call() : request(loop);
    }

    request(loop);
    return increment(0);
}

/**
 * A wrapper for the handler using the window context
 */
function handlerCallback(handler, delay, incept) {
    handler.apply(self, handler, delay, incept);
}

/**
 * resizilla function
 * @public
 * @param  {Function | Object} optionsHandler The handler or options as an 
 * object literal.
 * @param  {Number} delay          Delay in MS
 * @param  {Boolean} incept        Incept from start of delay or till the end.
 */
function resizilla(optionsHandler, delay, incept) {
    var options = {};
    resizilla.options = options;

    // Defaults
    options.orientationChange = true;
    options.useCapture = true;
    options.incept = false;

    if (optionsHandler.constructor === {}.constructor) {
        options.handler = optionsHandler.handler;
        options.delay = optionsHandler.delay;
        options.incept = optionsHandler.incept;
        options.orientationChange = optionsHandler.orientationChange;
        options.useCapture = optionsHandler.useCapture;
    } else {
        options.handler = optionsHandler;
        options.delay = delay;
        options.incept = typeof options.incept === 'undefined' ? options.incept : incept;
    }

    function debounce(handler, delay, incept) {
        var timeout;

        return function () {
            var lastCall = function lastCall() {
                timeout = 0;
                if (!incept) {
                    handlerCallback(handler, delay, incept);
                }
            };

            store.instant = incept && !timeout;
            cancel(timeout);
            timeout = requestTimeout(lastCall, delay);

            if (store.instant) {
                handlerCallback(handler, delay, incept);
            }
        };
    }

    function addWindowEvent(handler) {
        self.addEventListener('resize', handler, options.useCapture);
    }

    addWindowEvent(debounce(options.handler, options.delay, options.incept));

    if (options.orientationChange) {
        self.addEventListener('orientationchange', options.handler, options.useCapture);
    }
}

/**
 * Remove all or one of the event listeners
 * @param  {String} type.
 */
resizilla.destroy = function (type) {
    if (!type || type === 'all') {
        window.removeEventListener('resize', this.options.handler, this.options.useCapture);
        window.removeEventListener('orientationchange', this.options.handler, this.options.useCapture);
    } else {
        window.removeEventListener(type, this.options.handler, this.options.useCapture);
    }
};

var $4d = {
    windowResize: resizilla,
    debounce: volve.debounce,
    throttle: volve.throttle,
    once: once,
    timeout: setAnimationFrame,
    interval: setAnimationInterval,
    request: requestFrame('request'),
    cancel: requestFrame('cancel'),
    requestNative: function requestNative() {
        requestFrame('native');
    }
};

return $4d;

})));
