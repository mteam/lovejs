var mouse = exports,
    events = require('./events');

// --- setup ---

var position;
var pressed;

mouse.init = function() {
  events.extend(mouse);
  position = {x: null, y: null};
  pressed = {};
};

mouse.attach = function() {  
  window.addEventListener('mousemove', mouse.move);
  window.addEventListener('mousedown', mouse.down);
  window.addEventListener('mouseup', mouse.up);
  window.addEventListener('mousewheel', mouse.wheel);
  window.addEventListener('DOMMouseScroll', mouse.scroll);
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
  0: 'left',
  1: 'middle',
  2: 'right'
};
