keyboard = exports
eventify = require './events'

pressed = {}
eventify(keyboard)

keyboard.createHandlers = ->
  window.addEventListener('keydown', down)
  window.addEventListener('keyup', up)

keyboard.isDown = (args...) ->
  if args.length is 1
    !!pressed[args[0]]
  else
    args.some (key) -> pressed[key]

getKey = (code) ->
  names[code] or code

getCode = (event) ->
  event.keyCode

down = (event) ->
  code = getCode(event)
  key = getKey(code)

  unless pressed[key]
    keyboard.trigger('keyDown', key, code)

  pressed[key] = yes

up = (event) ->
  code = getCode(event)
  key = getKey(code)

  if pressed[key]
    keyboard.trigger('keyUp', key, code)

  pressed[key] = no

# key names

names =
  8: "backspace"
  9: "tab"
  13: "return"
  16: "shift"
  17: "ctrl"
  18: "alt"
  20: "capslock"
  32: " "
  33: "pageup"
  34: "pagedown"
  35: "end"
  36: "home"
  37: "left"
  38: "up"
  39: "right"
  40: "down"
  45: "insert"
  46: "delete"
  91: "meta"
  93: "menu"
  106: "kp*"
  107: "kp+"
  109: "kp-"
  110: "kp."
  111: "kp/"
  186: ";"
  187: "="
  188: ","
  189: "-"
  190: "."
  191: "/"
  219: "["
  220: "\\"
  221: "]"
  222: "'"

# a-z
for letter, i in 'abcdefghijklmnopqrstuvwxyz'.split('')
  names[i + 65] = letter

# numbers
for i in [0..9]
  names[i + 48] = i
  names[i + 96] = "kp#{i}"

# f keys
for i in [1..12]
  names[i + 111] = "f#{i}"


