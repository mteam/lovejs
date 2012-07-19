(function() { 
 
  var mallow; 
 
  if (this.mallow == null) { 
    mallow = { 
      cache: {}, 
      modules: {}, 
 
      init: function (name) { 
        if (mallow.modules[name] == null) { 
          throw new Error("Module '" + name + "' does not exist"); 
        } 
 
        var define = mallow.modules[name]; 
        var module = { exports: {}, name: name }; 
        var require = function (name) { 
          return mallow.get(mallow.expand(mallow.dirname(module.name), name)); 
        }; 
 
        mallow.cache[name] = module; 
        define(require, module, module.exports); 
      }, 
 
      normalize: function (name) { 
        if (mallow.modules[name] != null) { 
          return name; 
        } else if (mallow.modules[name + '/index'] != null) { 
          return name + '/index'; 
        } else { 
          return name; 
        } 
      }, 
 
      get: function (name) { 
        name = mallow.normalize(name); 
         
        if (mallow.cache[name] == null) { 
          mallow.init(name); 
        } 
 
        return mallow.cache[name].exports; 
      }, 
 
      expand: function (root, name) { 
        var results = [], parts, part; 
 
        if (/^\.\.?(\/|$)/.test(name)) { 
          parts = [root, name].join('/').split('/'); 
        } else { 
          parts = name.split('/'); 
        } 
 
        for (var i = 0, length = parts.length; i < length; i++) { 
          part = parts[i]; 
          if (part === '..') { 
            results.pop(); 
          } else if (part !== '.' && part !== '') { 
            results.push(part); 
          } 
        } 
 
        return results.join('/'); 
      }, 
 
      dirname: function (path) { 
        return path.split('/').slice(0, -1).join('/'); 
      } 
    }; 
 
    this.mallow = mallow; 
  } else { 
    mallow = this.mallow; 
  } 
 
  if (this.require == null) { 
    this.require = mallow.get; 
  } 
 
 
 
   
 
  mallow.modules["lovejs/keyboard"] = function (require, module, exports) { 
 
var down, eventify, getCode, getKey, i, keyboard, letter, names, pressed, up, _i, _j, _k, _len, _ref,
  __slice = [].slice;

keyboard = exports;

eventify = require('./events');

pressed = {};

eventify(keyboard);

keyboard.createHandlers = function() {
  window.addEventListener('keydown', down);
  return window.addEventListener('keyup', up);
};

keyboard.isDown = function() {
  var args;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  if (args.length === 1) {
    return !!pressed[args[0]];
  } else {
    return args.some(function(key) {
      return pressed[key];
    });
  }
};

getKey = function(code) {
  return names[code] || code;
};

getCode = function(event) {
  return event.keyCode;
};

down = function(event) {
  var code, key;
  code = getCode(event);
  key = getKey(code);
  if (!pressed[key]) {
    keyboard.trigger('keyDown', key, code);
  }
  return pressed[key] = true;
};

up = function(event) {
  var code, key;
  code = getCode(event);
  key = getKey(code);
  if (pressed[key]) {
    keyboard.trigger('keyUp', key, code);
  }
  return pressed[key] = false;
};

names = {
  8: "backspace",
  9: "tab",
  13: "return",
  16: "shift",
  17: "ctrl",
  18: "alt",
  20: "capslock",
  32: " ",
  33: "pageup",
  34: "pagedown",
  35: "end",
  36: "home",
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  45: "insert",
  46: "delete",
  91: "meta",
  93: "menu",
  106: "kp*",
  107: "kp+",
  109: "kp-",
  110: "kp.",
  111: "kp/",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
};

_ref = 'abcdefghijklmnopqrstuvwxyz'.split('');
for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
  letter = _ref[i];
  names[i + 65] = letter;
}

for (i = _j = 0; _j <= 9; i = ++_j) {
  names[i + 48] = i;
  names[i + 96] = "kp" + i;
}

for (i = _k = 1; _k <= 12; i = ++_k) {
  names[i + 111] = "f" + i;
}
 
 
  }; 
 
   
 
  mallow.modules["lovejs/index"] = function (require, module, exports) { 
 
var createHandlers, love;

love = exports;

require('./shims');

love.timer = require('./timer');

love.graphics = require('./graphics');

love.keyboard = require('./keyboard');

love.mouse = require('./mouse');

love.assets = require('./assets');

love.utils = require('./utils');

love.eventify = require('./events');

love.run = function() {
  if (typeof love.load === "function") {
    love.load();
  }
  createHandlers();
  return love.timer.step();
};

love.step = function() {
  if (typeof love.update === "function") {
    love.update(love.timer.getDelta());
  }
  love.graphics.clear();
  love.graphics.push();
  if (typeof love.draw === "function") {
    love.draw();
  }
  return love.graphics.pop();
};

createHandlers = function() {
  if (love.keyboard != null) {
    love.keyboard.createHandlers();
    if (love.keypressed != null) {
      love.keyboard.on('keyDown', love.keypressed.bind(love));
    }
    if (love.keyreleased != null) {
      love.keyboard.on('keyUp', love.keyreleased.bind(love));
    }
  }
  if (love.mouse != null) {
    love.mouse.createHandlers();
    if (love.mousepressed != null) {
      love.mouse.on('mouseDown', love.mousepressed.bind(love));
    }
    if (love.mousereleased != null) {
      love.mouse.on('mouseUp', love.mousereleased.bind(love));
    }
  }
  return love.timer.on('step', love.step);
};
 
 
  }; 
 
   
 
  mallow.modules["lovejs/events"] = function (require, module, exports) { 
 
var __slice = [].slice;

module.exports = function(obj) {
  var events, _ref, _ref1, _ref2;
  events = {};
  if ((_ref = obj.on) == null) {
    obj.on = function(event, cb) {
      var _ref1;
      if ((_ref1 = events[event]) == null) {
        events[event] = [];
      }
      events[event].push(cb);
      return obj;
    };
  }
  if ((_ref1 = obj.trigger) == null) {
    obj.trigger = function() {
      var args, callback, event, _i, _len, _ref2;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (!events[event]) {
        return;
      }
      _ref2 = events[event];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        callback = _ref2[_i];
        callback.apply(null, args);
      }
      return obj;
    };
  }
  return (_ref2 = obj.__events) != null ? _ref2 : obj.__events = events;
};
 
 
  }; 
 
   
 
  mallow.modules["lovejs/timer"] = function (require, module, exports) { 
 
var dt, eventify, getMicroTime, last, timer;

timer = exports;

eventify = require('./events');

eventify(timer);

getMicroTime = function() {
  return Date.now() / 1000;
};

dt = 0;

last = getMicroTime();

timer.step = function() {
  var now;
  now = getMicroTime();
  dt = now - last;
  last = now;
  timer.trigger('step');
  return window.requestAnimationFrame(timer.step);
};

timer.getDelta = function() {
  return dt;
};

timer.getFPS = function() {
  return 1 / timer.getDelta();
};

timer.getMicroTime = getMicroTime;
 
 
  }; 
 
   
 
  mallow.modules["lovejs/mouse"] = function (require, module, exports) { 
 
var down, eventify, getButton, getOffset, getPosition, graphics, mouse, pos, pressed, up, updatePosition, wheel;

mouse = exports;

graphics = require('./graphics');

eventify = require('./events');

eventify(mouse);

pressed = {};

pos = {
  x: 0,
  y: 0
};

mouse.createHandlers = function() {
  var el, event, _i, _len, _ref;
  el = graphics.getCanvas().el;
  _ref = ['mousemove', 'mousedown', 'mouseup'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    event = _ref[_i];
    el.addEventListener(event, updatePosition);
  }
  el.addEventListener('mouseup', up);
  el.addEventListener('mousedown', down);
  el.addEventListener('mousewheel', wheel);
  return el.addEventListener('DOMMouseScroll', wheel);
};

mouse.isDown = function(button) {
  return !!pressed[button];
};

mouse.getPosition = function() {
  return [pos.x, pos.y];
};

mouse.getX = function() {
  return pos.x;
};

mouse.getY = function() {
  return pos.y;
};

up = function(event) {
  var button;
  button = getButton(event);
  if (mouse.isDown(button)) {
    mouse.trigger('mouseUp', pos.x, pos.y, button);
  }
  return pressed[button] = false;
};

down = function(event) {
  var button;
  button = getButton(event);
  if (!mouse.isDown(button)) {
    mouse.trigger('mouseDown', pos.x, pos.y, button);
  }
  return pressed[button] = true;
};

wheel = function(event) {
  var button;
  if (event.detail != null) {
    if (event.detail > 0) {
      button = "wd";
    } else if (event.detail < 0) {
      button = "wu";
    }
  } else if (event.wheelDelta != null) {
    if (event.wheelDelta < 0) {
      button = "wd";
    } else if (event.wheelDelta > 0) {
      button = "wu";
    }
  }
  return mouse.trigger('mouseDown', pos.x, pos.y, button);
};

updatePosition = function(event) {
  var _ref;
  return _ref = getPosition(event), pos.x = _ref[0], pos.y = _ref[1], _ref;
};

getPosition = function(event) {
  var offset, x, y;
  if (event.offsetX != null) {
    x = event.offsetX;
    y = event.offsetY;
  } else {
    offset = getOffset(event.target);
    x = event.pageX - offset.left;
    y = event.pageY - offset.top;
  }
  return [x, y];
};

getOffset = function(element) {
  var left, top;
  left = top = 0;
  if (element.offsetParent) {
    while (true) {
      left += element.offsetLeft;
      top += element.offsetTop;
      if (!(element = element.offsetParent)) {
        break;
      }
    }
  }
  return {
    left: left,
    top: top
  };
};

getButton = function(event) {
  switch (event.button) {
    case 0:
      return 'l';
    case 1:
      return 'm';
    case 2:
      return 'r';
  }
};
 
 
  }; 
 
   
 
  mallow.modules["lovejs/shims/index"] = function (require, module, exports) { 
 

require('./raf');
 
 
  }; 
 
   
 
  mallow.modules["lovejs/shims/raf"] = function (require, module, exports) { 
 
/**
 * @author Erik Möller, http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 */

var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelRequestAnimationFrame = window[vendors[x]+
      'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
 
 
  }; 
 
   
 
  mallow.modules["lovejs/graphics/drawable"] = function (require, module, exports) { 
 
var Drawable;

Drawable = (function() {

  function Drawable() {}

  Drawable.prototype.draw = function(ctx, x, y) {
    throw new Error('this object cannot be drawn');
  };

  Drawable.prototype.drawq = function(ctx, quad, x, y) {
    throw new Error('this object cannot be drawn with quad');
  };

  return Drawable;

})();

module.exports = Drawable;
 
 
  }; 
 
   
 
  mallow.modules["lovejs/graphics/index"] = function (require, module, exports) { 
 
var $canvas, $first, Canvas, Image, Quad, isElement, rgb, rgba,
  __slice = [].slice;

Canvas = require('./canvas');

Image = require('./image');

Quad = require('./quad');

isElement = function(obj) {
  return (obj != null ? obj.nodeType : void 0) === 1;
};

rgb = function() {
  var rgb;
  rgb = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return "rgb(" + (rgb.join(', ')) + ")";
};

rgba = function() {
  var rgba;
  rgba = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return "rgba(" + (rgba.join(', ')) + ")";
};

$first = null;

$canvas = null;

module.exports = {
  setCanvas: function(canvas) {
    if (canvas == null) {
      canvas = null;
    }
    if (isElement(canvas)) {
      canvas = new Canvas(canvas);
    }
    if (canvas === null) {
      canvas = $first;
    }
    if (canvas instanceof Canvas) {
      if ($first === null) {
        $first = canvas;
      }
      return $canvas = canvas;
    } else {
      throw new Error("this ain't canvas!");
    }
  },
  getCanvas: function() {
    return $canvas;
  },
  setBackgroundColor: function(r, g, b, a) {
    if (a == null) {
      a = 0xff;
    }
    $canvas.state.background = [r, g, b, a];
    return $canvas.style.backgroundColor = rgba(r, g, b, a);
  },
  getBackgroundColor: function() {
    return $canvas.state.background || [0xff, 0xff, 0xff, 0xff];
  },
  clear: function() {
    return $canvas.ctx.clearRect(0, 0, $canvas.width, $canvas.height);
  },
  setLineWidth: function(width) {
    return $canvas.ctx.lineWidth = width;
  },
  getLineWidth: function() {
    return $canvas.ctx.lineWidth;
  },
  setLineCap: function(cap) {
    return $canvas.ctx.lineCap = cap;
  },
  getLineCap: function() {
    return $canvas.ctx.lineCap;
  },
  setLineJoin: function(join) {
    return $canvas.ctx.lineJoin = join;
  },
  getLineJoin: function() {
    return $canvas.ctx.lineJoin;
  },
  setColor: function(r, g, b, a, type) {
    if ((r != null) && (g != null) && (b != null)) {
      $canvas.ctx.fillStyle = $canvas.ctx.strokeStyle = rgb(r, g, b);
    }
    if (a != null) {
      $canvas.ctx.globalAlpha = a / 0xff;
    }
    return $canvas.state.color = [r, g, b, a];
  },
  getColor: function() {
    return $canvas.state.color || [0x00, 0x00, 0x00, 0xff];
  },
  rectangle: function(mode, x, y, width, height) {
    var func;
    func = (function() {
      switch (mode) {
        case "fill":
          return "fillRect";
        case "line":
          return "strokeRect";
      }
    })();
    return $canvas.ctx[func](x, y, width, height);
  },
  circle: function(mode, x, y, radius) {
    $canvas.ctx.beginPath();
    $canvas.ctx.arc(x, y, radius, 0, Math.PI * 2);
    switch (mode) {
      case "fill":
        return $canvas.ctx.fill();
      case "line":
        return $canvas.ctx.stroke();
    }
  },
  line: function() {
    var i, x, y, _i, _len, _step;
    $canvas.ctx.beginPath();
    for (i = _i = 0, _len = arguments.length, _step = 2; _i < _len; i = _i += _step) {
      x = arguments[i];
      y = arguments[i + 1];
      $canvas.ctx.lineTo(x, y);
    }
    return $canvas.ctx.stroke();
  },
  print: function(text, x, y) {
    return $canvas.ctx.fillText(text, x, y);
  },
  push: function() {
    return $canvas.ctx.save();
  },
  pop: function() {
    return $canvas.ctx.restore();
  },
  scale: function(x, y) {
    return $canvas.ctx.scale(x, y);
  },
  rotate: function(angle) {
    return $canvas.ctx.rotate(angle);
  },
  translate: function(x, y) {
    return $canvas.ctx.translate(x, y);
  },
  draw: function(drawable, x, y, r, sx, sy, ox, oy) {
    if (r == null) {
      r = 0;
    }
    if (sx == null) {
      sx = 1;
    }
    if (sy == null) {
      sy = sx;
    }
    if (ox == null) {
      ox = 0;
    }
    if (oy == null) {
      oy = 0;
    }
    if (arguments.length === 3) {
      return drawable.draw($canvas.ctx, x, y);
    } else {
      this.push();
      this.translate(x, y);
      this.rotate(r);
      this.translate(-ox, -oy);
      this.scale(sx, sy);
      drawable.draw($canvas.ctx, 0, 0);
      return this.pop();
    }
  },
  drawq: function(drawable, quad, x, y, r, sx, sy, ox, oy) {
    if (r == null) {
      r = 0;
    }
    if (sx == null) {
      sx = 1;
    }
    if (sy == null) {
      sy = sx;
    }
    if (ox == null) {
      ox = 0;
    }
    if (oy == null) {
      oy = 0;
    }
    if (arguments.length === 3) {
      return drawable.drawQuad($canvas.ctx, quad, x, y);
    } else {
      this.push();
      this.translate(x, y);
      this.rotate(r);
      this.translate(-ox, -oy);
      this.scale(sx, sy);
      drawable.drawq($canvas.ctx, quad, 0, 0);
      return this.pop();
    }
  },
  newCanvas: function() {
    if (arguments.length === 0 && ($first != null)) {
      return new Canvas($first.width, $first.height);
    } else {
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args), t = typeof result;
        return t == "object" || t == "function" ? result || child : child;
      })(Canvas, arguments, function(){});
    }
  },
  newImage: function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args), t = typeof result;
      return t == "object" || t == "function" ? result || child : child;
    })(Image, arguments, function(){});
  },
  newQuad: function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args), t = typeof result;
      return t == "object" || t == "function" ? result || child : child;
    })(Quad, arguments, function(){});
  }
};
 
 
  }; 
 
   
 
  mallow.modules["lovejs/graphics/quad"] = function (require, module, exports) { 
 
var Quad;

Quad = (function() {

  function Quad(x, y, width, height, sw, sh) {
    this.sw = sw;
    this.sh = sh;
    this.setViewport(x, y, width, height);
  }

  Quad.prototype.setViewport = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  };

  Quad.prototype.getViewport = function() {
    return [this.x, this.y, this.width, this.height];
  };

  Quad.prototype.flip = function(x, y) {
    if ((x && this.width > 0) || (!x && this.width < 0)) {
      this.width = -this.width;
    }
    if ((y && this.height > 0) || (!y && this.height < 0)) {
      return this.height = -this.height;
    }
  };

  return Quad;

})();

