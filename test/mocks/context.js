var sham = require('sham');

var methods = [
  'fillRect', 'strokeRect', 'clearRect'
];

module.exports = function() {
  var ctx = sham.mock();
  methods.forEach(ctx.method, ctx);
  return ctx;
};
