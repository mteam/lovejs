mouse = exports
graphics = require './graphics'
eventify = require './events'

eventify(mouse)
pressed = {}
pos = x: 0, y: 0

mouse.createHandlers = ->
  el = graphics.getCanvas().el

  for event in ['mousemove', 'mousedown', 'mouseup']
    el.addEventListener(event, updatePosition)

  el.addEventListener('mouseup', up)
  el.addEventListener('mousedown', down)
  el.addEventListener('mousewheel', wheel)
  el.addEventListener('DOMMouseScroll', wheel)

mouse.isDown = (button) ->
  !!pressed[button]

mouse.getPosition = ->
  [pos.x, pos.y]

mouse.getX = ->
  pos.x

mouse.getY = ->
  pos.y

up = (event) ->
  button = getButton(event)

  if mouse.isDown(button)
    mouse.trigger('mouseUp', pos.x, pos.y, button)

  pressed[button] = no

down = (event) ->
  button = getButton(event)

  unless mouse.isDown(button)
    mouse.trigger('mouseDown', pos.x, pos.y, button)

  pressed[button] = yes

wheel = (event) ->
  if event.detail?
    if event.detail > 0
      button = "wd"
    else if event.detail < 0
      button = "wu"
  else if event.wheelDelta?
    if event.wheelDelta < 0
      button = "wd"
    else if event.wheelDelta > 0
      button = "wu"

  mouse.trigger('mouseDown', pos.x, pos.y, button)

updatePosition = (event) ->
  [pos.x, pos.y] = getPosition(event)

getPosition = (event) ->
  if event.offsetX?
    x = event.offsetX
    y = event.offsetY
  else
    offset = getOffset(event.target)
    x = event.pageX - offset.left
    y = event.pageY - offset.top
  [x, y]

getOffset = (element) ->
  left = top = 0
  if element.offsetParent
    loop
      left += element.offsetLeft
      top += element.offsetTop
      break unless element = element.offsetParent
  {left, top}

getButton = (event) ->
  switch event.button
    when 0 then 'l'
    when 1 then 'm'
    when 2 then 'r'
