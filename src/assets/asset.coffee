eventify = require '../events'

class Asset
  constructor: ->
    eventify(this)

  loaded: =>
    @trigger 'load'

  load: ->
  getContent: ->

module.exports = Asset
