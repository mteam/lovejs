var Asset = require('./asset');

var assets = {},
    queue = [];

exports.get = function(base) {
  if (base == null)
    throw new Error('url is not specified');

  var exts = Array.prototype.slice.call(arguments, 1);

  if (assets[base] == null) {
    var asset = new Asset(base, exts);
    assets[base] = asset;
    queue.push(asset);
  }

  return assets[base];
};

exports.add = function() {
  exports.get.apply(null, arguments);
};

exports.load = function(done) {
  if (queue.length === 0) {
    done();
    return;
  }

  var count = 0;
  function loaded() {
    if (++count === queue.length) {
      queue.length = 0;
      done();
    }
  }

  queue.forEach(function(asset) {
    asset.onLoad = loaded;
    asset.load();
  });
};

exports.reset = function() {
  assets = {};
  queue = [];
};
