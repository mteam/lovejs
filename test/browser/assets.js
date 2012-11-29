var expect = require('expect.js'),
    love = { assets: require('../../lib/assets') };

var kitten = 'files/kitten.jpg',
    mt = 'files/mt.png',
    mallows = 'files/marshmallows.jpg',
    ach = 'files/ach';

describe('love.assets', function() {
  afterEach(function() {
    love.assets.reset();
  });

  describe('#get', function() {

    it('should return only one instance for url', function() {
      var asset1 = love.assets.get(kitten),
          asset2 = love.assets.get(kitten);

      expect(asset1).to.be(asset2);
    });

    it('should return image asset for image urls', function() {
      [kitten, mt, mallows].forEach(function(url) {
        var asset = love.assets.get(url);
        expect(asset).to.be.an(love.assets.Image);
      });
    });

    it('should return audio asset for audio url', function() {
      var asset = love.assets.get(ach, '.mp3', '.ogg');
      expect(asset).to.be.an(love.assets.Audio);
    });

    it('should throw when called with invalid url', function() {
      var noExt = 'files/foo',
          invalidExt = 'files/foo.bar';

      expect(function() {
        love.assets.get(noExt);
      }).to.throwError(/does not have an extension/);

      expect(function() {
        love.assets.get(invalidExt);
      }).to.throwError(/could not identify extension/);
    });
  });

  describe('#load', function() {
    it('should call callback immediately when there are no assets to load', function() {
      var called = false;

      love.assets.load(function() {
        called = true;
      });

      expect(called).to.be(true);
    });

    it('should load image asset', function(done) {
      var asset = love.assets.get(kitten);

      love.assets.load(function() {
        expect(asset.loaded).to.be(true);
        done();
      });
    });

    it('should load more image assets', function(done) {
      var assets = [kitten, mt, mallows]
        .map(function(url) { return love.assets.get(url); });

      love.assets.load(function() {
        var loaded = assets
          .every(function(a) { return a.loaded; });

        expect(loaded).to.be(true);
        done();
      });
    });

    it('should load audio asset', function(done) {
      var asset = love.assets.get(ach, '.mp3', '.ogg');

      love.assets.load(function() {
        expect(asset.loaded).to.be(true);
        done();
      });
    });
  });
});
