import path from 'path';
import Express from 'express';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.dev';

import Wreck from 'wreck';
import {camelizeKeys} from 'humps';

let apiData = null;

var app = Express();
var port = 3000;
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use(Express.static('public'));

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

app.listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }
  else {
    console.log('Listening at http://localhost:'+port);
  }
});
