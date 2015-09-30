import React from 'react';
import { App } from './App';
import 'isomorphic-fetch';
import { camelizeKeys } from 'humps';

const fullUrl = '/api';

fetch(fullUrl)
  .then(response =>
    response.json().then(json => ({ json, response }))
  )
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    const data = camelizeKeys(json);
    console.log(data[0]);
  });


React.render(<App />, document.getElementById('root'));
