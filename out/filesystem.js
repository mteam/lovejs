(function() {
  var Filesystem, LocalStorageFilesystem,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Filesystem = (function() {

    function Filesystem() {}

    Filesystem.define('love/filesystem');

    Filesystem.prototype.read = function(name, size) {
      return this.unimplemented();
    };

    Filesystem.prototype.write = function(name, data, size) {
      return this.unimplemented();
    };

    Filesystem.prototype.enumerate = function(dir) {
      return this.unimplemented();
    };

    Filesystem.prototype.exists = function(filename) {
      return this.unimplemented();
    };

    Filesystem.prototype.isDirectory = function(filename) {
      return this.unimplemented();
    };

    Filesystem.prototype.isFile = function(filename) {
      return this.unimplemented();
    };

    Filesystem.prototype.lines = function(name) {
      return this.unimplemented();
    };

    Filesystem.prototype.mkdir = function(name) {
      return this.unimplemented();
    };

    Filesystem.prototype.remove = function(name) {
      return this.unimplemented();
    };

    Filesystem.prototype.unimplemented = function() {
      throw "not implemented";
    };

    return Filesystem;

  })();

  LocalStorageFilesystem = (function(_super) {

    __extends(LocalStorageFilesystem, _super);

    function LocalStorageFilesystem() {
      LocalStorageFilesystem.__super__.constructor.apply(this, arguments);
    }

    LocalStorageFilesystem.define('love/filesystem/localStorage');

    LocalStorageFilesystem.prototype.storage = window.localStorage || {};

    LocalStorageFilesystem.prototype.read = function(name) {
      return this.storage[name];
    };

    LocalStorageFilesystem.prototype.write = function(name, data) {
      this.storage[name] = data;
      return true;
    };

    LocalStorageFilesystem.prototype.enumerate = function() {
      return this.storage;
    };

    LocalStorageFilesystem.prototype.exists = function(name) {
      return this.storage[name] != null;
    };

    LocalStorageFilesystem.prototype.remove = function(name) {
      return delete this.storage[name];
    };

    return LocalStorageFilesystem;

  })(Filesystem);

}).call(this);
