assets = exports
Image = require './image'

loaded = 0
assets = 0
onLoad = null

assetLoaded = ->
	loaded++
	if assets is loaded and onLoad?
		onLoad()

assets.load = (asset) ->
	assets++
	asset.on('load', assetLoaded)
	asset.load()

assets.loaded = (cb) ->
	if assets is loaded
		cb()
	else
		onLoad = cb

assets.newImage = ->
	image = new Image(arguments...)
	assets.load(image)
	image
