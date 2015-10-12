import React, { Component } from 'react';

import TimeSlot from './TimeSlot';
import AtAGlance from './AtAGlance';

class Presentation extends Component {
  render() {
    const { sessionDate, timeSlots } = this.props;
    return (
      <day>
        <h2>{sessionDate}</h2>
        <p>At-a-glance</p>
        {
          timeSlots.map( (item) => {
            const key = item.sessionStartTime + item.sessionEndTime;
            return <AtAGlance key={key} {...item} />;
          })
        }

        <h2>{sessionDate}</h2>
        <p>Full Sessions listing</p>
        {
          timeSlots.map( (item) => {
            const key = item.sessionStartTime + item.sessionEndTime;
            return <TimeSlot key={key} {...item} />;
          })
        }
      </day>
    );
  }
}

export default Presentation;
