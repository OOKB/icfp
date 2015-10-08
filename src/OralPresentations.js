import React, { Component } from 'react';

import Presentation from './Presentation';
import Moderator from './Moderator';
import Author from './Author';

// Individual Abstracts
// [Session Number (i.e. 1.1.08)] [Title of Session]
// [time] [Location]

// [Co-Moderator], [Co-moderator]
// [All Author(s)], [Author’s Organization] – repeat per number of co-authors


// Repeat per number of abstracts

class OralPresentations extends Component {
  render() {
    const { sessionCode, sessionName, sessionRoom, sessionStartTime,
            sessionEndTime, sessionChairs, presentations
          } = this.props;
    const timeStr = `${sessionStartTime} - ${sessionEndTime}`;

    return (
      <presentation>
        <sessioncode>{ sessionCode }</sessioncode>
        <sessionname>{ sessionName }</sessionname>
        <starttime>{ timeStr }</starttime>
        <sessionroom>{ sessionRoom }</sessionroom>
        { sessionChairs.map( item => (
          <Moderator key={item.iD} {...item} />
        ))}

        { presentations.map( item => (
          <Presentation key={item.iD} {...item} />
        ))}

      </presentation>
    )
  }
}

export default OralPresentations;
