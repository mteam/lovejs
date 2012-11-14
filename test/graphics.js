var love = require('../');
var sham = require('sham');

describe('love.graphics', function () {

  describe('setCanvas', function () {

    it('should change canvas', function () {
      var canvas = {};
      love.graphics.setCanvas(canvas);
      love.graphics.getCanvas().should.equal(canvas);
    });

  });

  describe('rectangle', function () {

    it('should draw a filled rectangle', function () {
      var canvas = sham.create();
      canvas.method('fillRect').args(10, 20, 300, 400).called();

      love.graphics.setCanvas(canvas);
      love.graphics.rectangle('fill', 10, 20, 300, 400);

      canvas.check();
    });

    it('should draw an outlined rectangle', function () {
      var canvas = sham.create();
      canvas.method('strokeRect').args(10, 20, 300, 400).called();

      love.graphics.setCanvas(canvas);
      love.graphics.rectangle('line', 10, 20, 300, 400);

      canvas.check();
    });

    it('should not accept invalid parameters', function () {
      var canvas = sham.create();
      canvas.method('fillRect').called();
      love.graphics.setCanvas(canvas);

      (function () {
        love.graphics.rectangle('foo', 10, 20, 300, 400);
      }).should.throw(/invalid mode/);

      (function () {
        love.graphics.rectangle('fill', 10 / 0, 20, 300, 400);
      }).should.throw(/invalid position/);

      (function () {
        love.graphics.rectangle('fill', 10, 20, 300 / 0, 400);
      }).should.throw(/invalid dimensions/);
    });

  });

  describe('clear', function () {

    it('should clear canvas', function () {
      var canvas = sham.create();
      canvas.method('getWidth').return(100);
      canvas.method('getHeight').return(200);
      canvas.method('clearRect').args(0, 0, 100, 200).called();

      love.graphics.setCanvas(canvas);
      love.graphics.clear();

      canvas.check();
    });

  });

});
