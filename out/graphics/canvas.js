(function() {
  var Asset, Canvas, Drawable, Image, Quad, rgb, rgba,
    __slice = Array.prototype.slice,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Asset = require('love/assets/asset');

  Quad = require('love/graphics/quad');

  rgb = function() {
    var rgb;
    rgb = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return "rgb(" + (rgb.join(', ')) + ")";
  };

  rgba = function() {
    var a, rgb, _i;
    rgb = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), a = arguments[_i++];
    return "rgba(" + (rgb.join(', ')) + ")";
  };

  Canvas = (function() {

    Canvas.define('love/graphics/canvas');

    function Canvas(_arg) {
      var canvas;
      canvas = _arg.element;
      this.canvas = canvas[0];
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.ctx = this.canvas.getContext('2d');
    }

    Canvas.prototype.clear = function() {
      return this.ctx.clearRect(0, 0, this.width, this.height);
    };

    Canvas.prototype.push = function() {
      return this.ctx.save();
    };

    Canvas.prototype.pop = function() {
      return this.ctx.restore();
    };

    Canvas.prototype.scale = function(x, y) {
      return this.ctx.scale(x, y);
    };

    Canvas.prototype.rotate = function(angle) {
      return this.ctx.rotate(angle);
    };

    Canvas.prototype.translate = function(x, y) {
      return this.ctx.translate(x, y);
    };

    Canvas.prototype.setBackgroundColor = function(r, g, b, a) {
      if (a == null) a = 255;
      if (_.isArray(r)) {
        return this.setBackgroundColor.apply(this, r);
      } else {
        return this.canvas.style.background = rgba(r, g, b, a);
      }
    };

    Canvas.prototype.setLineWidth = function(width) {
      return this.ctx.lineWidth = width;
    };

    Canvas.prototype.setLineCap = function(cap) {
      return this.ctx.lineCap = cap;
    };

    Canvas.prototype.setLineJoin = function(join) {
      return this.ctx.lineJoin = join;
    };

    Canvas.prototype.setColor = function(r, g, b, a, type) {
      var str;
      if ((r != null) && (g != null) && (b != null)) {
        str = rgb(r, g, b);
        if (type != null) {
          this.ctx["" + type + "Style"] = str;
        } else {
          this.ctx.fillStyle = this.ctx.strokeStyle = str;
        }
      }
      if (a != null) return this.ctx.globalAlpha = a / 255;
    };

    Canvas.prototype.rectangle = function(mode, x, y, width, height) {
      var func;
      func = (function() {
        switch (mode) {
          case "fill":
            return "fillRect";
          case "line":
            return "strokeRect";
        }
      })();
      return this.ctx[func](x, y, width, height);
    };

    Canvas.prototype.circle = function(mode, x, y, radius) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      switch (mode) {
        case "fill":
          return this.ctx.fill();
        case "line":
          return this.ctx.stroke();
      }
    };

    Canvas.prototype.line = function() {
      var i, x, y, _len, _step;
      this.ctx.beginPath();
      for (i = 0, _len = arguments.length, _step = 2; i < _len; i += _step) {
        x = arguments[i];
        y = arguments[i + 1];
        this.ctx.lineTo(x, y);
      }
      return this.ctx.stroke();
    };

    Canvas.prototype.draw = function(drawable, x, y, r, sx, sy, ox, oy) {
      if (r == null) r = 0;
      if (sx == null) sx = 1;
      if (sy == null) sy = sx;
      if (ox == null) ox = 0;
      if (oy == null) oy = 0;
      if (r === 0 && sx === 1 && sy === sx) {
        x = x - ox;
        y = y - oy;
        return drawable.draw(this.ctx, x, y);
      } else {
        this.push();
        this.translate(x, y);
        this.rotate(r);
        this.translate(-ox, -oy);
        this.scale(sx, sy);
        drawable.draw(this.ctx, 0, 0);
        return this.pop();
      }
    };

    Canvas.prototype.drawq = function(image, quad, x, y, r, sx, sy, ox, oy) {
      if (r == null) r = 0;
      if (sx == null) sx = 1;
      if (sy == null) sy = sx;
      if (ox == null) ox = 0;
      if (oy == null) oy = 0;
      if (r === 0 && sx === 1 && sy === sx) {
        x = x - ox;
        y = y - oy;
        return image.drawQuad(this.ctx, quad, x, y);
      } else {
        this.push();
        this.translate(x, y);
        this.rotate(r);
        this.translate(-ox, -oy);
        this.scale(sx, sy);
        image.drawQuad(this.ctx, quad, 0, 0);
        return this.pop();
      }
    };

    Canvas.prototype.newImage = function(image) {
      return new Image(image);
    };

    Canvas.prototype.newQuad = function(x, y, width, height) {
      return new Quad(x, y, width, height);
    };

    return Canvas;

  })();

  Drawable = (function() {

    function Drawable() {}

    Drawable.define('love/graphics/canvas/drawable');

    Drawable.prototype.draw = function(ctx, x, y) {};

    return Drawable;

  })();

  Image = (function(_super) {

    __extends(Image, _super);

    Image.define('love/graphics/canvas/image');

    function Image(image) {
      if (image instanceof Asset) image = image.getContent();
      this.image = image;
    }

    Image.prototype.draw = function(ctx, x, y) {
      return ctx.drawImage(this.image, x, y);
    };

    Image.prototype.drawQuad = function(ctx, quad, x, y) {
      return ctx.drawImage(this.image, quad.x, quad.y, quad.width, quad.height, x, y, quad.width, quad.height);
    };

    return Image;

  })(Drawable);

}).call(this);
