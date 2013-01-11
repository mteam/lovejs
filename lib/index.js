var love = exports;

love.animation = require('./animation');
love.assets = require('./assets');
love.cm = require('./cm');
love.collisions = require('./collisions');
love.graphics = require('./graphics');
love.ecs = require('./ecs');
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
    love.graphics.clear();
    love.update(dt);
    love.draw();
  };

  love.timer.start();
};
