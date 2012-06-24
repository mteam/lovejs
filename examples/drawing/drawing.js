// Generated by CoffeeScript 1.3.3
(function() {
  var curr, last, love, surface;

  love = require('lovejs');

  surface = null;

  last = {
    x: 0,
    y: 0
  };

  curr = {
    x: 0,
    y: 0
  };

  love.load = function() {
    var canvas;
    canvas = document.getElementById('game');
    love.graphics.setCanvas(canvas);
    return surface = love.graphics.newCanvas();
  };

  love.update = function() {
    var _ref, _ref1;
    _ref = [curr.x, curr.y], last.x = _ref[0], last.y = _ref[1];
    return _ref1 = love.mouse.getPosition(), curr.x = _ref1[0], curr.y = _ref1[1], _ref1;
  };

  love.draw = function() {
    love.graphics.setCanvas(surface);
    if (love.mouse.isDown('l')) {
      love.graphics.line(last.x, last.y, curr.x, curr.y);
    }
    love.graphics.setCanvas();
    return love.graphics.draw(surface, 0, 0);
  };

  love.run();

}).call(this);
