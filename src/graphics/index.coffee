Canvas = require './canvas'
Image = require './image'
Quad = require './quad'
Drawable = require './drawable'

isElement = (obj) -> obj?.nodeType is 1
rgb = (rgb...) -> "rgb(#{rgb.join ', '})" # rgba(0xab, 0xcd, 0xef)
rgba = (rgba...) -> "rgba(#{rgba.join ', '})" # rgba(0xab, 0xcd, 0xef, 0xab)

$first = null
$canvas = null

module.exports =
  setCanvas: (canvas = null) ->
    if isElement(canvas)
      canvas = new Canvas(canvas)

    if canvas is null
      canvas = $first

    if canvas instanceof Canvas
      if $first is null
        $first = canvas
      $canvas = canvas
    else
      throw new Error("this ain't canvas!")

  getCanvas: -> $canvas

  # canvas info

  getWidth: ->
    $canvas.width

  getHeight: ->
    $canvas.height

  # background

  setBackgroundColor: (r, g, b, a = 0xff) ->
    $canvas.state.background = [r, g, b, a]
    $canvas.style.backgroundColor = rgba(r, g, b, a)

  getBackgroundColor: ->
    $canvas.state.background or [0xff, 0xff, 0xff, 0xff]

  clear: ->
    $canvas.ctx.clearRect(0, 0, $canvas.width, $canvas.height)

  # line

  setLineWidth: (width) ->
    $canvas.ctx.lineWidth = width

  getLineWidth: ->
    $canvas.ctx.lineWidth

  setLineCap: (cap) ->
    $canvas.ctx.lineCap = cap

  getLineCap: ->
    $canvas.ctx.lineCap

  setLineJoin: (join) ->
    $canvas.ctx.lineJoin = join

  getLineJoin: ->
    $canvas.ctx.lineJoin

  # color

  setColor: (r, g, b, a, type) ->
    if r? and g? and b?
      $canvas.ctx.fillStyle = $canvas.ctx.strokeStyle = rgb r, g, b
    
    if a?
      $canvas.ctx.globalAlpha = a / 0xff

    $canvas.state.color = [r, g, b, a]

  getColor: ->
    $canvas.state.color or [0x00, 0x00, 0x00, 0xff]

  # shapes

  rectangle: (mode, x, y, width, height) ->
    func = switch mode
      when "fill" then "fillRect"
      when "line" then "strokeRect"

    $canvas.ctx[func](x, y, width, height)

  circle: (mode, x, y, radius) ->
    $canvas.ctx.beginPath()
    $canvas.ctx.arc(x, y, radius, 0, Math.PI * 2)
    switch mode
      when "fill" then $canvas.ctx.fill()
      when "line" then $canvas.ctx.stroke()

  line: ->
    $canvas.ctx.beginPath()
    for x, i in arguments by 2
      y = arguments[i + 1]
      $canvas.ctx.lineTo(x, y)
    $canvas.ctx.stroke()

  # text

  print: (text, x, y) ->
    $canvas.ctx.fillText(text, x, y)

  setFont: (name, size) ->
    $canvas.ctx.font = "#{size}px #{name}"

  getFont: ->
    match = /^(\d+)\S+ (.+)$/.exec($canvas.ctx.font)
    name: match[2], size: parseInt(match[1], 10)

  setTextAlign: (align) ->
    $canvas.ctx.textAlign = align

  getTextAlign: ->
    $canvas.ctx.textAlign

  setTextBaseline: (baseline) ->
    $canvas.ctx.textBaseline = baseline

  getTextBaseline: ->
    $canvas.ctx.textBaseline

  # manipulation

  push: ->
    $canvas.ctx.save()

  pop: ->
    $canvas.ctx.restore()

  scale: (x, y) ->
    $canvas.ctx.scale(x, y)

  rotate: (angle) ->
    $canvas.ctx.rotate(angle)

  translate: (x, y) ->
    $canvas.ctx.translate(x, y)

  # objects drawing

  draw: (drawable, x, y) ->
    drawable.draw($canvas.ctx, x, y)

  drawq: (drawable, quad, x, y) ->
    drawable.drawq($canvas.ctx, quad, x, y)

  # factories

  newCanvas: ->
    if arguments.length is 0 and $first?
      new Canvas($first.width, $first.height)
    else if arguments.length is 1
      new Canvas(arguments[0])
    else
      new Canvas(arguments[0], arguments[1])

  newImage: (image) ->
    new Image(image)

  newQuad: (x, y, w, h) ->
    new Quad(x, y, w, h)

  # export classes

  Canvas: Canvas
  Drawable: Drawable
  Image: Image
  Quad: Quad
