var klass = require('../class'),
    cm = require('../cm');
    is = require('../helpers').is;

var Entity = klass(cm.container, {

  constructor: function Entity(name) {
    cm.container.call(this, name);
  }

});

module.exports = function() {
  var name, i;

  if (is.string(arguments[0])) {
    name = arguments[0];
    i = 1;
  } else {
    i = 0;
  }

  var entity = new Entity(name);

  while (i < arguments.length) {
    if (is.function(arguments[i]) {
      entity.add(new arguments[i]);
    } else {
      entity.add(arguments[i]);
    }

    i++;
  }

  return entity;
};
