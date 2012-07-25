Bundle = require './bundle'
Image = require './image'
assets = exports

assets.all = main = new Bundle

assets.add = (assets, cb) ->
  bundle = new Bundle(assets)
  bundle.on('loaded', cb) if cb?
  main.add(bundle)
  bundle

assets.addImage = (name, cb) ->
  image = new Image(name)
  assets.add([image], cb)
  image

assets.addImages = (names, cb) ->
  images = (new Image(name) for name in names)
  assets.add(images, cb)
  images

assets.load = (cb) ->
  if main.isLoaded()
    cb()
  else
    triggered = false
    main.on 'loaded', ->
      if not triggered
        triggered = true
        cb()
    main.load()

assets.getProgress = ->
  main.getProgress()

# factories

assets.newImage = ->
  new Image(arguments...)

assets.newBundle = ->
  new Bundle(arguments...)
