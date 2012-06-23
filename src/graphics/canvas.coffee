Drawable = require './drawable'

class Canvas extends Drawable
  constructor: ->
    if arguments.length is 1
      @el = arguments[0]
      @width = el.width
      @height = el.height
    else if arguments.length is 2
      @el = document.createElement('canvas')
      @width = arguments[0]
      @height = arguments[1]
    @ctx = el.getContext('2d')
    @style = el.style
    @state = {}

  draw: (ctx, x, y) ->
    ctx.drawImage(@el, x, y)

  drawq: (ctx, q, x, y) ->
    ctx.drawImage(@el, q.x, q.y, q.width, q.height, x, y, q.sw, q.sh)

module.exports = Canvas
