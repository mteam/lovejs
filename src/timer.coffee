Base = require 'love/base'
Events = require 'love/events'

class Timer extends Base
	@include Events

	define 'love/timer', this
	
	constructor: ->
		@last = @getMicroTime()
		@events()

	request: (
			window.requestAnimationFrame or
			window.webkitRequestAnimationFrame or
			window.mozRequestAnimationFrame or
			window.msRequestAnimationFrame or
			(cb) -> window.setTimeout cb, 1000 / 60
		).bind window
	
	step: =>
		@trigger 'step'
		@request @step
	
	getDelta: ->
		now = @getMicroTime()
		dt = now - @last
		@last = now
		dt
	
	getMicroTime: ->
		+new Date / 1000
