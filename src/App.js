import React, { Component } from 'react';

import Poster from './Poster';
import SessionDay from './SessionDay';

export class App extends Component {
  render() {
    const { items, type } = this.props;
    let ItemTemplate = SessionDay;
    let keyFieldId = 'sessionDate';

    if (type === 'posters') {
      ItemTemplate = Poster;
      keyFieldId = 'sessionID'
    }

    return (
      <div id={'type-'+type}>
        <h1>Platen: HTML»Print demo</h1>
        <h2>International Conference on Family Planning.</h2>

        { items.map( (item, i) => <ItemTemplate key={item[keyFieldId]} num={i+1} {...item} /> ) }
      </div>
    );
  }
}
