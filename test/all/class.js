var expect = require('expect.js'),
    klass = require('../../lib/class.js');

describe('love.class', function() {

  it('should create class with constructor', function() {

    var Santa = klass({

      constructor: function SantaClass(msg) {
        this.msg = msg;
      },

      say: function() {
        return 'Santa says: ' + this.msg;
      }

    });

    expect(Santa.name).to.be('SantaClass');

    var i = new Santa('ho ho ho');

    expect(i.say()).to.be('Santa says: ho ho ho');
    expect(i.constructor).to.be(Santa);

  });

  it('should do inheritance', function() {

    var Parent = klass({

      constructor: function Parent() {
        this.value = null;
      },

      set: function(value) {
        this.value = value;
      },

      get: function() {
        return this.value;
      }

    });

    var Child = klass(Parent, {

      constructor: function Child() {
        Parent.call(this);

        this.set('ho ho ho');
      },

      say: function() {
        return '"' + this.get() + '"';
      }

    });

    var i = new Child;

    expect(i.say()).to.be('"ho ho ho"');

  });

});
