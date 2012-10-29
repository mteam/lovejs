timer = exports
eventify = require './events'

eventify(timer)

getMicroTime = -> 
  Date.now() / 1000

dt = null
last = null
nextTick = []

raf = (fn) -> window.requestAnimationFrame(fn)

timer.maxdt = 0.03

timer.start = ->
  last = getMicroTime()
  raf(timer.step)

timer.step = ->
  if nextTick.length > 0
    cb() while cb = nextTick.shift()

  timer.tick()
  timer.tock()

  raf(timer.step)

# update
timer.tick = ->
  now = getMicroTime()
  dt = now - last
  last = now

  timer.trigger('tick')

# render
timer.tock = ->
  timer.trigger('tock')

timer.nextTick = (cb) ->
  nextTick.push(cb)

timer.getDelta = ->
  dt

timer.getFPS = ->
  1 / timer.getDelta()

timer.getMicroTime = getMicroTime
