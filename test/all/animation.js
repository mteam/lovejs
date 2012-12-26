var expect = require('expect.js'),
    sham = require('sham'),
    animation = require('../../lib/animation'),
    rect = require('../../lib/rect');

describe('love.animation', function() {
  var image = { width: 320, height: 240 };

  describe('reel', function() {

    it('should create frames', function() {
      var reel = animation.reel(image, 80, 40);

      expect(reel.frames).to.have.length(24);
    });

    it('should create rects', function() {
      var reel = animation.reel(image, 80, 40);

      reel.frames.forEach(function(frame) {
        expect(frame).to.be.a(rect);
      });

      expect(String(reel.frames[6])).to.be('rect[160;40 80x40]');
    });

  });

  describe('basic', function() {

    var reel = animation.reel(image, 80, 40);

    it('should switch frames', function() {
      var a = animation.basic(reel, [1, 9, 7]);

      [1, 9, 7, 1, 9].forEach(function(i) {
        expect(a.current()).to.be(i);
        a.next();
      });
    });

    it('should throw when sequence is invalid', function() {
      expect(function() {
        animation.basic(reel, [1, 34]);
      }).to.throwError(/invalid frame: 34/);
    });

    it('should draw current frame', function() {
      var a = animation.basic(reel, [6]);

      var ctx = {},
          rect = reel.frames[6];

      image.drawRect = sham
        .spy()
        .args(ctx, rect, 10, 20)
        .called();

      a.draw(ctx, 10, 20);

      image.drawRect.check();
    });

  });

  describe('linear', function() {

    var reel = animation.reel(image, 80, 40);

    it('should work', function() {
      var a = animation.linear(reel, [1, 3, 9], 0.3);

      expect(a.current()).to.be(1);

      a.update(0.2);
      expect(a.current()).to.be(1);

      a.update(0.4);
      expect(a.current()).to.be(9);

      a.update(0.7);
      expect(a.current()).to.be(3);
    });

  });

  describe('non-linear', function() {

    var reel = animation.reel(image, 80, 40);

    it('should work', function() {
      var a = animation.nonlinear(reel, [[2, 0.2], [4, 0.4], [6, 0.6]]);

      expect(a.current()).to.be(2);
      
      a.update(0.1);
      expect(a.current()).to.be(2);
      
      a.update(0.1);
      expect(a.current()).to.be(4);
      
      a.update(0.5);
      expect(a.current()).to.be(6);
      
      a.update(0.8);
      expect(a.current()).to.be(4);
    });

  });
});
