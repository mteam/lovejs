Drawable = require './drawable'

class Canvas extends Drawable
  constructor: ->
    if arguments.length is 1
      el = arguments[0]

    else if arguments.length is 2
      el = document.createElement('canvas')
      el.width = arguments[0]
      el.height = arguments[1]

    @el = el
    @width = el.width
    @height = el.height
    @ctx = el.getContext('2d')
    @style = el.style
    @state = {}

  draw: (ctx, x, y) ->
    ctx.drawImage(@el, x, y)

  drawq: (ctx, q, x, y) ->
    ctx.drawImage(@el, q.x, q.y, q.w, q.h, x, y, q.w, q.h)

module.exports = Canvas
