(function() {
  var Love,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Love = (function() {

    Love.define('love');

    function Love() {
      this.step = __bind(this.step, this);      this.modules = {
        timer: require('love/timer'),
        graphics: require('love/graphics'),
        keyboard: require('love/keyboard'),
        mouse: require('love/mouse'),
        assets: require('love/assets'),
        filesystem: require('love/filesystem/localStorage')
      };
    }

    Love.prototype.run = function() {
      var _this = this;
      if (typeof this.load === "function") this.load();
      if (this.assets.loaded()) {
        return this.timer.step();
      } else {
        return this.assets.on('load', function() {
          return _this.timer.step();
        });
      }
    };

    Love.prototype.init = function(config) {
      var module, name, _ref;
      _ref = this.modules;
      for (name in _ref) {
        module = _ref[name];
        if (module) this[name] = new module(config);
      }
      this.timer.on('step', this.step);
      if (this.keyboard != null) {
        if (this.keyDown != null) {
          this.keyboard.on('keyDown', this.keyDown.bind(this));
        }
        if (this.keyUp != null) this.keyboard.on('keyUp', this.keyUp.bind(this));
      }
      if (this.mouse != null) {
        if (this.mouseDown != null) {
          this.mouse.on('mouseDown', this.mouseDown.bind(this));
        }
        if (this.mouseUp != null) {
          return this.mouse.on('mouseUp', this.mouseUp.bind(this));
        }
      }
    };

    Love.prototype.step = function() {
      if (typeof this.update === "function") this.update(this.timer.getDelta());
      this.graphics.clear();
      this.graphics.push();
      if (typeof this.draw === "function") this.draw();
      return this.graphics.pop();
    };

    return Love;

  })();

  this.love = new Love;

}).call(this);
