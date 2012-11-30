var last,
    paused = true,
    timeout;

function schedule(fn) {
  if (paused) return;
  timeout = setTimeout(fn, 1000 / 60);
}

function unschedule() {
  clearTimeout(timeout);
}

exports.start = function() {
  last = Date.now();
  paused = false;
  schedule(step);
};

function step() {
  var now = Date.now(),
      dt = now - last;

  last = now;

  exports.onTick(dt);
  schedule(step);
};

exports.pause = function() {
  paused = true;
  unschedule();
};

exports.onTick = function() {};
