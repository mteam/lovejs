class Quad
	@define 'love/graphics/canvas/quad'

	constructor: (x, y, width, height) ->
		@setViewport x, y, width, height

	setViewport: (@x, @y, @width, @height) ->

	getViewport: ->
		[@x, @y, @width, @height]

	flip: (x, y) ->
		if (x and @width > 0) or (not x and @width < 0)
			@width = -@width

		if (y and @height > 0) or (not y and @height < 0)
			@height = -@height
