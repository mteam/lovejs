module.exports = function() {

  var proto = arguments[1] || arguments[0],
      parent = arguments[1] && arguments[0];

  var klass = proto.constructor || function() {};

  if (parent != null) {
    klass.prototype = Object.create(parent.prototype);
  }

  for (var key in proto) {
    klass.prototype[key] = proto[key];
  }

  klass.prototype.constructor = klass;

  return klass;

};
