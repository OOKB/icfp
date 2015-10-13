import React from 'react';
import { App } from './App';
import 'isomorphic-fetch';

const fullUrl = '/api';

// const TYPE = 'sessions';
const TYPE = 'authors';

fetch(fullUrl)
  .then(response =>
    response.json().then(json => ({ json, response }))
  )
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    React.render(<App items={json[TYPE]} type={TYPE} />, document.getElementById('root'));
  });
