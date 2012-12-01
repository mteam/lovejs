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
      function listener() {}

      this.obj.on('foo', listener);
      expect(this.obj._events.foo).to.be(listener);

      this.obj.on('foo', listener);
      expect(this.obj._events.foo).to.eql([listener, listener]);      
    });
  });

  describe('#once', function() {
    it('should trigger only once', function() {
      var listener = spy();

      this.obj.once('foo', listener);

      this.obj.trigger('foo');
      this.obj.trigger('foo');
      this.obj.trigger('foo');

      expect(listener.called).to.be(1);
    });
  });

  describe('#trigger', function() {
    it('should call one listener with 1 argument', function() {
      var listener = spy();

      this.obj.on('event', listener);
      this.obj.trigger('event', 'foo');

      expect(listener.called).to.be(1);
      expect(listener.args).to.eql(['foo']);
    });

    it('should call one listener with 3 arguments', function() {
      var listener = spy();

      this.obj.on('event', listener);
      this.obj.trigger('event', 'foo', 'bar', 'baz');

      expect(listener.called).to.be(1);
      expect(listener.args).to.eql(['foo', 'bar', 'baz']);
    });

    it('should call more listeners', function() {
      var start = Date.now();

      var listeners = [1, 2, 3, 4, 5]
        .map(function() { return spy(); });

      var obj = this.obj;

      listeners.forEach(function(listener) {
        obj.on('event', listener);
      });

      obj.trigger('event', 'foo');

      expect(listeners.every(function(listener) {
        return listener.called === 1 &&
          listener.args.length === 1 &&
          listener.args[0] === 'foo';
      })).to.be(true);
    });
  });
});