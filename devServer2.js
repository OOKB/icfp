import path from 'path';
import Express from 'express';
import _ from 'lodash';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.dev';

import Wreck from 'wreck';
import {camelizeKeys} from 'humps';
import {titleize} from 'inflection';

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

function isUpperCase(str) {
  return str === str.toUpperCase();
}

function fixDataItem(item) {
  item.presentations = item.presentations.map((presentation) => {
    const description = {};
    _.each(presentation.description, desc =>
      description[desc.fieldLabel.toLowerCase()] = desc.fieldValue
    )
    presentation.description = camelizeKeys(description);
    if (presentation.description.title) {
      let presentationTitle = presentation.description.title;
      if (isUpperCase(presentationTitle)) {
        presentationTitle = titleize(presentationTitle);
      }
      presentation.description.title = presentationTitle;
    }
    presentation.authors = presentation.authors.map((author) => {
      const { firstname, lastname, company, ...rest } = author;
      let companyStr = company;
      if (company.split(' ').length > 1 && isUpperCase(company)) {
        companyStr = titleize(company);
      }
      return {
        company: companyStr,
        firstname: titleize(firstname),
        lastname: titleize(lastname),
        ...rest
      }
    })
    if (presentation.authors.length > 1 && presentation.authors[0].presenter !== 1) {
      const presenter = _.remove(presentation.authors, {presenter: 1})
      presentation.authors = presenter.concat(presentation.authors);
    }
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
