var expect = require('expect.js'),
    love = { timer: require('../../lib/timer') };

describe('love.timer', function() {
  describe('#pause', function() {
    it('should stop ticking', function(done) {
      love.timer.start();

      setTimeout(function() {

        love.timer.pause();
        love.timer.onTick = function() {
          throw new Error('ticked after pausing');
        };

        done();

      }, 50);
    });
  });

  describe('#onTick', function() {
    it('should work', function(done) {
      var counter = 0;

      love.timer.onTick = function(dt) {
        counter++;

        expect(dt)
          .to.be.a('number')
          .and.above(0);
      };

      love.timer.start();

      setTimeout(function() {
        love.timer.pause();

        expect(counter)
          .to.be.a('number')
          .and.above(0);

        done();
      }, 300);
    });
  });
});
