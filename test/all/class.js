var expect = require('expect.js'),
    klass = require('../../lib/class');

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

    var Foo = klass({

      constructor: function Foo() {
        this.msg = 'ho ho ho';
      },

      say: function() {
        return '"' + this.msg + '"';
      }

    });

    var Bar = klass(Foo, {

      shout: function() {
        return this.say().toUpperCase();
      }

    });

    var a = new Bar;

    expect(a.shout()).to.be('"HO HO HO"');

  });

  it('should work without constructor', function() {

    var Foo = klass({

      double: function(n) {
        return n * 2;
      }

    });

    var a = new Foo;

    expect(a.double(2)).to.be(4);

  });

  it('should call parent constructor', function() {

    var Foo = klass({

      constructor: function(name) {
        this.name = name;
      }

    });

    var Bar = klass(Foo, {

      say: function(msg) {
        return this.name + ': ' + msg;
      }

    });

    var a = new Bar('john');

    expect(a.say('hi')).to.be('john: hi');

  });

});
