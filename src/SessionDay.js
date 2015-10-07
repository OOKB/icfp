import React, { Component } from 'react';

import TimeSlot from './TimeSlot';

class Presentation extends Component {
  render() {
    const { sessionDate, timeSlots } = this.props;
    return (
      <day>
        <h2>{sessionDate}</h2>
        {
          timeSlots.map( (item) => {
            const key = item.sessionStartTime+item.sessionEndTime;
            return <TimeSlot key={key} {...item} />
          })
        }
      </day>
    );
  }
}

export default Presentation;
