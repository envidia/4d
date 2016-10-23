
<p align="center">
<img style="text-align: center;" src="http://imageshack.com/a/img922/4690/kapZA1.png">
</p>
<sub>en-GB</sub>
### Performance Timing Functions for UI Development

# 4d

#### 4d is a set of efficient timing functions. Click below for documentation.

- [cancel](https://github.com/julienetie/4d/wiki)
- [debounce](https://github.com/julienetie/4d/wiki)
- [interval](https://github.com/julienetie/4d/wiki)
- [once](https://github.com/julienetie/4d/wiki)
- [request](https://github.com/julienetie/4d/wiki)
- [requestNative](https://github.com/julienetie/4d/wiki)
- [throttle](https://github.com/julienetie/4d/wiki)
- [timeout](https://github.com/julienetie/4d/wiki)
- [windowResize](https://github.com/julienetie/4d/wiki)

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


[MIT](https://github.com/envidia/4d/blob/master/LICENSE)

Copyright (c) 2016 Julien Etienne
