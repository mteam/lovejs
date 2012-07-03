timer = exports
eventify = require './events'

eventify(timer)

getMicroTime = ->	
	Date.now() / 1000

dt = 0
last = getMicroTime()

timer.step = ->
	now = getMicroTime()
	dt = now - last
	last = now
	timer.trigger('step')
	window.requestAnimationFrame(timer.step)

timer.getDelta = ->
	dt

timer.getFPS = ->
	1 / timer.getDelta()

timer.getMicroTime = getMicroTime

