Base = require 'love/base'
Events = require 'love/events'

class Assets extends Base
	@include Events
	@define 'love/assets'

	constructor: ->
		@_expected = 0
		@_done = 0
		@assets = []
		@events()

	load: (asset) ->
		@expect()
		asset.on 'load', @done
		asset.load()

	loaded: ->
		@_done is @_expected

	newImage: (path) ->
		image = new Image path
		@load image
		image

	# private

	expect: ->
		@_expected++

	done: =>
		@_done++
		if @loaded() then @trigger 'load'



class Asset extends Base
	@include Events

	define 'love/assets/asset', this

	constructor: ->
		@events()

	loaded: =>
		@trigger 'load'

	load: ->
	getContent: ->


HTMLImage = @Image


class Image extends Asset
	name: "image"

	define 'love/assets/image', this

	constructor: (@src) ->
		super()

		@el = new HTMLImage
		@el.addEventListener 'load', @loaded

	load: ->
		@el.src = @src

	getContent: ->
		@el
