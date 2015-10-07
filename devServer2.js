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

function doTitleize(str) {
  if (str === str.toUpperCase() || str.toLowerCase()) {
    return titleize(str);
  }
  else {
    return str;
  }
}

function fixDataItem(item) {
  item.presentations = item.presentations.map((presentation) => {
    const description = {};
    _.each(presentation.description, desc =>
      description[desc.fieldLabel.toLowerCase()] = desc.fieldValue
    )
    presentation.description = camelizeKeys(description);
    if (presentation.description.title) {
      presentation.description.title = doTitleize(presentation.description.title);
    }
    presentation.authors = presentation.authors.map((author) => {
      const { firstname, lastname, company, ...rest } = author;
      let companyStr = company;
      if (company.split(' ').length > 1) {
        companyStr = doTitleize(company);
      }
      return {
        company: companyStr,
        firstname: doTitleize(firstname),
        lastname: doTitleize(lastname),
        ...rest
      }
    });
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
      const items = _.map(camelizeKeys(payload), fixDataItem);
      apiData = {
        posters: _.remove(items, {sessionType: 'Poster presentations'}),
        sessions: items,
        // sessions: _.filter(items, (item) => {
        //   return (item.sessionType === 'Oral Presentations' || item.sessionType === 'Preformed Panel')
        // })
      }
      apiData.sessions = _.groupBy(apiData.sessions, 'sessionDate');
      const days = [];
      _.each(_.keys(apiData.sessions), (sessionDate) => {
        days.push({
          sessionDate,
          timeSlots: _.map(_.groupBy(apiData.sessions[sessionDate], 'sessionStartTime'), (sessions) => {
            return {
              sessionStartTime: sessions[0].sessionStartTime,
              sessionEndTime: sessions[0].sessionEndTime,
              sessions: _.map(sessions, (session) => {
                if (session.presentations.length) {
                  session.authors = _.flatten(_.pluck(session.presentations, 'authors'));
                }
                return session;
              })
            }
          })
        });
      });
      apiData.sessions = days;

      console.log('return new data');
      cb(apiData);
    })
  }
}
fetchData((data) => {return});
app.get('/api', function(req, res) {
  if (apiData) {
    console.log('return cached data');
    res.send(apiData);
  }
  else {
    res.send({error: true});
  }
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
