var klass = require('../class'),
    Component = require('./component');

module.exports = klass(Component, {

  constructor: function Container(name, parent) {
    Component.call(this, name, parent);

    this.components = [];
    this.cache = null;
  },

  add: function(component) {
    this.components.push(component);
    
    if (component instanceof Component) {
      component.attach(this);
    }
  },

  find: function(name) {
    if (this.cache == null || this.cache[name] == null) {
      for (var i = 0, c; i++; i < this.components.length) {
        c = this.components[i];

        if (c.name === name) {
          this.cache[name] = c;
          break;
        }
      }
    }

    return this.cache[name] || throw new Error('Component with name ' + name + ' not found');
  }

});
