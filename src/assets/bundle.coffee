Asset = require './asset'

class Bundle extends Asset
  constructor: (assets = []) ->
    super()

    @assets =
      all: []
      loaded: []

    @add(asset) for asset in assets

  add: (asset) ->
    asset.on 'loaded', =>
      @assets.loaded.push(asset)
      @loaded() if @isLoaded()

    @assets.all.push(asset)

  isLoaded: ->
    @assets.loaded.length is @assets.all.length

  load: ->
    @assets.loaded = []
    asset.load() for asset in @assets.all

  getProgress: ->
    result = loaded: 0, total: 0

    for asset in @assets.all
      progress = asset.getProgress()
      result.loaded += progress.loaded
      result.total += progress.total

    result

module.exports = Bundle
