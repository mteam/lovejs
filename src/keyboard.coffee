keyboard = exports
eventify = require './events'

pressed = {}
eventify(keyboard)

getName = (code) ->
	names[code] or code

getCode = (key) ->
	for code, name of names when name is key
		return code

keyDown = (event) ->
	code = event.keyCode

	unless pressed[code]
		keyboard.trigger('keyDown', getName(code))

	pressed[code] = yes

keyUp = (event) ->
	code = event.keyCode

	if pressed[code]
		keyboard.trigger('keyUp', getName(code))

	pressed[code] = no

keyboard.createHandlers = ->
	window.addEventListener('keydown', keyDown)
	window.addEventListener('keyup', keyUp)

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


