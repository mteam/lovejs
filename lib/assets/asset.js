function Asset(base, exts) {
  this.base = base;
  this.exts = exts;
  this.loaded = false;
  this.content = null;
  this.loader = this.getLoader();
  this.trigger = this.trigger.bind(this);
}

Asset.loaders = {
  image: require('./image'),
  audio: require('./audio')
};

Asset.extensions = {
  jpg: 'image',
  png: 'image',

  mp3: 'audio',
  ogg: 'audio'
}

Asset.prototype.getUrl = function() {
  return this.base + (this.exts[0] ? this.exts[0] : '');
};

Asset.prototype.getUrls = function() {
  var base = this.base;

  return this.exts.map(function(ext) {
    return base + ext;
  });
};

Asset.prototype.getContent = function() {
  return this.content;
};

Asset.prototype.isLoaded = function() {
  return this.loaded;
};

var EXT_RE = /\.(\w+)$/;

Asset.prototype.getExtension = function() {
  var url = this.getUrl(),
      result = EXT_RE.exec(url);

  if (result) {
    return result[1];
  } else {
    throw new Error('url does not have an extension: ' + url);
  }
};

Asset.prototype.getLoader = function() {
  var ext = this.getExtension(),
      loader = Asset.extensions[ext];

  if (loader != null) {
    return Asset.loaders[loader];
  } else {
    throw new Error('could not identify extension: ' + ext);
  }
};

Asset.prototype.load = function() {
  this.loader(this, this.trigger);
};

Asset.prototype.trigger = function(result) {
  if (this.loaded) return;

  this.loaded = true;
  this.content = result;
  this.onLoad();
};

Asset.prototype.onLoad = function() {};

module.exports = Asset;
