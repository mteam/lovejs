class Base
	define 'love/base', this

	@include: (object) ->
		for own key, value of object
			@::[key] = value
		return

define 'love/events',
	events: ->
		@_events = {}

	on: (event, callback) ->
		@_events[event] ?= []
		@_events[event].push callback
		this

	trigger: (event, args...) ->
		return unless @_events[event]
		for callback in @_events[event]
			callback args...
		this
