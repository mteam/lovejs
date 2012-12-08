exports.is = {
  number: function(obj) {
    return (
      typeof obj == 'number' &&
      obj == obj &&
      obj != Infinity
    );
  }
};
