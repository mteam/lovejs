(function() {
  var map;

  map = {};

  this.define = function(name, value) {
    return map[name] = value;
  };

  this.require = function(name) {
    return map[name];
  };

}).call(this);
