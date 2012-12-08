var graphics = require('./index'),
    is = require('../helpers').is;

// --- factories ---

Canvas.id = function(id) {
  if (is.string(id)) {
    var result = /^#?(.+)$/.exec(id),
        el = document.getElementById(result[1]);

    return Canvas.element(el);
  } else {
    return null;
  }
};

Canvas.dimensions = function(width, height) {
  if (is.number(width) && is.number(height)) {
    var el = document.createElement('canvas');

    el.width = width;
    el.height = height;

    return new Canvas(el);
  } else {
    return null;
  }
};

Canvas.element = function(el) {
  if (is.canvas(el)) {
    return new Canvas(el);
  } else {
    return null;
  }
};

Canvas.clone = function(canvas) {
  if (canvas instanceof Canvas) {
    return Canvas.dimensions(canvas.getWidth(), canvas.getHeight());
  } else {
    return null;
  }
};

// --- implementation ---

function Canvas(element) {
  this.element = element;
  this.context = element.getContext('2d');
}

Canvas.prototype.getWidth = function() {
  return this.element.width;
};

Canvas.prototype.getHeight = function() {
  return this.element.height;
};

Canvas.prototype.use = function(fn) {
  graphics.setCanvas(this);

  fn();
  
  graphics.setCanvas();
};

// --- drawing ---

Canvas.prototype.draw = function(ctx, x, y) {
  ctx.drawImage(this.element, x, y);
};

Canvas.prototype.drawRect = function(ctx, rect, x, y) {
  ctx.drawImage(
    this.element,
    rect.left, rect.top, rect.width, rect.height,
    x, y, rect.width, rect.height
  );
};

module.exports = Canvas;
