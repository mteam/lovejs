love = exports

require './shims'

love.timer = require './timer'
love.graphics = require './graphics'
love.keyboard = require './keyboard'
love.mouse = require './mouse'
love.assets = require './assets'
love.utils = require './utils'

love.run = ->
	love.load?()
	createHandlers()

	love.assets.loaded ->
		love.timer.step()

love.step = ->
	love.update? love.timer.getDelta()
	love.graphics.clear()
	love.graphics.push()
	love.draw?()
	love.graphics.pop()

createHandlers = ->
	if love.keyboard?
		love.keyboard.createHandlers()
		if love.keypressed? then love.keyboard.on('keyDown', love.keypressed.bind(love))
		if love.keyreleased? then love.keyboard.on('keyUp', love.keyreleased.bind(love))

	if love.mouse?
		love.mouse.createHandlers()
		if love.mousepressed? then love.mouse.on('mouseDown', love.mousepressed.bind(love))
		if love.mousereleased? then love.mouse.on('mouseUp', love.mousereleased.bind(love))

	love.timer.on('step', love.step)


