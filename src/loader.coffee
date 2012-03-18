map = {}

@define = (name, value) ->
	map[name] = value

@require = (name) ->
	map[name]
