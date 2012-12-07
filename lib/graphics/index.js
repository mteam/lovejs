var Image = require('./image');

var $canvas;

exports.use = function(canvas) {
  $canvas = canvas;
};

function ctx() {
  return $canvas.context;
}

function isNum(obj) {
  return !(
   obj == null || // is undefined or null
   obj !== obj || // is NaN
   obj === Infinity
  );
}

var rectFns = {
  fill: 'fillRect',
  line: 'strokeRect'
};

exports.rectangle = function (mode, x, y, w, h) {
  var fn = rectFns[mode];

  if (fn == null)
    throw new Error('invalid mode: ' + mode);

  if (!isNum(x) || !isNum(y))
    throw new Error('invalid position: ' + x + ';' + y);

  if (!isNum(w) || !isNum(h))
    throw new Error('invalid dimensions: ' + w + 'x' + h);

  ctx()[fn](x, y, w, h);
};

exports.clear = function () {
  var width = $canvas.getWidth();
  var height = $canvas.getHeight();

  ctx().clearRect(0, 0, width, height);
};

exports.draw = function(drawable, x, y) {
  drawable.draw(ctx(), x, y);
};

exports.drawRect = function(drawable, rect, x, y) {
  drawable.drawRect(ctx(), rect, x, y);
};

exports.newImage = function(source) {
  return new Image(source);
};
