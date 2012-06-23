# LÖVE.js

LÖVE.js is a port of [LÖVE](http://love2d.org/), an amazing game engine written in Lua. The API is identical, since JavaScript and Lua are very similar. The canvas is used for rendering.

Source code is written in CoffeeScript and it is also recommended for using this lib.

## Example

```coffeescript
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
```
