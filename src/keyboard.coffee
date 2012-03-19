Base = require 'love/base'
Events = require 'love/events'

class Keyboard extends Base
	@include Events
	@define 'love/keyboard'

	constructor: ->
		window.addEventListener 'keydown', @keyDown
		window.addEventListener 'keyup', @keyUp

		@events()
		@keys = {}

	keyDown: (event) =>
		key = event.keyCode

		unless @isDown key
			@trigger 'keyDown', key

		@keys[key] = yes

	keyUp: (event) =>
		key = event.keyCode

		if @isDown key
			@trigger 'keyUp', key

		@keys[key] = no

	isDown: (key) ->
		!!@keys[key]
