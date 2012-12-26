var klass = require('../class'),
    Animation = require('./animation');

module.exports = klass(Animation, {

  constructor: function NonLinearAnimation(reel, pairs) {
    if (!(this instanceof NonLinearAnimation))
      return new NonLinearAnimation(reel, pairs);

    var sequence = pairs.map(function(pair) { return pair[0] }),
        intervals = pairs.map(function(pair) { return pair[1] });

    Animation.call(this, reel, sequence);

    this.intervals = intervals;
    this.timer = 0;
  },

  interval: function() {
    return this.intervals[this.active];
  },

  update: function(dt) {
    this.timer += dt;

    while (this.timer >= this.interval()) {
      this.timer -= this.interval();
      this.next();
    }
  }

});
