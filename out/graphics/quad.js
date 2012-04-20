(function() {
  var Quad;

  Quad = (function() {

    Quad.define('love/graphics/canvas/quad');

    function Quad(x, y, width, height) {
      this.setViewport(x, y, width, height);
    }

    Quad.prototype.setViewport = function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    };

    Quad.prototype.getViewport = function() {
      return [this.x, this.y, this.width, this.height];
    };

    Quad.prototype.flip = function(x, y) {
      if ((x && this.width > 0) || (!x && this.width < 0)) {
        this.width = -this.width;
      }
      if ((y && this.height > 0) || (!y && this.height < 0)) {
        return this.height = -this.height;
      }
    };

    return Quad;

  })();

}).call(this);
