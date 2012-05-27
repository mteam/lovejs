class Filesystem

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

module.exports = Filesystem
