(function() {
  var Asset, Drawable, Graphics, Image, Quad, rgb, rgba,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Asset = require('love/assets/asset');

  rgb = rgba = function(r, g, b, a) {
    if (a != null) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + (a / 255) + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  };

  Graphics = (function() {

    Graphics.define('love/graphics');

    function Graphics(_arg) {
      var canvas;
      canvas = _arg.element;
      this.canvas = canvas[0];
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.ctx = this.canvas.getContext('2d');
    }

    Graphics.prototype.clear = function() {
      return this.ctx.clearRect(0, 0, this.width, this.height);
    };

    Graphics.prototype.push = function() {
      return this.ctx.save();
    };

    Graphics.prototype.pop = function() {
      return this.ctx.restore();
    };

    Graphics.prototype.scale = function(x, y) {
      return this.ctx.scale(x, y);
    };

    Graphics.prototype.rotate = function(angle) {
      return this.ctx.rotate(angle);
    };

    Graphics.prototype.translate = function(x, y) {
      return this.ctx.translate(x, y);
    };

    Graphics.prototype.setBackgroundColor = function(r, g, b, a) {
      if (a == null) a = 255;
      if (_.isArray(r)) {
        return this.setBackgroundColor.apply(this, r);
      } else {
        return this.canvas.style.background = rgba(r, g, b, a);
      }
    };

    Graphics.prototype.setLineWidth = function(width) {
      return this.ctx.lineWidth = width;
    };

    Graphics.prototype.setLineCap = function(cap) {
      return this.ctx.lineCap = cap;
    };

    Graphics.prototype.setLineJoin = function(join) {
      return this.ctx.lineJoin = join;
    };

    Graphics.prototype.setColor = function(r, g, b, a, type) {
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

    Graphics.prototype.rectangle = function(mode, x, y, width, height) {
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

    Graphics.prototype.circle = function(mode, x, y, radius) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      switch (mode) {
        case "fill":
          return this.ctx.fill();
        case "line":
          return this.ctx.stroke();
      }
    };

    Graphics.prototype.line = function() {
      var i, x, y, _len, _step;
      this.ctx.beginPath();
      for (i = 0, _len = arguments.length, _step = 2; i < _len; i += _step) {
        x = arguments[i];
        y = arguments[i + 1];
        this.ctx.lineTo(x, y);
      }
      return this.ctx.stroke();
    };

    Graphics.prototype.draw = function(drawable, x, y, r, sx, sy, ox, oy) {
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

    Graphics.prototype.drawq = function(image, quad, x, y, r, sx, sy, ox, oy) {
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

    Graphics.prototype.newImage = function(image) {
      return new Image(image);
    };

    Graphics.prototype.newQuad = function(x, y, width, height) {
      return new Quad(x, y, width, height);
    };

    return Graphics;

  })();

  Drawable = (function() {

    function Drawable() {}

    Drawable.define('love/graphics/drawable');

    Drawable.prototype.draw = function(ctx, x, y) {};

    return Drawable;

  })();

  Image = (function(_super) {

    __extends(Image, _super);

    Image.define('love/graphics/image');

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

  Quad = (function() {

    Quad.define('love/graphics/quad');

    function Quad(x, y, width, height) {
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

}).call(this);
