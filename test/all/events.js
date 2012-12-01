var expect = require('expect.js'),
    sham = require('sham'),
    love = { events: require('../../lib/events') };

describe('love.events', function() {
  beforeEach(function() {
    this.obj = {};
    love.events.extend(this.obj);
  });

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
      var listener = sham.spy().called(1);

      this.obj.once('foo', listener);

      this.obj.trigger('foo');
      this.obj.trigger('foo');
      this.obj.trigger('foo');

      listener.check();
    });
  });

  describe('#trigger', function() {
    it('should call one listener with 1 argument', function() {
      var listener = sham.spy().called(1).args('foo');

      this.obj.on('event', listener);
      this.obj.trigger('event', 'foo');

      listener.check();
    });

    it('should call one listener with 3 arguments', function() {
      var listener = sham.spy().called(1).args('foo', 'bar', 'baz');

      this.obj.on('event', listener);
      this.obj.trigger('event', 'foo', 'bar', 'baz');

      listener.check();
    });

    it('should call more listeners', function() {
      var listeners = [1, 2, 3, 4, 5]
        .map(function() { return sham.spy().called().args('foo'); });

      var obj = this.obj;

      listeners.forEach(function(listener) {
        obj.on('event', listener);
      });

      obj.trigger('event', 'foo');

      listeners.forEach(function(listener) {
        listener.check();
      });
    });
  });
});