module.exports = Quad;
 
 
  }; 
 
   
 
  mallow.modules["lovejs/graphics/image"] = function (require, module, exports) { 
 
var Drawable, Image, ImageAsset,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Drawable = require('./drawable');

ImageAsset = require('../assets/image');

Image = (function(_super) {

  __extends(Image, _super);

  function Image(image) {
    if (image instanceof ImageAsset) {
      image = image.getContent();
    }
    this.image = image;
  }

  Image.prototype.draw = function(ctx, x, y) {
    return ctx.drawImage(this.image, x, y);
  };

  Image.prototype.drawq = function(ctx, q, x, y) {
    return ctx.drawImage(this.image, q.x, q.y, q.width, q.height, x, y, q.sw, q.sh);
  };

  return Image;

})(Drawable);
 
 
  }; 
 
   
 
  mallow.modules["lovejs/graphics/canvas"] = function (require, module, exports) { 
 
var Canvas, Drawable,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Drawable = require('./drawable');

Canvas = (function(_super) {

  __extends(Canvas, _super);

  function Canvas() {
    var el;
    if (arguments.length === 1) {
      el = arguments[0];
    } else if (arguments.length === 2) {
      el = document.createElement('canvas');
      el.width = arguments[0];
      el.height = arguments[1];
    }
    this.el = el;
    this.width = el.width;
    this.height = el.height;
    this.ctx = el.getContext('2d');
    this.style = el.style;
    this.state = {};
  }

  Canvas.prototype.draw = function(ctx, x, y) {
    return ctx.drawImage(this.el, x, y);
  };

  Canvas.prototype.drawq = function(ctx, q, x, y) {
    return ctx.drawImage(this.el, q.x, q.y, q.width, q.height, x, y, q.sw, q.sh);
  };

  return Canvas;

})(Drawable);

module.exports = Canvas;
 
 
  }; 
 
   
 
  mallow.modules["lovejs/utils/index"] = function (require, module, exports) { 
 

exports.stats = function() {
  return require('./stats');
};
 
 
  }; 
 
   
 
  mallow.modules["lovejs/utils/stats"] = function (require, module, exports) { 
 
/*
The MIT License

Copyright (c) 2009-2012 Mr.doob

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/**
 * @author mrdoob / http://mrdoob.com/
 */

var startTime = Date.now(), prevTime = startTime;
var ms = 0, msMin = 1000, msMax = 0;
var fps = 0, fpsMin = 1000, fpsMax = 0;
var frames = 0, mode = 0; 

var container = document.createElement( 'div' );
container.id = 'stats';
container.addEventListener( 'mousedown', function ( event ) { event.preventDefault(); setMode( ++ mode % 2 ) }, false );
container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer';

var fpsDiv = document.createElement( 'div' );
fpsDiv.id = 'fps';
fpsDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#002';
container.appendChild( fpsDiv );

var fpsText = document.createElement( 'div' );
fpsText.id = 'fpsText';
fpsText.style.cssText = 'color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
fpsText.innerHTML = 'FPS';
fpsDiv.appendChild( fpsText );

var fpsGraph = document.createElement( 'div' );
fpsGraph.id = 'fpsGraph';
fpsGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0ff';
fpsDiv.appendChild( fpsGraph );

while ( fpsGraph.children.length < 74 ) {

	var bar = document.createElement( 'span' );
	bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#113';
	fpsGraph.appendChild( bar );

}

var msDiv = document.createElement( 'div' );
msDiv.id = 'ms';
msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#020;display:none';
container.appendChild( msDiv );

var msText = document.createElement( 'div' );
msText.id = 'msText';
msText.style.cssText = 'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
msText.innerHTML = 'MS';
msDiv.appendChild( msText );

var msGraph = document.createElement( 'div' );
msGraph.id = 'msGraph';
msGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0f0';
msDiv.appendChild( msGraph );

while ( msGraph.children.length < 74 ) {

	var bar = document.createElement( 'span' );
	bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#131';
	msGraph.appendChild( bar );

}

var setMode = function ( value ) {

	mode = value;

	switch ( mode ) {

		case 0:
			fpsDiv.style.display = 'block';
			msDiv.style.display = 'none';
			break;
		case 1:
			fpsDiv.style.display = 'none';
			msDiv.style.display = 'block';
			break;
	}

};

var updateGraph = function ( dom, value ) {

	var child = dom.appendChild( dom.firstChild );
	child.style.height = value + 'px';

};

module.exports = {

	domElement: container,

	setMode: setMode,

	begin: function () {

		startTime = Date.now();

	},

	end: function () {

		var time = Date.now();

		ms = time - startTime;
		msMin = Math.min( msMin, ms );
		msMax = Math.max( msMax, ms );

		msText.textContent = ms + ' MS (' + msMin + '-' + msMax + ')';
		updateGraph( msGraph, Math.min( 30, 30 - ( ms / 200 ) * 30 ) );

		frames ++;

		if ( time > prevTime + 1000 ) {

			fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) );
			fpsMin = Math.min( fpsMin, fps );
			fpsMax = Math.max( fpsMax, fps );

			fpsText.textContent = fps + ' FPS (' + fpsMin + '-' + fpsMax + ')';
			updateGraph( fpsGraph, Math.min( 30, 30 - ( fps / 100 ) * 30 ) );

			prevTime = time;
			frames = 0;

		}

		return time;

	},

	update: function () {

		startTime = this.end();

	}

};
 
 
  }; 
 
   
 
  mallow.modules["lovejs/assets/asset"] = function (require, module, exports) { 
 
var Asset, eventify,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

eventify = require('../events');

Asset = (function() {

  function Asset() {
    this.loaded = __bind(this.loaded, this);
    eventify(this);
    this.__loaded = false;
  }

  Asset.prototype.load = function() {};

  Asset.prototype.isLoaded = function() {
    return this.__loaded;
  };

  Asset.prototype.loaded = function() {
    this.trigger('loaded');
    return this.__loaded = true;
  };

  Asset.prototype.getContent = function() {};

  Asset.prototype.getProgress = function() {
    return {
      loaded: this.isLoaded() ? 1 : 0,
      total: 1
    };
  };

  return Asset;

})();

module.exports = Asset;
 
 
  }; 
 
   
 
  mallow.modules["lovejs/assets/index"] = function (require, module, exports) { 
 
var Bundle, Image, assets, main;

Bundle = require('./bundle');

Image = require('./image');

assets = exports;

assets.all = main = new Bundle;

assets.add = function(assets, cb) {
  var bundle;
  bundle = new Bundle(assets);
  if (cb != null) {
    bundle.on('loaded', cb);
  }
  main.add(bundle);
  return bundle;
};

assets.addImage = function(name, cb) {
  var image;
  image = new Image(name);
  assets.add(image, cb);
  return image;
};

assets.addImages = function(names, cb) {
  var images, name;
  images = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = names.length; _i < _len; _i++) {
      name = names[_i];
      _results.push(new Image(name));
    }
    return _results;
  })();
  assets.add(images, cb);
  return images;
};

