(function() {
  var Base, Events, Keyboard,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('love/base');

  Events = require('love/events');

  Keyboard = (function(_super) {

    __extends(Keyboard, _super);

    Keyboard.include(Events);

    Keyboard.define('love/keyboard');

    function Keyboard() {
      this.keyUp = __bind(this.keyUp, this);
      this.keyDown = __bind(this.keyDown, this);      window.addEventListener('keydown', this.keyDown);
      window.addEventListener('keyup', this.keyUp);
      this.events();
      this.keys = {};
    }

    Keyboard.prototype.keyDown = function(event) {
      var key;
      key = event.keyCode;
      if (!this.isDown(key)) this.trigger('keyDown', key);
      return this.keys[key] = true;
    };

    Keyboard.prototype.keyUp = function(event) {
      var key;
      key = event.keyCode;
      if (this.isDown(key)) this.trigger('keyUp', key);
      return this.keys[key] = false;
    };

    Keyboard.prototype.isDown = function(key) {
      return !!this.keys[key];
    };

    return Keyboard;

  })(Base);

}).call(this);
