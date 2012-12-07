var expect = require('expect.js');
    vec = require('../../lib/vector');

describe('love.vector', function() {
  it('should create instances', function() {
    var v1 = vec(3.5, 2.32),
        v2 = vec(0, 8);

    expect(String(v1)).to.be('(3.5;2.32)');
    expect(String(v2)).to.be('(0;8)');
  });

  it('should do arithmetics', function() {
    var v = vec(10, 4);

    v
      .nadd(2, 6)
      .nsubtract(3.5, 0.5)
      .multiply(2)
      .divide(0.25);

    expect(String(v)).to.be('(68;76)');
  });

  it('should do arithmetics with vectors', function() {
    var v = vec(1, 2);

    v
      .vadd(vec(7, 2))
      .vsubtract(vec(3, 4));

    expect(String(v)).to.be('(5;0)');
  });

  it('should calculate length', function() {
    expect(vec(3, 4).length()).to.be(5);
  });
});
