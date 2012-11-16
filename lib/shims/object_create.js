function create(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F();
}

if (Object.create == null) {
  Object.create = create;
}

module.exports = create;
