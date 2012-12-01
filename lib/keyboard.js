var kb = exports,
    events = require('./events');

kb.init = function() {
  window.addEventListener('keydown', kb.down);
  window.addEventListener('keyup', kb.up);
};

events.extend(kb);

kb.pressed = {};

kb.down = function(event) {
  var code = event.keyCode,
      key = names[code] || code;

  if (!kb.pressed[key]) {
    kb.pressed[key] = true;
    kb.trigger('pressed', key, code);
  }
};

kb.up = function(event) {
  var code = event.keyCode,
      key = names[code] || code;

  if (kb.pressed[key]) {
    kb.pressed[key] = false;
    kb.trigger('released', key, code);
  }
};

kb.isDown = function(key) {
  return !!kb.pressed[key];
};

// --- key names ---

var names = {
  8: 'backspace',     37: 'left',       186: ';',
  9: 'tab',           38: 'up',         187: '=',
  13: 'return',       39: 'right',      188: ',',
  16: 'shift',        40: 'down',       189: '-',
  17: 'ctrl',         45: 'insert',     190: '.',
  18: 'alt',          46: 'delete',     191: '/',
  20: 'capslock',     91: 'meta',       192: '`',
  27: 'esc',          93: 'menu',       219: '[',
  32: ' ',            106: 'kp*',       220: '\\',
  33: 'pageup',       107: 'kp+',       221: ']',
  34: 'pagedown',     109: 'kp-',       222: '\'',
  35: 'end',          110: 'kp.',
  36: 'home',         111: 'kp/'
};

// a-z
var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
for (var i = 0; i < letters.length; i++) {
  names[i + 65] = letters[i];
}

// numbers
for (var j = 0; j <= 9; j++) {
  names[j + 48] = '' + j;
  names[j + 96] = 'kp' + j;
}

// fn keys
for (var k = 0; k <= 12; k++) {
  names[k + 111] = 'f' + k;
}
