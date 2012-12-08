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

  canvas: function(obj) {
    return (
      obj != null &&
      obj.nodeName == 'CANVAS'
    );
  }
};
