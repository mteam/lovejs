love = require 'lovejs'

surface = null
last = x: 0, y: 0
curr = x: 0, y: 0

love.load = ->
  canvas = document.getElementById('game')
  love.graphics.setCanvas(canvas)

  surface = love.graphics.newCanvas()

love.update = ->
  [last.x, last.y] = [curr.x, curr.y]
  [curr.x, curr.y] = love.mouse.getPosition()

love.draw = ->
  love.graphics.setCanvas(surface)
  if love.mouse.isDown(0)
    love.graphics.line(last.x, last.y, curr.x, curr.y)

  love.graphics.setCanvas()
  love.graphics.draw(surface, 0, 0)

love.run()
