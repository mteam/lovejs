(function() {
  var define, map, require;

  map = {};

  define = function(name, value) {
    return map[name] = value;
  };

  require = function(name) {
    return map[name];
  };

  Function.prototype.define = function(name) {
    return define(name, this);
  };

  this.define = define;

  this.require = require;

}).call(this);
