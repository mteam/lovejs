(function() {
  var Base, Events, Keyboard, i, keys, letter, _len, _ref,
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
      if (!this.isDown(key)) this.trigger('keyDown', this.getName(key));
      return this.keys[key] = true;
    };

    Keyboard.prototype.keyUp = function(event) {
      var key;
      key = event.keyCode;
      if (this.isDown(key)) this.trigger('keyUp', this.getName(key));
      return this.keys[key] = false;
    };

    Keyboard.prototype.isDown = function(key) {
      return !!this.keys[key];
    };

    Keyboard.prototype.getName = function(code) {
      return keys[code] || code;
    };

    return Keyboard;

  })(Base);

  keys = {
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
  for (i = 0, _len = _ref.length; i < _len; i++) {
    letter = _ref[i];
    keys[i + 65] = letter;
  }

  for (i = 0; i <= 9; i++) {
    keys[i + 48] = i;
    keys[i + 96] = "kp" + i;
  }

  for (i = 1; i <= 12; i++) {
    keys[i + 111] = "f" + i;
  }

}).call(this);
