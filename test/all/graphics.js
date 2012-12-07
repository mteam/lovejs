var expect = require('expect.js'),
    love = {graphics: require('../../lib/graphics')},
    newCanvas = require('../mocks/canvas'),
    newDrawable = require('../mocks/drawable');

describe('love.graphics', function() {

  describe('#rectangle', function() {

    it('should draw a filled rectangle', function() {
      var canvas = newCanvas();

      canvas.context.fillRect.args(10, 20, 300, 400).called();

      love.graphics.use(canvas);
      love.graphics.rectangle('fill', 10, 20, 300, 400);

      canvas.context.check();
    });

    it('should draw an outlined rectangle', function() {
      var canvas = newCanvas();

      canvas.context.strokeRect.args(10, 20, 300, 400).called();

      love.graphics.use(canvas);
      love.graphics.rectangle('line', 10, 20, 300, 400);

      canvas.context.check();
    });

    it('should not accept invalid parameters', function() {
      var canvas = newCanvas();

      canvas.context.fillRect.called(0);

      love.graphics.use(canvas);

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

      love.graphics.use(canvas);
      love.graphics.clear();

      canvas.check();
    });

  });
  
  describe('#draw', function() {
    it('should draw object', function() {
      var canvas = newCanvas(),
          dr = newDrawable();
          
      love.graphics.use(canvas);
      
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
          
      love.graphics.use(canvas);
      
      dr.drawRect.args(canvas.context, rect, 10, 20).called();
      love.graphics.drawRect(dr, rect, 10, 20);
      
      dr.check();
    });
  });

});
