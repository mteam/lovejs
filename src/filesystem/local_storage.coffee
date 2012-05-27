Filesystem = require './index'

class LocalStorageFilesystem extends Filesystem

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

module.exports = LocalStorageFilesystem
