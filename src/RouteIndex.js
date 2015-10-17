import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class RouteIndex extends Component {

  static propTypes = {
    routes: PropTypes.object,
  }

  render() {
    const pages = this.props.routes[0].childRoutes;
    return (
      <div>
        <h2>Route Index</h2>
        <p>It will take a second or two to load these pages. They are huge.</p>
        <ul>
          {
            pages.map( route => (
              <li key={route.path}>
                <Link to={'/' + route.path}>{route.path}</Link>
              </li>
            ))
          }
        </ul>
        <pre>{ /* JSON.stringify(this.props, null, 2) */ }</pre>
      </div>
    );
  }
}
