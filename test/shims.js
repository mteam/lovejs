var Object_create = require('../lib/shims/object_create');

describe('love.shims', function() {
  describe('Object.create', function() {
    it('should set object\'s prototype', function() {
      var obj1 = {foo: 'bar'};
      var obj2 = Object_create(obj1);

      obj2.should.have.property('foo', 'bar');

      obj2.foo = 'baz';
      obj1.should.have.property('foo', 'bar');
      obj2.should.have.property('foo', 'baz');
    });
  });
});
