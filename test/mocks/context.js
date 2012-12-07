var sham = require('sham');

var methods = [
  'fillRect', 'strokeRect', 'clearRect',
  'drawImage'
];

module.exports = function() {
  var ctx = sham.mock();
  methods.forEach(ctx.method, ctx);
  return ctx;
};
