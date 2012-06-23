assets = exports
Image = require './image'

loaded = 0
expected = 0
onLoad = null

assetLoaded = ->
	loaded++
	if expected is loaded and onLoad?
		onLoad()

assets.load = (asset) ->
	expected++
	asset.on('load', assetLoaded)
	asset.load()

assets.loaded = (cb) ->
	if expected is loaded
		cb()
	else
		onLoad = cb

assets.newImage = ->
	image = new Image(arguments...)
	assets.load(image)
	image
