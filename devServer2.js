import path from 'path';
import Express from 'express';
import _ from 'lodash';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.dev';

import Wreck from 'wreck';
import {camelizeKeys} from 'humps';

// import { App } from './src/App';

const app = Express();
const port = 3000;

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use(Express.static('public'));

let apiData = null;

function fixDataItem(item) {
  item.presentations = item.presentations.map((presentation) => {
    const description = {};
    _.each(presentation.description, desc =>
      description[desc.fieldLabel.toLowerCase()] = desc.fieldValue
    )
    presentation.description = camelizeKeys(description);
    return presentation;
  })
  return item;
}

function fetchData(cb) {
  var fullUrl = 'http://www.xcdsystem.com/icfp/admin/program.json';
  if (apiData) {
    console.log('return cached data');
    cb(apiData);
  }
  else {
    console.log('fetch new data');
    Wreck.get(fullUrl, {json: true}, (err, response, payload) => {
      console.log('transform new data');
      apiData = _.map(camelizeKeys(payload), fixDataItem);
      console.log('return new data');
      cb(apiData);
    })
  }
}
fetchData((data) => {return});
app.get('/api', function(req, res) {
  fetchData((data) => res.send(data));
});

// app.get('/render', function(req, res) {
//   fetchData( items => {
//     const html = React.renderToString(<App items={items} />);
//     res.send(html);
//   })
// });

app.listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }
  else {
    console.log('Listening at http://localhost:'+port);
  }
});
