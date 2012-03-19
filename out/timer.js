(function() {
  var Base, Events, Timer,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('love/base');

  Events = require('love/events');

  Timer = (function(_super) {

    __extends(Timer, _super);

    Timer.include(Events);

    define('love/timer', Timer);

    function Timer() {
      this.step = __bind(this.step, this);      this.last = this.getMicroTime();
      this.events();
    }

    Timer.prototype.request = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(cb) {
      return window.setTimeout(cb, 1000 / 60);
    }).bind(window);

    Timer.prototype.step = function() {
      this.updateDelta();
      this.trigger('step');
      return this.request(this.step);
    };

    Timer.prototype.updateDelta = function() {
      var now;
      now = this.getMicroTime();
      this.dt = now - this.last;
      return this.last = now;
    };

    Timer.prototype.getDelta = function() {
      return this.dt;
    };

    Timer.prototype.getFps = function() {
      return 1 / this.getDelta();
    };

    Timer.prototype.getMicroTime = function() {
      return +(new Date) / 1000;
    };

    return Timer;

  })(Base);

}).call(this);
