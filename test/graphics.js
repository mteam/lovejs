var love = require('../');
var sham = require('sham');

describe('love.graphics', function () {

  describe('setCanvas', function () {

    it('should change canvas', function () {
      var canvas = {};
      love.graphics.setCanvas(canvas);
      assert.equal(love.graphics.getCanvas(), canvas);
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

  });

});
