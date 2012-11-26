var mallow = require('mallow'),
    express = require('express');

var base = __dirname + '/../../';

var love = mallow.package('love')
  .directory(base)
  .include('{lib,test/{all,browser}}/**/*.js')
  .main('lib/index');

var sham = mallow.package('sham')
  .directory(base + 'node_modules/sham')
  .include('index.js')
  .main('index');

var expect = mallow.package('expect.js')
  .directory(base + 'node_modules/expect.js')
  .include('expect.js')
  .main('expect');

var app = express();



app.use(express.static(__dirname + '/public'));

app.get('/love.js', function(req, res) {
  res.type('js');
  
  mallow.compile(love, sham, expect).then(function(output) {
    res.end(output);
  });
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Run tests at http://localhost:' + port);
