
<p align="center">
<img style="text-align: center;" src="http://imageshack.com/a/img922/4690/kapZA1.png">
</p>
### Performance Timing Functions for UI Development

# 4d

#### 4d is a set of efficient timing functions. Click below for documentation.

- [cancel](https://github.com/envidia/4d/blob/master/README.md#cancel)
- [debounce](https://github.com/julienetie/volve/blob/master/README.md)
- [interval](https://github.com/julienetie/set-animation-interval/blob/master/README.md)
- [once](https://github.com/julienetie/run-once/blob/master/README.md)
- [request](https://github.com/envidia/4d/blob/master/README.md#request)
- [requestNative](https://github.com/julienetie/request-frame/blob/master/README.md)
- [throttle](https://github.com/julienetie/volve/blob/master/README.md)
- [timeout](https://github.com/julienetie/set-animation-frame)
- [windowResize](https://github.com/julienetie/resizilla/blob/master/README.md)

## Why?
- Better performance for modern browsers and mobile devices.
- Features a comprehensive fix for legacy compatibility issues with RAF.
- Avoids setTimeout and setInterval unlike the majority of JavaScript timing functions.
- Prioritise timing for browsers and mobile devices over node.
- Limit function calls, set FPS, delay and loop to the next frame to be rendered.
- Features a comprehensive windowResize method that resolves mobile issues.
- Features a media queries detection API with built in custom events (Coming soon)
- Ability to mock jittery/ random function calls e.g. emulate bad performance. (coming soon)
- Less than **2kb gzip size** _(will never exceed a 4kb gzip size)_



## Aim
- 4d is a tiny powerhouse, and will remain tiny.
- 4d aims to improve common timing requirements in a clean, lightweight and modular way.
- 4d aims to provide a better feature implementations than alternatives.

_(4d === fourth dimension === t)_

## Compatibility
4d Is at least compatible with IE8 +



## Support
- CommonJS ... 

`require('4d')`

- AMD ... 

`define(['$4d'] , function ($4d) {...`

- ES6 ... 

`import {debounce, throttle, timeout } from '4d'`

- IIFE ... 

`src="4d.js'`

## Demo
- [Most 4d functions will only work in browser environments, not Node or the Dev Tools console]

[Click here to see the demo]()

# The 4d API

## cancel()

#### _Syntax_:
`cancel(requestID)`

#### _Parameters_:
- requestID: The ID value returned by the call to window.requestAnimationFrame() that requested the callback.

#### _In place of_:
`window.cancelAnimationFrame()`

#### _Summary_:
The most comprehensive polyfill for **cancelAnimationFrame**. _cancel()_ avoids mutation of the native object to prevent overriding of cancelAnimationFrame implementations that may be used within other libraries.

_cancel()_ cancels an animation frame request previously scheduled through a call to request() or window.requestAnimationFrame().



#### _Usage_:

```javascript
import { cancel } from '4d'

// id === some requestAnimationFrame ID.

cancel(id)
```
See [more](https://github.com/julienetie/request-frame).  

#### _Browser Support_: 
- Internet Explorer 5+
- See [more](https://github.com/julienetie/request-frame#browsers-tested--passing)

#### _Core library_:
[Request Frame](https://github.com/julienetie/request-frame).

_______________
_______________

## request()

#### _Syntax_:
`request(callback[DOMHighResTimeStamp])`

#### _Parameters_:
- callback: A parameter specifying a function to call when it's time to update your animation for the next repaint. The callback has one single argument, a DOMHighResTimeStamp, which indicates the current time (the time returned from Performance.now() ) for when requestAnimationFrame starts to fire callbacks.

#### _In place of_:
`window.requestAnimationFrame(callback[DOMHighResTimeStamp])`

#### _Summary_:
The most comprehensive polyfill for **requestAnimationFrame**. _request()_ avoids mutation of the native object to prevent overriding of requestAnimationFrame implementations that may be used within other libraries.

_request()_ tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint. The method takes as an argument a callback to be invoked before the repaint.

#### _Usage_:

```javascript
import { request } from '4d'

// Animate.
const animate = (highResTimestamp) => {
  request(animate);
  // Animate something...
}

// Start the animation on the next available frame.
request(animate);
```

See [more](https://github.com/julienetie/request-frame).  

#### _Browser Support_: 
- Internet Explorer 5+
- See [more](https://github.com/julienetie/request-frame#browsers-tested--passing)

#### _Core library_:
[Request Frame](https://github.com/julienetie/request-frame).

_______________
_______________

[MIT](https://github.com/envidia/4d/blob/master/LICENSE)

Copyright (c) 2016 Julien Etienne
