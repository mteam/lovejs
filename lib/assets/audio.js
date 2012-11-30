module.exports = function(asset, done) {
  var audio = new Audio();

  function loaded() {
    done(audio);
  }

  audio.addEventListener('canplaythrough', loaded, false);

  asset.getUrls().forEach(function(url) {
    var source = document.createElement('source');
    source.src = url;
    audio.appendChild(source);
  });

  audio.load();
};
