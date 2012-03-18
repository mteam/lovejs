Asset = require 'love/assets/asset'

class Graphics
	define 'love/graphics', this

	constructor: ({element: canvas}) ->
		@canvas = canvas[0]
		@width = @canvas.width
		@height = @canvas.height
		@ctx = @canvas.getContext '2d'

	clear: ->
		@ctx.clearRect 0, 0, @width, @height

	setBackgroundColor: (r, g, b) ->
		@canvas.style.background = "rgb(#{r}, #{g}, #{b})"

	rectangle: (mode, x, y, width, height) ->
		func = switch mode
			when "fill" then "fillRect"
			when "line" then "strokeRect"

		@ctx[func] x, y, width, height

	circle: (mode, x, y, radius) ->
		@ctx.beginPath()
		@ctx.arc x, y, radius, 0, Math.PI * 2
		switch mode
			when "fill" then @ctx.fill()
			when "line" then @ctx.stroke()

	draw: (drawable, x, y, r = 0, sx = 1, sy = sx, ox = 0, oy = 0) ->
		if r is 0 and sx is 1 and sy is sx
			x = x - ox
			y = y - oy
			drawable.draw @ctx, x, y
		else
			@ctx.save()

			@ctx.translate x, y
			@ctx.rotate r
			@ctx.translate -ox, -oy
			@ctx.scale sx, sy

			drawable.draw @ctx, 0, 0

			@ctx.restore()

	# factories

	newImage: (image) ->
		new Image image



class Drawable
	define 'love/graphics/drawable', this

	draw: (ctx, x, y) ->



class Image extends Drawable
	define 'love/graphics/image', this

	constructor: (image) ->
		if image instanceof Asset
			image = image.getContent()
		@image = image

	draw: (ctx, x, y) ->
		ctx.drawImage @image, x, y
