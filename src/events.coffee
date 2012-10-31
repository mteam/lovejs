module.exports = (obj) ->
  events = {}

  obj.on ?= (event, cb) ->
    events[event] ?= []
    events[event].push(cb)
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
