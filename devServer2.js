import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.dev';
import cli from 'better-console';
import _ from 'lodash';
import Wreck from 'wreck';
import {camelizeKeys, camelize} from 'humps';
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
const authorIndex = {};

function doTitleize(str) {
  if (str === str.toUpperCase() || str.toLowerCase()) {
    return titleize(str);
  }
  return str;
}
function addAuthor(sessionCode) {
  return ({firstname, lastname}) => {
    const id = firstname + lastname;
    if (authorIndex[id]) {
      authorIndex[id].sessionCodes.push(sessionCode);
    } else {
      authorIndex[id] = {firstname, lastname, sessionCodes: [sessionCode]};
    }
  };
}
function fixAuthor({firstname, lastname, company, presenter}) {
  let companyStr = company;
  if (company.split(' ').length > 1) {
    companyStr = doTitleize(company);
  }
  const auth = {
    company: companyStr,
    firstname: doTitleize(firstname),
    lastname: doTitleize(lastname),
    presenter,
    // ...rest
  };
  return auth;
}

function fixPresentation({orderof, description, authors, ...rest}, i, {sessionType, sessionCode}) {
  const presentation = {...rest, description: {}};
  presentation.authors = authors.map(fixAuthor);
  // Poster authors.
  if (sessionType === 'Poster presentations') {
    presentation.sessionCode = sessionCode.toString() + '.' + orderof.toString();
    _.each(presentation.authors, author => addAuthor('Poster ' + presentation.sessionCode)(author));
  } else {
    _.each(presentation.authors, author => addAuthor(sessionCode)(author));
  }
  // if (description && description.Title) {
  //   presentation.description = {title: doTitleize(description.Title)};
  // }
  _.each(description, desc =>
    presentation.description[camelize(desc.fieldLabel.toLowerCase())] = desc.fieldValue
  );
  // presentation.description = camelizeKeys(presentation.description);
  // if (presentation.description.title) {
  //   presentation.description.title = doTitleize(presentation.description.title);
  // }
  presentation.description = _.pick(presentation.description, 'title');
  if (presentation.authors.length > 1 && presentation.authors[0].presenter !== 1) {
    const presenter = _.remove(presentation.authors, {presenter: 1});
    presentation.authors = presenter.concat(presentation.authors);
  }
  return presentation;
}
function fixDescription(sessionDescription) {
  if (!sessionDescription) {
    return sessionDescription;
  }
  return sanitizeHtml(sessionDescription, {
    allowedTags: [ 'b', 'i', 'em', 'strong', 'p', 'ul', 'li'],
  });
}
function fixDataItem({presentations, sessionDescription, sessionChairs, ...rest}) {
  const newItem = {
    presentations: presentations.map((presentation, i) => fixPresentation(presentation, i, rest)),
    sessionChairs: sessionChairs.map(fixAuthor),
    sessionDescription: fixDescription(sessionDescription),
    ...rest,
  };
  // Add authors to index.
  if (newItem.sessionChairs.length) {
    _.each(newItem.sessionChairs, addAuthor(`<strong>${newItem.sessionCode}</strong>`));
  }

  return newItem;
}

function fetchData(callback) {
  var fullUrl = 'http://www.xcdsystem.com/icfp/admin/program.json';
  if (apiData) {
    cli.log('return cached data');
    callback(apiData);
  } else {
    cli.log('fetch new data');
    Wreck.get(fullUrl, {json: true}, (err, response, payload) => {
      cli.log('transform new data');
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
      apiData.authors = _.sortByAll(_.values(authorIndex), ['lastname', 'firstname']);
      cli.log('return new data');
      callback(apiData);
    });
  }
}
fetchData(() => {return;});
app.get('/api', (req, res) => {
  if (apiData) {
    cli.log('return cached data');
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
    cli.log(err);
    return;
  }
  cli.log('Listening at http://localhost:' + port);
});
