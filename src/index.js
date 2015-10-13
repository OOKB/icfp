import React from 'react';
import { Router, Route } from 'react-router';

import App from './App';
import Apps from './Apps';
import Authors from './Authors';

import 'isomorphic-fetch';

const fullUrl = '/api';

fetch(fullUrl)
  .then(response =>
    response.json().then(json => ({ json, response }))
  )
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    React.render(
      <Router>
        <Route path="/" component={App} items={'kai'}>
          <Route path="posters" component={Apps} items={json.posters} type="posters" />
          <Route path="sessions" component={Apps} items={json.sessions} type="sessions" />
          <Route path="other" component={Apps} items={json.sessions} type="other" />
          <Route path="authors" component={Authors} authors={json.authors} />
        </Route>
      </Router>,
      document.getElementById('root')
    );
  });

// <App items={json[TYPE]} type={TYPE} />, document.getElementById('root')
