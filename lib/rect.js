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

Rect.aabb = function(x1, y1, x2, y2) {
  return new Rect(x1, y1, x2 - x1, y2 - y1);
};

Rect.prototype.update = function() {
  this.right = this.left + this.width;
  this.bottom = this.top + this.height;
};

Rect.prototype.toString = function() {
  return 'rect[' +
    this.left + ';' + this.top + ' ' +
    this.width + 'x' + this.height + ']';
};

// --- manipulation ---

Rect.prototype.position = function(x, y) {
  this.left = x;
  this.top = y;

  this.update();
};

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

// --- collisions ---

Rect.prototype.collides = function(rect) {
  return !(
    this.top > rect.bottom ||
    this.right < rect.left ||
    this.bottom < rect.top ||
    this.left > rect.right
  );
};

Rect.prototype.includes = function(x, y) {
  return !(
    this.top > y ||
    this.right < x ||
    this.bottom < y ||
    this.left > x
  );
};

Rect.prototype.overlap = function(rect) {
  if (!this.collides(rect)) return null;
  
  return Rect.aabb(
    Math.max(this.left, rect.left),
    Math.max(this.top, rect.top),
    Math.min(this.right, rect.right),
    Math.min(this.bottom, rect.bottom)
  );
};

module.exports = Rect;
