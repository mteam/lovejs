var expect = require('expect.js'),
    love = { helpers: require('../../lib/helpers') };

describe('love.helpers', function() {
  it('is.canvas', function() {
    var isc = love.helpers.is.canvas;

    var canvas = document.createElement('canvas'),
        div = document.createElement('div');

    expect(isc(canvas)).to.be(true);

    expect(isc(div)).to.be(false);
    expect(isc('[object HTMLCanvasElement]')).to.be(false);
    expect(isc(null)).to.be(false);
  });
});
