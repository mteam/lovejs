Base = require './base'
Events = require './events'

class Keyboard extends Base
	@include Events

	constructor: ->
		window.addEventListener 'keydown', @keyDown
		window.addEventListener 'keyup', @keyUp

		@events()
		@keys = {}

	keyDown: (event) =>
		code = event.keyCode

		unless @keys[code]
			@trigger 'keyDown', @getName code

		@keys[code] = yes

	keyUp: (event) =>
		code = event.keyCode

		if @keys[code]
			@trigger 'keyUp', @getName code

		@keys[code] = no

	isDown: (key) ->
		code = @getCode key
		!!@keys[code]

	getName: (code) ->
		keys[code] or code

	getCode: (key) ->
		for code, name of keys when name is key
			return code

module.exports = Keyboard

keys =
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
for letter, i in 'abcdefghijklmnopqrstuvwxyz'.split ''
	keys[i + 65] = letter

# numbers
for i in [0..9]
	keys[i + 48] = i
	keys[i + 96] = "kp#{i}"

# f keys
for i in [1..12]
	keys[i + 111] = "f#{i}"


