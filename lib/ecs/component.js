var klass = require('../class');

module.exports = function() {
  return klass.apply(null, arguments);
};
