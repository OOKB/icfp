import React, { Component } from 'react';

import Poster from './Poster';

export class App extends Component {
  render() {
    const { items } = this.props;
    return (
      <div>
        <h1>Platen: HTML»Print demo</h1>
        <h2>International Conference on Family Planning.</h2>
        { items.map( (item, i) => <Poster key={item.sessionID} num={i+1} {...item} /> ) }
      </div>
    );
  }
}
