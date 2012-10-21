class Quad
  constructor: ->
    @setViewport.apply(this, arguments)

  setViewport: (@x, @y, @w, @h) ->

  getViewport: ->
    [@x, @y, @w, @h]

  flip: (x, y) ->
    if (x and @w > 0) or (not x and @w < 0)
      @w = -@w

    if (y and @h > 0) or (not y and @h < 0)
      @h = -@h

module.exports = Quad
