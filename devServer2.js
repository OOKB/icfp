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
  // If the string is empty or false return it.
  if (!str) return str;
  // Cast every value to a string type.
  const _str = str.toString();
  // Titleize if all lower or all upper.
  if (_str === _str.toUpperCase() || _str === _str.toLowerCase()) {
    return titleize(_str);
  }
  return _str;
}
function addAuthor(sessionCode) {
  return ({firstname, lastname, presenter}) => {
    const id = firstname + lastname;
    const sessCode = presenter ? `<strong>${sessionCode}</strong>` : sessionCode;
    if (authorIndex[id]) {
      authorIndex[id].sessionCodes.push(sessCode);
    } else {
      authorIndex[id] = {firstname, lastname, sessionCodes: [sessCode]};
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

function fixPanelDescription(description) {
  const panelPresentationIndex = {};
  function addPanelIndex(matches, fieldId, value) {
    if (matches) {
      const index = parseInt(matches[1], 10);
      if (!panelPresentationIndex[index]) {
        panelPresentationIndex[index] = {index};
      }
      panelPresentationIndex[index][fieldId] = value;
    }
  }
  _.each(description, (value, key) => {
    const isTitle = key.match(/^presentation([1-9][0-9]?)Title$/);
    addPanelIndex(isTitle, 'title', value);
    const isPresenter = key.match(/^presenterOfPresentation([1-9][0-9]?)/);
    addPanelIndex(isPresenter, 'presenter', value);
  });
  return _.values(panelPresentationIndex);
}
function fixPresentation({orderof, description, authors, ...rest}, i, {sessionType, sessionCode}) {
  const presentation = {...rest, description: {}};
  presentation.authors = authors.map(auth =>
    fixAuthor({
      ...auth,
      presenter: sessionType === 'Preformed Panel' ? undefined : auth.presenter,
    })
  );
  // Fix description fields.
  _.each(description, desc =>
    presentation.description[camelize(desc.fieldLabel.toLowerCase())] = desc.fieldValue
  );
  if (presentation.description.title) {
    presentation.description.title = doTitleize(presentation.description.title);
  }

  // Poster authors.
  if (sessionType === 'Poster presentations') {
    const idParts = presentation.iD.toString().split('.');
    presentation.id = idParts[0] + '.' + _.padRight(idParts[1], 2, '0');
    delete presentation.iD;
    _.each(presentation.authors, author => addAuthor('Poster ' + presentation.id)(author));
    presentation.description = _.pick(presentation.description, 'title');
  } else if (sessionType === 'Oral presentations' || sessionType === 'IBP Interactive session') {
    _.each(presentation.authors, author => addAuthor(sessionCode)(author));
    presentation.description = _.pick(presentation.description, 'title');
  } else if (sessionType === 'Preformed Panel') {
    presentation.panelPresentations = fixPanelDescription(presentation.description);
    presentation.description = {};
    _.each(presentation.authors, author => addAuthor(sessionCode)(author));
  } else {
    cli.error(sessionType);
  }
  // if (description && description.Title) {
  //   presentation.description = {title: doTitleize(description.Title)};
  // }

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
    _.each(newItem.sessionChairs, addAuthor(`<em>${newItem.sessionCode}</em>`));
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
