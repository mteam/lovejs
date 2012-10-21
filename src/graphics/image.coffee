Drawable = require './drawable'
ImageAsset = require '../assets/image'

class Image extends Drawable
  constructor: (image) ->
    if image instanceof ImageAsset
      image = image.getContent()

    @image = image
    @width = image.width
    @height = image.height

  draw: (ctx, x, y) ->
    ctx.drawImage(@image, x, y)

  drawq: (ctx, q, x, y) ->
    ctx.drawImage(@image, q.x, q.y, q.w, q.h, x, y, q.w, q.h)

module.exports = Image
