var klass = require('../class');

module.exports = klass({

  constructor: function Component(name) {
    if (!(this instanceof Component))
      return new Component(name);
    
    this.name = name;
  },

  attach: function(parent) {
    this.parent = parent;
  },

  getParent: function() {
    if (this.parent == null) {
      throw new Error('Parent requested, but component was not attached to any');
    }

    return this.parent;
  }

});
