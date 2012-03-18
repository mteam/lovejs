Base = require 'love/base'
Events = require 'love/events'

class Mouse extends Base
	@include Events

	define 'love/mouse', this

	constructor: ({@element}) ->
		@element.bind 'mousemove mousedown mouseup', @updatePosition
		@element.bind 'mousedown', @mouseDown
		@element.bind 'mouseup', @mouseUp

		@buttons = {}
		@events()
		@x = @y = 0

	mouseDown: (event) =>
		button = event.button

		unless @isDown button
			@trigger 'mouseDown', button, @x, @y

		@buttons[button] = yes

		return

	mouseUp: (event) =>
		button = event.button

		if @isDown button
			@trigger 'mouseUp', button, @x, @y

		@buttons[button] = no

		return

	updatePosition: (event) =>
		if event.offsetX?
			@x = event.offsetX
			@y = event.offsetY
		else
			offset = @element.offset()
			@x = event.pageX - offset.left
			@y = event.pageY - offset.top
		return

	isDown: (button) ->
		!!@buttons[button]

	getX: -> @x
	getY: -> @y
	getPosition: -> [@x, @y]
