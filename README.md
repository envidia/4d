<p align="center">
<img style="text-align: center;" src="http://imageshack.com/a/img922/4690/kapZA1.png">
</p>

### Performance Timing Functions for UI Development

# 4d

#### 4d is a set of efficient timing functions. Click below for documentation.

- [once](https://github.com/julienetie/4d/wiki)
- [interval](https://github.com/julienetie/4d/wiki)
- [timeout](https://github.com/julienetie/4d/wiki)
- [request](https://github.com/julienetie/4d/wiki)
- [cancel](https://github.com/julienetie/4d/wiki)
- [requestNative](https://github.com/julienetie/4d/wiki)
- [debounce](https://github.com/julienetie/4d/wiki)
- [throttle](https://github.com/julienetie/4d/wiki)
- [windowResize](https://github.com/julienetie/4d/wiki)

## Why?
- Better performance for modern browsers and mobile devices.
- Features a comprehensive fix for legacy compatability issues with RAF.
- Avoids setTimeout and setInterval unlike the majority of JavaScript timing functions.
- Proritises browsers and mobile devices over node.
- Limit function calls, set FPS, delay and loop to the next frame to be rendered.
- Features a comprehensive windowResize method that resolves mobile issues.
- Features a media queries detection API with built in custom events (Coming soon)
- Ability to mock jitterty/ random function calls e.g. emulate bad performance. (coming soon)
- Less than **2kb gzip size** _(will never exceed a 4kb gzip size)_



## Aim
- 4d is a tiny powerhouse, and will remain tiny.
- 4d aims to improve common timing requirements in a clean, lightweight and modular way.
- 4d stands for the fourth dimension which is considered as **time**
- 4d features a set of chosen functions that are sometimes overbloated, underperforming or not well implemented.

## Compatability
4d Is atleast compatible with IE8 +



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
- [Most 4d functions will only work in browser enviroments, not Node or the Dev Tools console]

[Click here to see the demo]()




