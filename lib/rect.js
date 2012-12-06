function Rect(left, top, width, height) {
  if (!(this instanceof Rect)) {
    return new Rect(left, top, width, height);
  }

  this.left = left;
  this.top = top;
  this.width = width;
  this.height = height;

  this.update();
}

Rect.prototype.toString = function() {
  return 'rect[' +
    this.left + ';' + this.top + ' ' +
    this.width + 'x' + this.height + ']';
};

Rect.prototype.update = function() {
  this.right = this.left + this.width;
  this.bottom = this.top + this.height;
};

Rect.prototype.position = function(x, y) {
  this.left = x;
  this.top = y;

  this.update();
}

Rect.prototype.move = function(x, y) {
  this.left += x;
  this.top += y;

  this.update();
};

Rect.prototype.dimensions = function(w, h) {
  this.width = w;
  this.height = h;

  this.update();
};

module.exports = Rect;
