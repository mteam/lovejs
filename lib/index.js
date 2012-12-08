var love = exports;

love.assets = require('./assets');
love.graphics = require('./graphics');
love.events = require('./events');
love.helpers = require('./helpers');
love.keyboard = require('./keyboard');
love.mouse = require('./mouse');
love.rect = require('./rect');
love.timer = require('./timer');
love.vector = require('./vector');

love.load = function() {};
love.update = function() {};
love.draw = function() {};

love.run = function() {
  love.mouse.init();
  love.mouse.attach();

  love.keyboard.init();
  love.keyboard.attach();

  love.load();

  love.timer.onTick = function(dt) {
    love.update(dt);
    love.draw();
  };

  love.timer.start();
};
