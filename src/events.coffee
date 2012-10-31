module.exports = (obj) ->
  events = {}

  obj.on ?= (event, cb) ->
    events[event] ?= []
    events[event].push(cb)
    obj

  obj.once ?= (event, cb) ->
    f = ->
      obj.removeListener(event, f)
      cb(arguments...)

    obj.on(event, f)

  obj.removeListener ?= (event, cb) ->
    return unless events[event]

    index = events[event].indexOf(cb)
    if index > -1
      events[event].splice(index, 1)

    obj

  obj.trigger ?= (event, args...) ->
    return unless events[event]
    for callback in events[event]
      callback(args...)
    obj

  obj.propagate ?= (event, args...) ->
    return unless events[event]
    for callback in events[event]
      if callback(args...) is false
        break
    obj

  obj.__events ?= events
