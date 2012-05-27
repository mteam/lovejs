module.exports =
  events: ->
    @_events = {}

  on: (event, callback) ->
    @_events[event] ?= []
    @_events[event].push callback
    this

  trigger: (event, args...) ->
    return unless @_events[event]
    for callback in @_events[event]
      callback args...
    this
