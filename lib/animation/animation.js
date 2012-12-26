var klass = require('../class');

module.exports = klass({

  constructor: function Animation(reel, sequence) {
    if (!(this instanceof Animation))
      return new Animation(reel, sequence);
    
    this.reel = reel;
    this.sequence = sequence;
    this.active = 0;

    for (var i = 0; i < sequence.length; i++) {
      if (sequence[i] >= reel.frames.length) {
        throw new Error('invalid frame: ' + sequence[i]);
      }
    }
  },

  current: function() {
    return this.sequence[this.active];
  },

  next: function() {
    if (++this.active == this.sequence.length) {
      this.rewind();
    }
  },

  rewind: function() {
    this.active = 0;
  }, 

  draw: function(ctx, x, y) {
    var image = this.reel.image,
        rect = this.reel.frames[this.current()];

    image.drawRect(ctx, rect, x, y);
  }

});
