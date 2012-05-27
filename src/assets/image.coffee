Asset = require './asset'
HTMLImage = @Image

class Image extends Asset
  name: "image"

  constructor: (@src) ->
    super()

    @el = new HTMLImage
    @el.addEventListener 'load', @loaded

  load: ->
    @el.src = @src

  getContent: ->
    @el

module.exports = Image
