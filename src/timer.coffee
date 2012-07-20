timer = exports
eventify = require './events'

eventify(timer)

getMicroTime = -> 
  Date.now() / 1000

dt = 0
last = getMicroTime()
nextTick = []

timer.step = ->
  if nextTick.length > 0
    cb() while cb = nextTick.shift()

  now = getMicroTime()
  dt = now - last
  last = now
  timer.trigger('step')

  window.requestAnimationFrame(timer.step)

timer.nextTick = (cb) ->
  nextTick.push(cb)

timer.getDelta = ->
  dt

timer.getFPS = ->
  1 / timer.getDelta()

timer.getMicroTime = getMicroTime

