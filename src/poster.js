import React, { Component } from 'react';

import Presentation from './Presentation';

class Poster extends Component {
  render() {
    const { sessionName, sessionStartTime, sessionEndTime, sessionRoom, presentations } = this.props;
    const sessionTime = `${sessionStartTime}-${sessionEndTime}`;

    return (
      <poster-session>

        {/* 1 set of meta-data listings per poster-session */}
        <sessionName>{sessionName}</sessionName>
        <sessionTime>{sessionTime}</sessionTime>
        <sessionRoom>{sessionRoom}</sessionRoom>
        {/* <!-- day? --> */}

        { presentations.map( item => <Presentation key={item.orderof+item.iD} {...item} /> ) }

      </poster-session>
    );
  }
}

export default Poster;
