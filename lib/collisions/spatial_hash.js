function SpatialHash(size) {
  this.size = size;
  this.hash = {};
}

SpatialHash.prototype.reset = function() {
  for (var key in this.hash) {
    this.hash[key].length = 0;
  }
};

SpatialHash.prototype.insert = function(obj) {
  var rect = obj.rect;
  
  var x1 = this.min(rect.left),
      x2 = this.max(rect.right),
      y1 = this.min(rect.top),
      y2 = this.max(rect.bottom);
  
  var x, y;
  for (x = x1; x <= x2; x++) {
    for (y = y1; y <= y2; y++) {
      this.cell(x, y).push(obj);
    }
  }
};

SpatialHash.prototype.cell = function(x, y) {
  var key = x + ';' + y,
      hash = this.hash;
  
  return hash[key] != null ? hash[key] : hash[key] = [];
};

SpatialHash.prototype.min = function(i) {
  return Math.floor(i / this.size);
};

SpatialHash.prototype.max = function(i) {
  if (i % this.size == 0)
    return (i / this.size) - 1;
  else
    return Math.floor(i / this.size);
};

module.exports = SpatialHash;
