var klass = require('../class'),
    Component = require('../cm/component');

var System = klass(Component, {

  constructor: function System(manager) {
    Component.call(this);

    this.manager = manager;
    this.initialize && this.initialize();
  },

  find: function() {
    return this.manager.entities.apply(this.manager, arguments);
  },

  system: function(name) {
    return this.manager.system(name);
  }

});

module.exports = function(prototype) {
  return klass(System, prototype);
};
