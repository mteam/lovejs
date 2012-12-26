var klass = require('../class'),
    rect = require('../rect');

module.exports = klass({

  constructor: function Reel(image, width, height) {
    if (!(this instanceof Reel))
      return new Reel(image, width, height);

    this.image = image;
    this.setup(width, height);
  },

  setup: function(width, height) {
    var cols = this.image.width / width,
        rows = this.image.height / height;

    this.frames = [];

    var x, y;

    for (y = 0; y < rows; y++) {
      for (x = 0; x < cols; x++) {

        this.frames.push(rect(
          x * width, y * height,
          width, height
        ));

      }
    }
  }

});
