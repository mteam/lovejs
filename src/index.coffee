love = exports

require './shims'

love.timer = require './timer'
love.graphics = require './graphics'
love.keyboard = require './keyboard'
love.mouse = require './mouse'
love.assets = require './assets'
love.utils = require './utils'
love.eventify = require './events'

love.run = ->
  love.load?()
  createHandlers()
  love.timer.start()

love.tick = ->
  love.update? love.timer.getDelta()

love.tock = ->
  love.graphics.clear()
  love.graphics.push()
  love.draw?()
  love.graphics.pop()

createHandlers = ->
  if love.keyboard?
    love.keyboard.createHandlers()
    if love.keypressed? then love.keyboard.on('pressed', love.keypressed.bind(love))
    if love.keyreleased? then love.keyboard.on('released', love.keyreleased.bind(love))

  if love.mouse?
    love.mouse.createHandlers()
    if love.mousepressed? then love.mouse.on('pressed', love.mousepressed.bind(love))
    if love.mousereleased? then love.mouse.on('released', love.mousereleased.bind(love))

  love.timer.on('tick', love.tick)
  love.timer.on('tock', love.tock)