assets.load = function(cb) {
  var triggered;
  triggered = false;
  main.on('loaded', function() {
    if (!triggered) {
      triggered = true;
      return cb();
    }
  });
  return main.load();
};

assets.getProgress = function() {
  return main.getProgress();
};

assets.newImage = function() {
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args), t = typeof result;
    return t == "object" || t == "function" ? result || child : child;
  })(Image, arguments, function(){});
};

assets.newBundle = function() {
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args), t = typeof result;
    return t == "object" || t == "function" ? result || child : child;
  })(Bundle, arguments, function(){});
};
 
 
  }; 
 
   
 
  mallow.modules["lovejs/assets/image"] = function (require, module, exports) { 
 
var Asset, HTMLImage, Image,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Asset = require('./asset');

HTMLImage = this.Image;

Image = (function(_super) {

  __extends(Image, _super);

  function Image(src) {
    this.src = src;
    Image.__super__.constructor.call(this);
    this.el = new HTMLImage;
    this.el.addEventListener('load', this.loaded);
  }

  Image.prototype.getContent = function() {
    return this.el;
  };

  Image.prototype.load = function() {
    if (this.isLoaded()) {
      return this.loaded();
    } else {
      return this.el.src = this.src;
    }
  };

  return Image;

})(Asset);

module.exports = Image;
 
 
  }; 
 
   
 
  mallow.modules["lovejs/assets/bundle"] = function (require, module, exports) { 
 
var Asset, Bundle,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Asset = require('./asset');

Bundle = (function(_super) {

  __extends(Bundle, _super);

  function Bundle(assets) {
    var asset, _i, _len;
    if (assets == null) {
      assets = [];
    }
    Bundle.__super__.constructor.call(this);
    this.assets = {
      all: [],
      loaded: []
    };
    for (_i = 0, _len = assets.length; _i < _len; _i++) {
      asset = assets[_i];
      this.add(asset);
    }
  }

  Bundle.prototype.add = function(asset) {
    var _this = this;
    asset.on('loaded', function() {
      _this.assets.loaded.push(asset);
      if (_this.isLoaded()) {
        return _this.loaded();
      }
    });
    return this.assets.all.push(asset);
  };

  Bundle.prototype.isLoaded = function() {
    return this.assets.loaded.length === this.assets.all.length;
  };

  Bundle.prototype.load = function() {
    var asset, _i, _len, _ref, _results;
    this.assets.loaded = [];
    _ref = this.assets.all;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      asset = _ref[_i];
      _results.push(asset.load());
    }
    return _results;
  };

  Bundle.prototype.getProgress = function() {
    var asset, progress, result, _i, _len, _ref;
    result = {
      loaded: 0,
      total: 0
    };
    _ref = this.assets.all;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      asset = _ref[_i];
      progress = asset.getProgress();
      result.loaded += progress.loaded;
      result.total += progress.total;
    }
    return result;
  };

  return Bundle;

})(Asset);

module.exports = Bundle;
 
 
  }; 
 
   
 
}).call(this); 
