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
  
  it('.AABB should work', function() {
     var rect = love.rect.aabb(20, 30, 40, 60);
     expect(String(rect)).to.be('rect[20;30 20x30]');
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
  
  describe('#collides', function() {
    it('should return false when not colliding', function() {
      var a = love.rect(10, 10, 100, 100),
          b = love.rect(200, 300, 10, 10);
      
      expect(a.collides(b)).to.be(false);
      expect(b.collides(a)).to.be(false);
    });
    
    it('should return true when colliding', function() {
      var a = love.rect(10, 10, 100, 100),
          b = love.rect(50, 70, 100, 100);
      
      expect(a.collides(b)).to.be(true);
      expect(b.collides(a)).to.be(true);
    });
    
    it('should return true when a rect is inside another', function() {
      var a = love.rect(10, 10, 100, 100),
          b = love.rect(30, 40, 10, 10);
      
      expect(a.collides(b)).to.be(true);
      expect(b.collides(a)).to.be(true);
    });
  });
  
  describe('#includes', function() {
    it('should return false when not inside', function() {
      var rect = love.rect(10, 10, 100, 100);
      
      expect(rect.includes(0, 0)).to.be(false);
      expect(rect.includes(110.1, 110.1)).to.be(false);
    });
    
    it('should return true when inside', function() {
      var rect = love.rect(10, 10, 100, 100);
      
      expect(rect.includes(20, 20)).to.be(true);
      expect(rect.includes(10, 10)).to.be(true);
      expect(rect.includes(110, 110)).to.be(true);
    });
  });
  
  describe('#overlap', function() {
    it('should return null when not overlapping', function() {
      var a = love.rect(10, 10, 100, 100),
          b = love.rect(200, 300, 10, 10);
          
      expect(a.overlap(b)).to.be(null);
      expect(b.overlap(a)).to.be(null);
    });
    
    it('should return rect when overlapping', function() {
      var a = love.rect(10, 10, 100, 100),
          b = love.rect(50, 70, 100, 100);
      
      expect(String(a.overlap(b))).to.be('rect[50;70 60x40]');
      expect(String(b.overlap(a))).to.be('rect[50;70 60x40]');
    });
    
    it('should return rect when inside', function() {
      var a = love.rect(10, 10, 100, 100),
          b = love.rect(30, 40, 10, 10);
      
      expect(String(a.overlap(b))).to.be(String(b));
      expect(String(b.overlap(a))).to.be(String(b));
    });
  });
});
