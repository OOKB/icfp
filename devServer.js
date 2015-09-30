var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var Wreck = require('wreck');
var Humps = require('humps');
var camelizeKeys = Humps.camelizeKeys;
var apiData = null;

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('public'));

app.get('/api', function(req, res) {
  var fullUrl = 'http://www.xcdsystem.com/icfp/admin/program.json';
  if (apiData) {
    console.log('return cached data');
    res.send(apiData);
  }
  else {
    console.log('fetch new data');
    Wreck.get(fullUrl, {json: true}, (err, response, payload) => {
      console.log('transform new data');
      apiData = camelizeKeys(payload);
      console.log('return new data');
      res.send(apiData);
    })
  }
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
