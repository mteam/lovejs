var klass = require('../class'),
    is = require('../helpers').is,
    Container = require('../cm/container'),
    Finder = require('./finder');

module.exports = klass(Container, {

  constructor: function SystemManager(entities) {
    if (!(this instanceof SystemManager))
      return new SystemManager(entities);

    Container.call(this);

    if (!(entities instanceof Container)) {
      throw new Error('Entities are not a container');
    }

    this.entities = entities;
  },

  add: function(system) {
    if (is.func(system)) {
      system = new system;
    }

    Container.prototype.add.call(this, system);
  },

  getSystem: function(name) {
    return this.get(name);
  },

  createFinder: function(components) {
    return new Finder(this.entities, components);
  },

  update: function(dt) {
    for (var i = 0, c; i < this.components.length; i++) {
      c = this.components[i];
      c.update && c.update(dt);
    }
  },

  draw: function() {
    for (var i = 0, c; i < this.components.length; i++) {
      c = this.components[i];
      c.draw && c.draw();
    }
  }

});
