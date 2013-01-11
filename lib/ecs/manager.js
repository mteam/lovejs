var klass = require('../class'),
    is = require('../helpers').is,
    Container = require('../cm/container'),
    Finder = require('./finder');

module.exports = klass(Container, {

  constructor: function SystemManager(entities) {
    Container.call(this);

    if (entities instanceof Container) {
      this.entities = entities;
    } else {
      throw new Error('Entities are not a container');
    }
  }

  add: function(system) {
    if (is.function(system)) {
      system = new system(this);
    }

    Container.prototype.add.call(this, system);
  },

  system: function(name) {
    return this.find(name);
  },

  entities: function() {
    var components = Array.prototype.slice.call(arguments);
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
