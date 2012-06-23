module.exports = (obj) ->
  events = {}

  obj.on ?= (event, cb) ->
    events[event] ?= []
    events[event].push cb
    obj

  obj.trigger ?= (event, args...) ->
    return unless events[event]
    for callback in events[event]
      callback args...
    obj

  obj.__events ?= events
