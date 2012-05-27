class Base

	@include: (object) ->
		for own key, value of object
			@::[key] = value
		return

module.exports = Base
