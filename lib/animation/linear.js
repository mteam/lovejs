var klass = require('../class'),
    Animation = require('./animation');

module.exports = klass(Animation, {

  constructor: function LinearAnimation(reel, sequence, interval) {
    if (!(this instanceof LinearAnimation))
      return new LinearAnimation(reel, sequence, interval);

    Animation.call(this, reel, sequence);

    this.interval = interval;
    this.timer = 0;
  },

  update: function(dt) {
    this.timer += dt;

    while (this.timer >= this.interval) {
      this.timer -= this.interval;
      this.next();
    }
  }

});
