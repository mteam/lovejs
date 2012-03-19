map = {}

define = (name, value) ->
	map[name] = value

require = (name) ->
	map[name]

Function::define = (name) ->
	define name, this

@define = define
@require = require
