var $canvas;

exports.getCanvas = function () {
  return $canvas;
};

exports.setCanvas = function (canvas) {
  $canvas = canvas;
};

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

  $canvas[fn](x, y, w, h);
};
