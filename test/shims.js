var expect = require('expect.js');
    Object_create = require('../lib/shims/object_create');

describe('love.shims', function() {
  describe('Object.create', function() {
    it('should set object\'s prototype', function() {
      var obj1 = {foo: 'bar'};
      var obj2 = Object_create(obj1);

      expect(obj2).to.have.property('foo', 'bar');

      obj2.foo = 'baz';
      expect(obj1).to.have.property('foo', 'bar');
      expect(obj2).to.have.property('foo', 'baz');
    });
  });
});
