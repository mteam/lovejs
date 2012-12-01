function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}

function addListener(event, listener) {
  if (this._events[event] == null) {
    this._events[event] = listener;

  } else if (isArray(this._events[event])) {
    this._events[event].push(listener);

  } else {
    this._events[event] = [this._events[event], listener];
  }
}

function removeListener(event, listener) {
  var listeners = this._events[event];

  if (listeners == null) {
    return;

  } else if (isArray(listeners)) {
    var index = listeners.indexOf(listener);

    if (index < 0) {
      return;
    }

    listeners.splice(index, 1);

    if (listeners.length === 1) {
      this._events[event] = listeners[0];
    }

  } else {
    delete this._events[event];
  }
}

function once(event, listener) {
  var self = this;

  function fn() {
    removeListener.call(self, event, fn);
    listener.apply(null, arguments);
  }

  addListener.call(self, event, fn);
}

function trigger(event) {
  var listeners = this._events[event];

  if (listeners == null) {
    return;

  } else if (isArray(listeners)) {
    for (var i = 0; i < listeners.length; i++) {
      call(listeners[i], arguments);
    }

  } else {
    call(listeners, arguments);
  }
}

function call(listener, args) {
  switch (args.length) {
    case 1:
      listener();
      break;
    case 2:
      listener(args[1]);
      break;
    case 3:
      listener(args[1], args[2]);
      break;
    default:
      args = Array.prototype.slice.call(args, 1);
      listener.apply(null, args);
  }
}

exports.extend = function(object) {
  object._events = {};
  object.on = addListener;
  object.once = once;
  object.trigger = trigger;
};
