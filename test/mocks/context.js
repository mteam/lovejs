var sham = require('sham');

var methods = [
  'fillRect', 'strokeRect', 'clearRect',
  'moveTo', 'lineTo', 'stroke',
  'drawImage'
];

module.exports = function() {
  var ctx = sham.mock();
  methods.forEach(ctx.method, ctx);
  return ctx;
};
