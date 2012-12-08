var expect = require('expect.js'),
    love = { graphics: require('../../lib/graphics') },
    newContext = require('../mocks/context');

describe('love.graphics', function() {

  describe('Canvas', function() {

    before(function() {
      var screen = love.graphics.newCanvas(400, 300);
      love.graphics.setScreen(screen);
    });

    it('should create instance from id', function() {
      var el, canvas;

      el = document.createElement('canvas');
      el.id = 'foo-canvas';

      document.body.appendChild(el);

      canvas = love.graphics.newCanvas('#foo-canvas');
      expect(canvas).to.be.ok();
      expect(canvas.element).to.be(el);

      document.body.removeChild(el);
    });

    it('should create instance from dimensions', function() {
      var canvas = love.graphics.newCanvas(400, 300);

      expect(canvas).to.be.ok();
      expect(canvas.element.width).to.be(400);
      expect(canvas.element.height).to.be(300);
    });

    it('should create instance from element', function() {
      expect(function() {  
        var el = document.createElement('div'),
            canvas = love.graphics.newCanvas(el);
      }).to.throwError(/invalid arguments/);

      expect(function() {
        var el = document.createElement('canvas'),
            canvas = love.graphics.newCanvas(el);
      }).to.not.throwError();
    });

    it('should create instance identical to screen', function() {
      var canvas = love.graphics.newCanvas();
      expect(canvas.getWidth()).to.be(400);
      expect(canvas.getHeight()).to.be(300);
    });

    it('should return width and height', function() {
      var canvas = love.graphics.newCanvas(400, 300);

      expect(canvas.getWidth()).to.be(400);
      expect(canvas.getHeight()).to.be(300);
    });

    it('should be able to switch to itself', function() {
      var canvas = love.graphics.newCanvas();

      canvas.use(function() {
        expect(love.graphics.getCanvas()).to.be(canvas);
      });

      expect(love.graphics.getCanvas()).to.not.be(canvas);
    });

    it('should be able to draw itself', function() {
      var canvas = love.graphics.newCanvas(),
          context = newContext();

      context.drawImage
        .args(canvas.element)
        .called(2);

      canvas.draw(context, 10, 20);
      canvas.draw(context, {}, 10, 20);

      context.check();
    });

  });

});
