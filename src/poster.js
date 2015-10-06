import React, { Component } from 'react';

import Presentation from './Presentation';

class Poster extends Component {
  render() {
    const { sessionName, sessionStartTime, sessionEndTime, sessionRoom, presentations, num } = this.props;
    const sessionTime = `${sessionStartTime}-${sessionEndTime}`;

    return (
      <poster-session>

        {/* 1 set of meta-data listings per poster-session */}
        <sessionName>{sessionName}</sessionName>
        <sessionTime>{sessionTime}</sessionTime>
        <sessionRoom>{sessionRoom}</sessionRoom>
        {/* <!-- day? --> */}

        <columns>
          { presentations.map( (item, i) => {
            const presNum = `${num}.${i+1}`;
            return (
              <Presentation num={presNum} key={presNum} {...item} />
            )
          })}
        </columns>

      </poster-session>
    );
  }
}

export default Poster;
