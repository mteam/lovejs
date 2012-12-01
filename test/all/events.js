var expect = require('expect.js'),
    love = { events: require('../../lib/events') };

describe('love.events', function() {
  beforeEach(function() {
    this.obj = {};
    love.events.extend(this.obj);
  });

  function spy() {
    function fn() {
      fn.called++;
      fn.args = Array.prototype.slice.call(arguments);
    }

    fn.called = 0;
    fn.args = null;

    return fn;
  }

  describe('#on', function() {
    it('should add listeners', function() {
      function handler() {}

      this.obj.on('foo', handler);
      expect(this.obj._events.foo).to.be(handler);

      this.obj.on('foo', handler);
      expect(this.obj._events.foo).to.eql([handler, handler]);      
    });
  });

  describe('#once', function() {
    it('should trigger only once', function() {
      var handler = spy();

      this.obj.once('foo', handler);

      this.obj.trigger('foo');
      this.obj.trigger('foo');
      this.obj.trigger('foo');

      expect(handler.called).to.be(1);
    });
  });

  describe('#trigger', function() {
    it('should call one handler with 1 argument', function() {
      var handler = spy();

      this.obj.on('event', handler);
      this.obj.trigger('event', 'foo');

      expect(handler.called).to.be(1);
      expect(handler.args).to.eql(['foo']);
    });

    it('should call one handler with 3 arguments', function() {
      var handler = spy();

      this.obj.on('event', handler);
      this.obj.trigger('event', 'foo', 'bar', 'baz');

      expect(handler.called).to.be(1);
      expect(handler.args).to.eql(['foo', 'bar', 'baz']);
    });

    it('should call more handlers', function() {
      var start = Date.now();

      var handlers = [1, 2, 3, 4, 5]
        .map(function() { return spy(); });

      var obj = this.obj;

      handlers.forEach(function(handler) {
        obj.on('event', handler);
      });

      obj.trigger('event', 'foo');

      expect(handlers.every(function(handler) {
        return handler.called === 1 &&
          handler.args.length === 1 &&
          handler.args[0] === 'foo';
      })).to.be(true);
    });
  });
});