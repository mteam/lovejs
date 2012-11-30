module.exports = function(asset, done) {
  var image = new Image;

  image.onload = function() {
    done(image);
  };
  
  image.src = asset.getUrl();
};
