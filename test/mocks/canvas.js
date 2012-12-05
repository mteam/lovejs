var sham = require('sham'),
    context = require('./context');

var methods = [
  'getWidth', 'getHeight'
];

module.exports = function() {
  var canvas = sham.mock();

  canvas.context = context();
  methods.forEach(canvas.method, canvas);

  return canvas;
};
