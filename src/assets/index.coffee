Base = require '../base'
Events = require '../events'
Image = require './image'

class Assets extends Base
	@include Events

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

module.exports = Assets
