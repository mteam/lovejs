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

    it('should return only one instance for image url', function() {
      var asset1 = love.assets.get(kitten),
          asset2 = love.assets.get(kitten);

      expect(asset1).to.be(asset2).and.be.ok();
    });

    it('should return only one instance for audio url', function() {
      var asset1 = love.assets.get(ach, '.mp3', '.ogg'),
          asset2 = love.assets.get(ach, '.ogg', '.mp3');

      expect(asset1).to.be(asset2).and.be.ok();
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
        expect(asset.isLoaded()).to.be(true);
        expect(asset.getContent()).to.have.property('tagName', 'IMG');

        done();
      });
    });

    it('should load more image assets', function(done) {
      var assets = [kitten, mt, mallows]
        .map(function(url) { return love.assets.get(url); });

      love.assets.load(function() {
        assets.forEach(function(asset) {
          expect(asset.isLoaded()).to.be(true);
          expect(asset.getContent()).to.have.property('tagName', 'IMG');
        });

        done();
      });
    });

    it('should load audio asset', function(done) {
      var asset = love.assets.get(ach, '.mp3', '.ogg');

      love.assets.load(function() {
        expect(asset.isLoaded()).to.be(true);
        expect(asset.getContent()).to.have.property('tagName', 'AUDIO');
        
        done();
      });
    });
  });
});
