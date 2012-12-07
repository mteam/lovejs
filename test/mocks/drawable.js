var sham = require('sham');

var methods = [
  'draw', 'drawRect'
];

module.exports = function() {
  var drawable = sham.mock();
  methods.forEach(drawable.method, drawable);
  return drawable;
};
