Asset = require 'love/assets/asset'
Quad = require 'love/graphics/quad'



rgb = (rgb...) -> "rgb(#{rgb.join ', '})" # rgb(0xab, 0xcd, 0xed)
rgba = (rgb..., a) -> "rgba(#{rgb.join ', '})" # rgba(0xab, 0xcd, 0xed)



class Canvas
	@define 'love/graphics/canvas'

	constructor: ({element: canvas}) ->
		@canvas = canvas[0]
		@width = @canvas.width
		@height = @canvas.height
		@ctx = @canvas.getContext '2d'

	clear: -> @ctx.clearRect 0, 0, @width, @height

	push: -> @ctx.save()
	pop: -> @ctx.restore()

	scale: (x, y) -> @ctx.scale x, y
	rotate: (angle) -> @ctx.rotate angle
	translate: (x, y) -> @ctx.translate x, y

	# setters

	setBackgroundColor: (r, g, b, a = 255) ->
		if _.isArray r
			@setBackgroundColor r...
		else
			@canvas.style.background = rgba r, g, b, a
	
	setLineWidth: (width) -> @ctx.lineWidth = width
	setLineCap: (cap) -> @ctx.lineCap = cap
	setLineJoin: (join) -> @ctx.lineJoin = join
	
	setColor: (r, g, b, a, type) ->
		if r? and g? and b?
			str = rgb r, g, b
			if type?
				@ctx["#{type}Style"] = str
			else
				@ctx.fillStyle = @ctx.strokeStyle = str
		
		if a? then @ctx.globalAlpha = a / 255

	# shapes

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

	line: ->
		@ctx.beginPath()
		for x, i in arguments by 2
			y = arguments[i + 1]
			@ctx.lineTo x, y
		@ctx.stroke()

	# objects drawing

	draw: (drawable, x, y, r = 0, sx = 1, sy = sx, ox = 0, oy = 0) ->
		if r is 0 and sx is 1 and sy is sx
			x = x - ox
			y = y - oy
			drawable.draw @ctx, x, y
		else
			@push()

			@translate x, y
			@rotate r
			@translate -ox, -oy
			@scale sx, sy

			drawable.draw @ctx, 0, 0

			@pop()

	drawq: (image, quad, x, y, r = 0, sx = 1, sy = sx, ox = 0, oy = 0) ->
		if r is 0 and sx is 1 and sy is sx
			x = x - ox
			y = y - oy
			image.drawQuad @ctx, quad, x, y
		else
			@push()

			@translate x, y
			@rotate r
			@translate -ox, -oy
			@scale sx, sy

			image.drawQuad @ctx, quad, 0, 0

			@pop()

	# factories

	newImage: (image) ->
		new Image image

	newQuad: (x, y, width, height) ->
		new Quad x, y, width, height



class Drawable
	@define 'love/graphics/canvas/drawable'

	draw: (ctx, x, y) ->



class Image extends Drawable
	@define 'love/graphics/canvas/image'

	constructor: (image) ->
		if image instanceof Asset
			image = image.getContent()
		@image = image

	draw: (ctx, x, y) ->
		ctx.drawImage @image, x, y

	drawQuad: (ctx, quad, x, y) ->
		ctx.drawImage @image, quad.x, quad.y, quad.width, quad.height, x, y, quad.width, quad.height
