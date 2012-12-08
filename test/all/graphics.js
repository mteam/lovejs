var expect = require('expect.js'),
    sham = require('sham'),
    love = {graphics: require('../../lib/graphics')},
    newCanvas = require('../mocks/canvas'),
    newDrawable = require('../mocks/drawable');

describe('love.graphics', function() {

  describe('#rectangle', function() {

    it('should draw a filled rectangle', function() {
      var canvas = newCanvas();

      canvas.context.fillRect.args(10, 20, 300, 400).called();

      love.graphics.setCanvas(canvas);
      love.graphics.rectangle('fill', 10, 20, 300, 400);

      canvas.context.check();
    });

    it('should draw an outlined rectangle', function() {
      var canvas = newCanvas();

      canvas.context.strokeRect.args(10, 20, 300, 400).called();

      love.graphics.setCanvas(canvas);
      love.graphics.rectangle('stroke', 10, 20, 300, 400);

      canvas.context.check();
    });

    it('should not accept invalid parameters', function() {
      var canvas = newCanvas();

      canvas.context.fillRect.called(0);

      love.graphics.setCanvas(canvas);

      expect(function() {
        love.graphics.rectangle('foo', 10, 20, 300, 400);
      }).to.throwError(/invalid mode/);

      expect(function() {
        love.graphics.rectangle('fill', 10 / 0, 20, 300, 400);
      }).to.throwError(/invalid position/);

      expect(function() {
        love.graphics.rectangle('fill', 10, 20, 300 / 0, 400);
      }).to.throwError(/invalid dimensions/);

      canvas.context.check();
    });

  });

  describe('#clear', function() {

    it('should clear canvas', function() {
      var canvas = newCanvas();

      canvas.getWidth.return(100);
      canvas.getHeight.return(200);
      canvas.context.clearRect.args(0, 0, 100, 200).called();

      love.graphics.setCanvas(canvas);
      love.graphics.clear();

      canvas.check();
    });

  });

  describe('#line', function() {
    it('should draw a line', function() {
      var canvas = newCanvas();

      canvas.context.moveTo.args(10, 20);
      canvas.context.lineTo
        .args(20, 30)
        .args(30, 40)
        .args(40, 50)
        .called(3);
      canvas.context.stroke.called();

      love.graphics.setCanvas(canvas);
      love.graphics.line(10, 20, 20, 30, 30, 40, 40, 50);

      canvas.context.check();
    });
  });
  
  describe('#draw', function() {
    it('should draw object', function() {
      var canvas = newCanvas(),
          dr = newDrawable();
          
      love.graphics.setCanvas(canvas);
      
      dr.draw.args(canvas.context, 10, 20).called();
      love.graphics.draw(dr, 10, 20);
      
      dr.check();
    });
  });
  
  describe('#drawRect', function() {
    it('should draw object', function() {
      var canvas = newCanvas(),
          dr = newDrawable(),
          rect = {};
          
      love.graphics.setCanvas(canvas);
      
      dr.drawRect.args(canvas.context, rect, 10, 20).called();
      love.graphics.drawRect(dr, rect, 10, 20);
      
      dr.check();
    });
  });

  describe('Image', function() {

    it('should create instance from asset', function() {
      var asset = sham.mock(),
          source = {};

      asset.method('getContent').return(source);

      var image = love.graphics.newImage(asset);

      expect(image.source).to.be(source);
    });

    it('should draw', function() {
      var source = {},
          image = love.graphics.newImage(source),
          canvas = newCanvas();

      canvas.context.drawImage.args(source, 10, 20).called();

      love.graphics.setCanvas(canvas);
      love.graphics.draw(image, 10, 20);

      canvas.context.check();
    });

    it('should draw rect', function() {
      var source = {},
          image = love.graphics.newImage(source),
          rect = { left: 10, top: 20, width: 30, height: 40 },
          canvas = newCanvas();

      canvas.context.drawImage.args(source, 10, 20, 30, 40, 50, 60, 30, 40).called();

      love.graphics.setCanvas(canvas);
      love.graphics.drawRect(image, rect, 50, 60);

      canvas.context.check();
    });

  });

});
