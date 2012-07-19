Asset = require './asset'
HTMLImage = @Image

class Image extends Asset
  constructor: (@src) ->
    super()

    @el = new HTMLImage
    @el.addEventListener('load', @loaded)

  getContent: ->
    @el

  load: ->
    if @isLoaded()
      @loaded()
    else
      @el.src = @src

module.exports = Image
