import React from 'react';
import { App } from './App';
import 'isomorphic-fetch';
import {where} from 'lodash';
const fullUrl = '/api';

fetch(fullUrl)
  .then(response =>
    response.json().then(json => ({ json, response }))
  )
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    const items = where(json, {sessionType: 'Poster presentations'});
    console.log('render');
    React.render(<App items={items}/>, document.getElementById('root'));
  });
