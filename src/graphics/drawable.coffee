class Drawable
  draw: (ctx, x, y) ->
    throw new Error('this object cannot be drawn')

  drawq: (ctx, quad, x, y) ->
    throw new Error('this object cannot be drawn with quad')

module.exports = Drawable
