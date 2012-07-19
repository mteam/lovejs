eventify = require '../events'

class Asset
  constructor: ->
    eventify(this)
    @__loaded = false

  load: ->

  isLoaded: ->
    @__loaded

  loaded: =>
    @trigger('loaded')
    @__loaded = true

  getContent: ->

  getProgress: ->
    loaded: if @isLoaded() then 1 else 0
    total: 1

module.exports = Asset
