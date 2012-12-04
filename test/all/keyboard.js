var expect = require('expect.js'),
    sham = require('sham'),
    love = { keyboard: require('../../lib/keyboard') };

describe('love.keyboard', function() {
  beforeEach(love.keyboard.init);

  var events = {
    p: { keyCode: 80 },
    7: { keyCode: 55 },
    kp6: { keyCode: 102 },
    f7: { keyCode: 118 },
    down: { keyCode: 40 },
    esc: { keyCode: 27 }
  };

  it('should trigger events', function() {
    var pressed = sham.spy().called(),
        released = sham.spy().called();

    love.keyboard.on('pressed', pressed);
    love.keyboard.on('released', released);

    love.keyboard.down(events.p);
    love.keyboard.up(events.p);

    pressed.check();
    released.check();
  });

  it('should give correct key name', function() {
    var pressed = sham.spy();
    love.keyboard.on('pressed', pressed);

    for (var name in events) {
      pressed.args(name);
      love.keyboard.down(events[name]);
    }
  });

  it('should remember whether key is pressed', function() {
    expect(love.keyboard.isDown('p')).to.be(false);
    love.keyboard.down(events.p);
    expect(love.keyboard.isDown('p')).to.be(true);
    love.keyboard.up(events.p);
    expect(love.keyboard.isDown('p')).to.be(false);
  });
});
