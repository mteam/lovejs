LÖVE.js
=======

LÖVE.js is a game engine for developing 2D games in the browser. It is written in JavaScript and fully covered by tests.

This is a partial port of [LÖVE game engine](http://love2d.org/) written in Lua.

Usage 
-----

```javascript
var love = require('love');

var prev = { x: null, y: null },
    canvas;

love.load = function() {
  var screen = love.graphics.newCanvas('#drawing');
  love.graphics.setScreen(screen);

  canvas = love.graphics.newCanvas();

  love.mouse.on('moved', moved);
};

function moved() {
  var pos = love.mouse.getPosition();

  if (love.mouse.isDown('left')) {
    canvas.use(function() {
      love.graphics.line(prev.x, prev.y, pos.x, pos.y);
    });
  }

  prev.x = pos.x;
  prev.y = pos.y;
}

love.draw = function() {
  love.graphics.draw(canvas, 0, 0);
};

love.run();

```
More examples are in the `examples` directory.

Building
-------

LÖVE.js uses CommonJS-style modules. But don't worry, to build you just need to run `npm install` to install dependencies and then `make build`. The output file will be in the `out` directory.


Documentation
-------------

The documentation can be found at [lovejs.rtfd.org](http://lovejs.rtfd.org). You can also look at some examples in the `examples` directory.


Running tests
-------------
First, run `npm install` to install dependencies.

1. **In a browser**  
   Just run `make browser-test` and open localhost:3000.

2. **Without a browser**  
   Yeah, testing browser-based game engine without a browser.  
   Just run `make test`.