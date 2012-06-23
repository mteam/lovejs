mouse = exports
graphics = require './graphics'
eventify = require './events'

eventify(mouse)
pressed = {}
x = y = 0

mouse.createHandlers = ->
	el = graphics.getCanvas().el

	for event in ['mousemove', 'mousedown', 'mouseup']
		el.addEventListener(event, updatePosition)

	el.addEventListener('mouseup', mouse.up)
	el.addEventListener('mousedown', mouse.down)

mouse.up = (event) ->
	button = event.button

	if mouse.isDown(button)
		mouse.trigger('mouseUp', button, x, y)

	pressed[button] = no

mouse.down = (event) ->
	button = event.button

	unless mouse.isDown(button)
		mouse.trigger('mouseDown', button, x, y)

	pressed[button] = yes

mouse.isDown = (button) ->
	!!pressed[button]

mouse.getPosition = ->
	[x, y]

mouse.getX = ->
	x

mouse.getY = ->
	y

updatePosition = (event) ->
	if event.offsetX?
		x = event.offsetX
		y = event.offsetY
	else
		offset = getOffset(event.target)
		x = event.pageX - offset.left
		y = event.pageY - offset.top
	return

getOffset = (element) ->
	left = top = 0
	if element.offsetParent
		loop
			left += element.offsetLeft
			top += element.offsetTop
			break unless element = element.offsetParent
		{left, top}


