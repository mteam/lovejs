var expect = require('expect.js'),
    sham = require('sham'),
    love = { mouse: require('../../lib/mouse') };

describe('love.mouse', function() {
  beforeEach(love.mouse.init);

  var events = {
    left: { button: 1 },
    middle: { button: 2 },
    right: { button: 3 },

    wheelUp: { wheelDelta: 120 },
    wheelDown: { wheelDelta: -120 },

    scrollUp: { detail: -3 },
    scrollDown: { detail: 3 }
  };

  it('should trigger events', function() {
    var pressed = sham.spy().called(),
        released = sham.spy().called();

    love.mouse.on('pressed', pressed);
    love.mouse.on('released', released);

    love.mouse.down(events.left);
    love.mouse.up(events.left);

    pressed.check();
    released.check();
  });

  it('should give correct button name', function() {
    var pressed = sham.spy();
    love.mouse.on('pressed', pressed);

    ['left', 'middle', 'right'].forEach(function(button) {
      pressed.args(button);
      love.mouse.down(events[button]);
    });

    pressed.args('up');
    love.mouse.wheel(events.wheelUp);
    love.mouse.scroll(events.scrollUp);

    pressed.args('down');
    love.mouse.wheel(events.wheelDown);
    love.mouse.scroll(events.scrollDown);
  });

  it('should remember whether key is pressed', function() {
    expect(love.mouse.isDown('right')).to.be(false);

    love.mouse.down(events.right);
    expect(love.mouse.isDown('right')).to.be(true);

    love.mouse.up(events.right);
    expect(love.mouse.isDown('right')).to.be(false);
  });
});
