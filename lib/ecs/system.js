var klass = require('../class'),
    to = require('../helpers').to,
    Component = require('../cm/component');

var System = klass(Component, {

  constructor: function System() {
    if (this.name == null) {
      throw new Error('System name has not been specified');
    }

    Component.call(this, this.name);
  },

  attach: function(parent) {
    Component.prototype.attach.call(this, parent);
    this.initialize && this.initialize();
  },

  find: function() {
    return this.getParent().createFinder(to.array(arguments));
  },

  getSystem: function(name) {
    return this.getParent().getSystem(name);
  }

});

module.exports = function(prototype) {
  return klass(System, prototype);
};
