(function() {
  var Base,
    __hasProp = Object.prototype.hasOwnProperty,
    __slice = Array.prototype.slice;

  Base = (function() {

    function Base() {}

    define('love/base', Base);

    Base.include = function(object) {
      var key, value;
      for (key in object) {
        if (!__hasProp.call(object, key)) continue;
        value = object[key];
        this.prototype[key] = value;
      }
    };

    return Base;

  })();

  define('love/events', {
    events: function() {
      return this._events = {};
    },
    on: function(event, callback) {
      var _base;
      if ((_base = this._events)[event] == null) _base[event] = [];
      this._events[event].push(callback);
      return this;
    },
    trigger: function() {
      var args, callback, event, _i, _len, _ref;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (!this._events[event]) return;
      _ref = this._events[event];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        callback.apply(null, args);
      }
      return this;
    }
  });

}).call(this);
