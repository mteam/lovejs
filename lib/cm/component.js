var klass = require('../class');

module.exports = klass({

  constructor: function Component(name, parent) {
    this.name = name;
    this.attach(parent);
  },

  attach: function(parent) {
    this.parent = parent;
  }

});
