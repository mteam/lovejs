module.exports = function() {

  var proto = arguments[1] || arguments[0],
      parent = arguments[1] && arguments[0];

  var ctor =
    proto.hasOwnProperty('constructor') && proto.constructor ||
    parent && function() { parent.apply(this, arguments); } ||
    function() {};

  if (parent != null) {
    ctor.prototype = Object.create(parent.prototype);
  }

  for (var key in proto) {
    ctor.prototype[key] = proto[key];
  }

  ctor.prototype.constructor = ctor;

  return ctor;

};
