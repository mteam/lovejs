var klass = require('../class');

module.exports = klass({

  constructor: function Finder(container, components) {
    this.container = container; // entity container
    this.components = components;
    this.entities = null;
  },

  all: function() {
    if (this.entites == null) {
      this.entities =
        this.container.components.filter(this.isDesired, this);
    }

    return this.entities;
  },

  isDesired: function(entity) {
    return this.components.every(entity.has, entity);
  },

  each: function(fn, context) {
    var es = this.all();

    for (var i = 0; i < es.length; i++) {
      fn.call(context, es[i]);
    }

    return this;
  },

  single: function() {
    var es = this.all();

    if (es.length != 1)
      throw new Error('expected just one entity, got ' + es.length + ' instead');

    return es[0];
  }

});
