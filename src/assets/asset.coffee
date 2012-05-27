Base = require '../base'
Events = require '../events'

class Asset extends Base
  @include Events

  constructor: ->
    @events()

  loaded: =>
    @trigger 'load'

  load: ->
  getContent: ->

module.exports = Asset
