(function() {
  var circles, cursor, drawCursor;

  cursor = {
    x: 50,
    y: 50,
    image: null
  };

  circles = [];

  love.load = function() {
    love.graphics.ctx.lineWidth = 3;
    return cursor.image = love.assets.newImage('files/face.png');
  };

  love.update = function(dt) {
    cursor.x = love.mouse.getX();
    return cursor.y = love.mouse.getY();
  };

  drawCursor = function(x, y) {
    return love.graphics.draw(cursor.image, x, y);
  };

  love.draw = function() {
    var circle, _i, _len;
    for (_i = 0, _len = circles.length; _i < _len; _i++) {
      circle = circles[_i];
      drawCursor(circle.x, circle.y);
    }
    return drawCursor(cursor.x, cursor.y);
  };

  love.mouseDown = function(key, x, y) {
    return circles.push({
      x: x,
      y: y
    });
  };

  $(function() {
    var canvas;
    canvas = $('#game');
    love.init({
      element: canvas
    });
    return love.run();
  });

}).call(this);
