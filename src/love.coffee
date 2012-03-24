class Love
	@define 'love'

	constructor: ->
		@modules =
			timer: require 'love/timer'
			graphics: require 'love/graphics'
			keyboard: require 'love/keyboard'
			mouse: require 'love/mouse'
			assets: require 'love/assets'
			filesystem: require 'love/filesystem/localStorage'

	run: ->
		@load?()

		if @assets.loaded()
			@timer.step()
		else
			@assets.on 'load', =>
				@timer.step()

	init: (config) ->
		for name, module of @modules when module
			@[name] = new module config

		@timer.on 'step', @step

		if @keyboard?
			if @keyDown? then @keyboard.on 'keyDown', @keyDown.bind this
			if @keyUp? then @keyboard.on 'keyUp', @keyUp.bind this

		if @mouse?
			if @mouseDown? then @mouse.on 'mouseDown', @mouseDown.bind this
			if @mouseUp? then @mouse.on 'mouseUp', @mouseUp.bind this

	step: =>
		@update? @timer.getDelta()

		@graphics.clear()
		@draw?()



@love = new Love
