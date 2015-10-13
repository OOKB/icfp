import React, { Component, PropTypes } from 'react';

import Poster from './Poster';
import SessionDay from './SessionDay';
import SessionDayReview from './SessionDayReview';

class Apps extends Component {
  render() {
    const { items, type } = this.props.route;
    let ItemTemplate = SessionDay;
    let keyFieldId = 'sessionDate';

    if (type === 'posters') {
      ItemTemplate = Poster;
      keyFieldId = 'sessionID';
    } else if (type === 'other') {
      ItemTemplate = SessionDayReview;
    }

    return (
      <div id={'type-' + type}>
        { items.map( (item, i) => <ItemTemplate key={item[keyFieldId]} num={i + 1} {...item} /> ) }
      </div>
    );
  }
}
Apps.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Apps;
