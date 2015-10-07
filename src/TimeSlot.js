import React, { Component } from 'react';

import Session from './Session';

class Timeslot extends Component {
  render() {
    const { sessionStartTime, sessionEndTime, sessions } = this.props;
    const timeStr = `${sessionStartTime} - ${sessionEndTime}`;

    return (
      <timeslot>
        <h3>{timeStr}</h3>
        {
          sessions.map( (item, i) => {
            return <Session key={item.sessionCode} num={item.sessionCode} {...item} />
          })
        }
      </timeslot>
    );
  }
}

export default Timeslot;
