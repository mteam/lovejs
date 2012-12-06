var expect = require('expect.js'),
    love = { rect: require('../../lib/rect') };

describe('love.rect', function() {
  it('should create instances', function() {
    var rect;

    rect = love.rect(10, 10, 100, 100);
    expect(String(rect)).to.be('rect[10;10 100x100]');

    rect = new love.rect(20, 20, 50, 50);
    expect(String(rect)).to.be('rect[20;20 50x50]');
  });

  it('should calculate corner coordinates', function() {
    var rect = love.rect(40, 80, 100, 200);
    expect(rect.left).to.be(40);
    expect(rect.top).to.be(80);
    expect(rect.right).to.be(140);
    expect(rect.bottom).to.be(280);
  });

  it('#move should move it', function() {
    var rect = love.rect(20, 30, 400, 500);
    rect.move(60, 70);
    expect(String(rect)).to.be('rect[80;100 400x500]');
  });

  it('#position should change position', function() {
    var rect = love.rect(20, 30, 400, 500);
    rect.position(60, 70);
    expect(String(rect)).to.be('rect[60;70 400x500]');
  });

  it('#dimensions should change dimensions', function() {
    var rect = love.rect(20, 30, 400, 500);
    rect.dimensions(600, 700);
    expect(String(rect)).to.be('rect[20;30 600x700]');
    expect(rect.right).to.be(620);
    expect(rect.bottom).to.be(730);
  });
});
