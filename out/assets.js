(function() {
  var Asset, Assets, Base, Events, HTMLImage, Image,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('love/base');

  Events = require('love/events');

  Assets = (function(_super) {

    __extends(Assets, _super);

    Assets.include(Events);

    define('love/assets', Assets);

    function Assets() {
      this.done = __bind(this.done, this);      this._expected = 0;
      this._done = 0;
      this.assets = [];
      this.events();
    }

    Assets.prototype.load = function(asset) {
      this.expect();
      asset.on('load', this.done);
      return asset.load();
    };

    Assets.prototype.loaded = function() {
      return this._done === this._expected;
    };

    Assets.prototype.newImage = function(path) {
      var image;
      image = new Image(path);
      this.load(image);
      return image;
    };

    Assets.prototype.expect = function() {
      return this._expected++;
    };

    Assets.prototype.done = function() {
      this._done++;
      if (this.loaded()) return this.trigger('load');
    };

    return Assets;

  })(Base);

  Asset = (function(_super) {

    __extends(Asset, _super);

    Asset.include(Events);

    define('love/assets/asset', Asset);

    function Asset() {
      this.loaded = __bind(this.loaded, this);      this.events();
    }

    Asset.prototype.loaded = function() {
      return this.trigger('load');
    };

    Asset.prototype.load = function() {};

    Asset.prototype.getContent = function() {};

    return Asset;

  })(Base);

  HTMLImage = this.Image;

  Image = (function(_super) {

    __extends(Image, _super);

    Image.prototype.name = "image";

    define('love/assets/image', Image);

    function Image(src) {
      this.src = src;
      Image.__super__.constructor.call(this);
      this.el = new HTMLImage;
      this.el.addEventListener('load', this.loaded);
    }

    Image.prototype.load = function() {
      return this.el.src = this.src;
    };

    Image.prototype.getContent = function() {
      return this.el;
    };

    return Image;

  })(Asset);

}).call(this);
