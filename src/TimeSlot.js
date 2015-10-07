import React, { Component } from 'react';

import PerformedPanel from './PerformedPanel';
import OralPresentations from './OralPresentations';

class Timeslot extends Component {
  render() {
    const { sessionStartTime, sessionEndTime, sessions } = this.props;
    const timeStr = `${sessionStartTime} - ${sessionEndTime}`;

    return (
      <timeslot>
        <h3>{timeStr}</h3>
        {
          sessions.map( (item, i) => {
            if (item.sessionType === 'Preformed Panel') {
              return <PerformedPanel key={item.sessionCode} {...item} />
            }
            else {
              return <OralPresentations key={item.sessionCode} {...item} />
            }
          })
        }
      </timeslot>
    );
  }
}

export default Timeslot;
