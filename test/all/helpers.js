var expect = require('expect.js'),
    love = { helpers: require('../../lib/helpers') };

describe('love.helpers', function() {
  it('is.number', function() {
    var isn = love.helpers.is.number;

    expect(isn(123)).to.be(true);
    expect(isn(123.45)).to.be(true);

    expect(isn(null)).to.be(false);
    expect(isn(undefined)).to.be(false);
    expect(isn(NaN)).to.be(false);
    expect(isn(Infinity)).to.be(false);
    expect(isn('foo')).to.be(false);
  });

  it('is.string', function() {
    var iss = love.helpers.is.string;

    expect(iss('foo')).to.be(true);

    expect(iss(123)).to.be(false);
    expect(iss(null)).to.be(false);
    expect(iss(undefined)).to.be(false);
  });
});
