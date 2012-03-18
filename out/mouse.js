(function() {
  var Base, Events, Mouse,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('love/base');

  Events = require('love/events');

  Mouse = (function(_super) {

    __extends(Mouse, _super);

    Mouse.include(Events);

    define('love/mouse', Mouse);

    function Mouse(_arg) {
      this.element = _arg.element;
      this.updatePosition = __bind(this.updatePosition, this);
      this.mouseUp = __bind(this.mouseUp, this);
      this.mouseDown = __bind(this.mouseDown, this);
      this.element.bind('mousemove mousedown mouseup', this.updatePosition);
      this.element.bind('mousedown', this.mouseDown);
      this.element.bind('mouseup', this.mouseUp);
      this.buttons = {};
      this.events();
      this.x = this.y = 0;
    }

    Mouse.prototype.mouseDown = function(event) {
      var button;
      button = event.button;
      if (!this.isDown(button)) this.trigger('mouseDown', button, this.x, this.y);
      this.buttons[button] = true;
    };

    Mouse.prototype.mouseUp = function(event) {
      var button;
      button = event.button;
      if (this.isDown(button)) this.trigger('mouseUp', button, this.x, this.y);
      this.buttons[button] = false;
    };

    Mouse.prototype.updatePosition = function(event) {
      var offset;
      if (event.offsetX != null) {
        this.x = event.offsetX;
        this.y = event.offsetY;
      } else {
        offset = this.element.offset();
        this.x = event.pageX - offset.left;
        this.y = event.pageY - offset.top;
      }
    };

    Mouse.prototype.isDown = function(button) {
      return !!this.buttons[button];
    };

    Mouse.prototype.getX = function() {
      return this.x;
    };

    Mouse.prototype.getY = function() {
      return this.y;
    };

    Mouse.prototype.getPosition = function() {
      return [this.x, this.y];
    };

    return Mouse;

  })(Base);

}).call(this);
