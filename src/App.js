import React, { Component } from 'react';

import Poster from './Poster';

export class App extends Component {
  render() {
    const { items } = this.props;
    return (
      <div>
        <h2>sample</h2>
        { items.map( item => <Poster key={item.sessionID} {...item} /> ) }
      </div>
    );
  }
}
