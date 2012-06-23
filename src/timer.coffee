timer = exports
eventify = require './events'

eventify(timer)

requestFrame = (
	window.requestAnimationFrame or
	window.webkitRequestAnimationFrame or
	window.mozRequestAnimationFrame or
	window.msRequestAnimationFrame or
	(cb) -> window.setTimeout(cb, 1000 / 60)
).bind window

getMicroTime = ->
	+new Date / 1000

dt = 0
last = getMicroTime()
now = 0

updateDelta = ->
	now = getMicroTime()
	dt = now - last
	last = now

timer.step = ->
	updateDelta()
	timer.trigger('step')
	requestFrame(timer.step)

timer.getDelta = ->
	dt

timer.getFPS = ->
	1 / timer.getDelta()

timer.getMicroTime = getMicroTime

