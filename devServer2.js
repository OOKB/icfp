import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.dev';

import _ from 'lodash';
import Wreck from 'wreck';
import {camelizeKeys} from 'humps';
import {titleize} from 'inflection';
import sanitizeHtml from 'sanitize-html';

// import { App } from './src/App';

const app = express();
const port = 3000;

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static('public'));

let apiData = null;
const authorList = [];

function doTitleize(str) {
  if (str === str.toUpperCase() || str.toLowerCase()) {
    return titleize(str);
  }
  return str;
}

function fixAuthor({firstname, lastname, company}) {
  let companyStr = company;
  if (company.split(' ').length > 1) {
    companyStr = doTitleize(company);
  }
  const auth = {
    company: companyStr,
    firstname: doTitleize(firstname),
    lastname: doTitleize(lastname),
    // ...rest
  };
  authorList.push(auth);
  return auth;
}

function fixDataItem(item) {
  item.presentations = item.presentations.map((presentation) => {
    const description = {};
    _.each(presentation.description, desc =>
      description[desc.fieldLabel.toLowerCase()] = desc.fieldValue
    );
    presentation.description = camelizeKeys(description);
    if (presentation.description.title) {
      presentation.description.title = doTitleize(presentation.description.title);
    }
    presentation.authors = presentation.authors.map(fixAuthor);
    if (presentation.authors.length > 1 && presentation.authors[0].presenter !== 1) {
      const presenter = _.remove(presentation.authors, {presenter: 1});
      presentation.authors = presenter.concat(presentation.authors);
    }
    return presentation;
  });
  item.sessionChairs = item.sessionChairs.map(fixAuthor);
  return item;
}

function fetchData(callback) {
  var fullUrl = 'http://www.xcdsystem.com/icfp/admin/program.json';
  if (apiData) {
    console.log('return cached data');
    callback(apiData);
  } else {
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
      };
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
                if (session.sessionDescription) {
                  session.sessionDescription = sanitizeHtml(session.sessionDescription, {
                    allowedTags: [ 'b', 'i', 'em', 'strong', 'p', 'ul', 'li'],
                  });
                }
                return session;
              }),
            };
          }),
        });
      });
      apiData.sessions = days;

      console.log('return new data');
      callback(apiData);
    });
  }
}
fetchData(() => {return;});
app.get('/api', (req, res) => {
  if (apiData) {
    console.log('return cached data');
    res.send(apiData);
  } else {
    res.send({error: true, msg: 'data not ready yet'});
  }
});

// app.get('/render', function(req, res) {
//   fetchData( items => {
//     const html = React.renderToString(<App items={items} />);
//     res.send(html);
//   })
// });

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:'+port);
});
