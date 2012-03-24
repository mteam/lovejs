class Filesystem
	@define 'love/filesystem'

	read: (name, size) -> @unimplemented()
	write: (name, data, size) -> @unimplemented()
	enumerate: (dir) -> @unimplemented()
	exists: (filename) -> @unimplemented()
	isDirectory: (filename) -> @unimplemented()
	isFile: (filename) -> @unimplemented()
	lines: (name) -> @unimplemented()
	mkdir: (name) -> @unimplemented()
	remove: (name) -> @unimplemented()

	unimplemented: ->
		throw "not implemented"

class LocalStorageFilesystem extends Filesystem
	@define 'love/filesystem/localStorage'

	storage: window.localStorage or {}

	read: (name) ->
		@storage[name]

	write: (name, data) ->
		@storage[name] = data
		true

	enumerate: ->
		@storage

	exists: (name) ->
		@storage[name]?

	remove: (name) ->
		delete @storage[name]




