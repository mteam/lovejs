function Vector(x, y) {
  if (!(this instanceof Vector)) return new Vector(x, y);
  this.nupdate(x, y);
}

Vector.prototype.nupdate = function(x, y) {
  this.x = x;
  this.y = y;
  return this;
};

Vector.prototype.vupdate = function(v) {
  this.nupdate(v.x, v.y);
  return this;
};

Vector.prototype.toString = function() {
  return '(' + this.x + ';' + this.y + ')';
};

// --- arithmetic ---

Vector.prototype.nadd = function(x, y) {
  this.x += x;
  this.y += y;
  return this;
};

Vector.prototype.vadd = function(v) {
  this.nadd(v.x, v.y);
  return this;
};

Vector.prototype.nsubtract = function(x, y) {
  this.x -= x;
  this.y -= y;
  return this;
};

Vector.prototype.vsubtract = function(v) {
  this.nsubtract(v.x, v.y);
  return this;
};

Vector.prototype.multiply = function(n) {
  this.x *= n;
  this.y *= n;
  return this;
};

Vector.prototype.divide = function(n) {
  this.x /= n;
  this.y /= n;
  return this;
};

// ---

Vector.prototype.length2 = function() {
  return this.x * this.x + this.y * this.y;
};

Vector.prototype.length = function() {
  return Math.sqrt(this.length2());
};

// --- comparing ---

Vector.equal = function(u, v) {
  return u.x === v.x && u.y === v.y;
};

module.exports = Vector;
