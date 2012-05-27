Asset = require '../../assets/asset'

class Image

  constructor: (image) ->
    if image instanceof Asset
      image = image.getContent()
    @image = image

  draw: (ctx, x, y) ->
    ctx.drawImage @image, x, y

  drawQuad: (ctx, quad, x, y) ->
    ctx.drawImage @image, quad.x, quad.y, quad.width, quad.height, x, y, quad.width, quad.height

module.exports = Image
