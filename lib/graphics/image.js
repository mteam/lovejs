function Image(source) {
  this.source = source.getContent ? source.getContent() : source;
}

Image.prototype.draw = function(ctx, x, y) {
  ctx.drawImage(this.source, x, y);
};

Image.prototype.drawRect = function(ctx, rect, x, y) {
  ctx.drawImage(
    this.source,
    rect.left, rect.top, rect.width, rect.height,
    x, y, rect.width, rect.height
  );
};

module.exports = Image;
