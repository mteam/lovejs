Base = require 'love/base'
Events = require 'love/events'

class Timer extends Base
	@include Events
	@define 'love/timer'
	
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
		@updateDelta()
		@trigger 'step'
		@request @step

	updateDelta: ->
		now = @getMicroTime()
		@dt = now - @last
		@last = now
	
	getDelta: ->
		@dt
	
	getFps: ->
		1 / @getDelta()
	
	getMicroTime: ->
		+new Date / 1000
