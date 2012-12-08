var gr = exports,
    is = require('../helpers').is,
    Image = require('./image'),
    Canvas = require('./canvas');

// --- canvas switching ---

gr._canvas = null;
gr._screen = null;

gr.getCanvas = function() {
  return gr._canvas;
};

gr.setCanvas = function(canvas) {
  gr._canvas = canvas || gr.getScreen();
};

gr.getScreen = function() {
  return gr._screen;
};

gr.setScreen = function(canvas) {
  gr._screen = canvas;
  gr.setCanvas(canvas);
};

// --- helpers ---

function ctx() {
  return gr.getCanvas().context;
}

// --- shapes ---

gr.rectangle = function(mode, x, y, w, h) {
  var fn = ctx()[mode + 'Rect'];

  if (fn == null)
    throw new Error('invalid mode: ' + mode);

  if (!is.number(x) || !is.number(y))
    throw new Error('invalid position: ' + x + ';' + y);

  if (!is.number(w) || !is.number(h))
    throw new Error('invalid dimensions: ' + w + 'x' + h);

  fn.call(ctx(), x, y, w, h);
};

gr.line = function(x1, y1) {
  ctx().moveTo(x1, y1);

  var i = 2,
      x, y;

  while (i < arguments.length) {
    x = arguments[i++];
    y = arguments[i++];

    ctx().lineTo(x, y);
  }

  ctx().stroke();
};

// --- canvas manipulation ---

gr.clear = function() {
  var canvas = gr.getCanvas(),
      width = canvas.getWidth(),
      height = canvas.getHeight();

  ctx().clearRect(0, 0, width, height);
};

// --- drawing objects ---

gr.draw = function(drawable, x, y) {
  if (drawable.draw == null)
    throw new Error('this object can not be drawn');

  drawable.draw(ctx(), x, y);
};

gr.drawRect = function(drawable, rect, x, y) {
  if (drawable.drawRect == null)
    throw new Error('this object can not be drawn with rect');

  drawable.drawRect(ctx(), rect, x, y);
};

// -- factories

gr.newImage = function(source) {
  return new Image(source);
};

gr.newCanvas = function() {
  var a = arguments,
      canvas;

  switch (a.length) {

    case 0:
      canvas = Canvas.clone(gr.getScreen());
      break;

    case 1:
      canvas = Canvas.id(a[0]) || Canvas.element(a[0]);
      break;

    case 2:
      canvas = Canvas.dimensions(a[0], a[1]);
      break;
    
  }

  if (canvas == null)
    throw new Error('invalid arguments');
  
  return canvas;
};
