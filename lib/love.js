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

love.timer = require('./timer');

love.graphics = require('./graphics');

love.keyboard = require('./keyboard');

love.mouse = require('./mouse');

love.assets = require('./assets');

love.run = function() {
  if (typeof love.load === "function") {
    love.load();
  }
  createHandlers();
  return love.assets.loaded(function() {
    return love.timer.step();
  });
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
 
var dt, eventify, getMicroTime, last, now, requestFrame, timer, updateDelta;

timer = exports;

eventify = require('./events');

eventify(timer);

requestFrame = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(cb) {
  return window.setTimeout(cb, 1000 / 60);
}).bind(window);

getMicroTime = function() {
  return +(new Date) / 1000;
};

dt = 0;

last = getMicroTime();

now = 0;

updateDelta = function() {
  now = getMicroTime();
  dt = now - last;
  return last = now;
};

timer.step = function() {
  updateDelta();
  timer.trigger('step');
  return requestFrame(timer.step);
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
  el.addEventListener('mouseup', mouse.up);
  el.addEventListener('mousedown', mouse.down);
  el.addEventListener('mousewheel', mouse.wheel);
  return el.addEventListener('DOMMouseScroll', mouse.wheel);
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
 
   
 
  mallow.modules["lovejs/assets/asset"] = function (require, module, exports) { 
 
var Asset, eventify,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

eventify = require('../events');

Asset = (function() {

  function Asset() {
    this.loaded = __bind(this.loaded, this);
    eventify(this);
  }

  Asset.prototype.loaded = function() {
    return this.trigger('load');
  };

  Asset.prototype.load = function() {};

  Asset.prototype.getContent = function() {};

  return Asset;

})();

module.exports = Asset;
 
 
  }; 
 
   
 
  mallow.modules["lovejs/assets/index"] = function (require, module, exports) { 
 
var Image, assetLoaded, assets, expected, loaded, onLoad;

assets = exports;

Image = require('./image');

loaded = 0;

expected = 0;

onLoad = null;

assetLoaded = function() {
  loaded++;
  if (expected === loaded && (onLoad != null)) {
    return onLoad();
  }
};

assets.load = function(asset) {
  expected++;
  asset.on('load', assetLoaded);
  return asset.load();
};

assets.loaded = function(cb) {
  if (expected === loaded) {
    return cb();
  } else {
    return onLoad = cb;
  }
};

assets.newImage = function() {
  var image;
  image = (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args), t = typeof result;
    return t == "object" || t == "function" ? result || child : child;
  })(Image, arguments, function(){});
  assets.load(image);
  return image;
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

  Image.prototype.name = "image";

  function Image(src) {
    this.src = src;
    Image.__super__.constructor.call(this);
    this.el = new HTMLImage;
    this.el.addEventListener('load', this.loaded);
  }

  Image.prototype.load = function() {
    return this.el.src = this.src;
  };

  Image.prototype.getContent = function() {
    return this.el;
  };

  return Image;

})(Asset);

module.exports = Image;
 
 
  }; 
 
   
 
}).call(this); 
