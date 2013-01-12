exports.is = {
  number: function(obj) {
    return (
      typeof obj == 'number' &&
      obj == obj &&
      obj != Infinity
    );
  },

  string: function(obj) {
    return typeof obj == 'string';
  },

  func: function(obj) {
    return typeof obj == 'function';
  },

  canvas: function(obj) {
    return (
      obj != null &&
      obj.nodeName == 'CANVAS'
    );
  }
};

exports.to = {
  array: function(obj) {
    return Array.prototype.slice.call(obj);
  }
};
