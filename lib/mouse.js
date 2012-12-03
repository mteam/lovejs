var mouse = exports,
    events = require('./events');

// --- setup ---

events.extend(mouse);

mouse.init = function() {
  window.addEventListener('mousemove', mouse.move);
  window.addEventListener('mousedown', mouse.down);
  window.addEventListener('mouseup', mouse.up);
  window.addEventListener('mousewheel', mouse.wheel);
  window.addEventListener('DOMMouseScroll', mouse.scroll);

  mouse._reset();
};

var position;
var pressed;

mouse._reset = function() {
  position = {x: null, y: null};
  pressed = {};
};

// --- events handling ---

mouse.move = function(event) {
  updatePosition(event);
  mouse.trigger('moved');
};

mouse.down = function(event) {
  updatePosition(event);

  var code = event.button,
      button = names[code] || code;

  if (!pressed[button]) {
    pressed[button] = true;
    mouse.trigger('pressed', button, mouse.getX(), mouse.getY());
  }
};

mouse.up = function(event) {
  updatePosition(event);

  var code = event.button,
      button = names[code] || code;

  if (pressed[button]) {
    pressed[button] = false;
    mouse.trigger('released', button, mouse.getX(), mouse.getY());
  }
};

mouse.wheel = function(event) {
  if (event.wheelDelta > 0) {
    mouse.trigger('pressed', 'up');
  } else {
    mouse.trigger('pressed', 'down');
  }
};

mouse.scroll = function(event) {
  if (event.detail < 0) {
    mouse.trigger('pressed', 'up');
  } else {
    mouse.trigger('pressed', 'down');
  }
};

function updatePosition(event) {
  position.x = event.clientX;
  position.y = event.clientY;
}

// ---

mouse.getPosition = function() {
  return position;
};

mouse.getX = function() {
  return position.x;
};

mouse.getY = function() {
  return position.y;
};

mouse.isDown = function(button) {
  return !!pressed[button];
};

// --- button names ---

var names = {
  1: 'left',
  2: 'middle',
  3: 'right'
};
