import React, { Component } from 'react';

import Presentation from './Presentation';
import Author from './Author';

class PerformedPanel extends Component {
  render() {
    const { sessionCode, sessionName, sessionRoom, sessionStartTime, sessionEndTime,
            sessionDescription, sessionChairs, presentations, sessionType
          } = this.props;
    const timeStr = `${sessionStartTime} - ${sessionEndTime}`;

    let DescriptionEl = false;
    if (sessionDescription) {
      DescriptionEl =
        <description dangerouslySetInnerHTML={{__html: sessionDescription}} />;
    }

    return (
      <presentation>
        <span className="session-type">{ sessionType }</span>
        <sessioncode>{ sessionCode }</sessioncode>
        <sessionname>{ sessionName }</sessionname>
        <starttime>{ timeStr }</starttime>
        <sessionroom>{ sessionRoom }</sessionroom>

        { DescriptionEl }

        { sessionChairs.map( item => (
          <Author key={item.iD} tagName="moderator" {...item} />
        ))}

        { presentations.map( item => (
          <Presentation key={item.iD} {...item} />
        ))}

      </presentation>
    );
  }
}

export default PerformedPanel;

// Preformed Panel
// [Session Number (i.e. 1.1.08)] [Title of Preformed Panel]
// [time] [Location]
// [Moderator]
// [All Presenter/Author(s)]

// [Presentation 1 Title]
// [Presenter of Presentation 1] – should include their organization

// i.e.: Marianne Amoss, Gates Institute;
// [Presentation 2 Title]
// [Presenter of Presentation 2]

// - - - - -

// Individual Abstracts
// [Session Number (i.e. 1.1.08)] [Title of Session]
// [time] [Location]

// [Co-Moderator], [Co-moderator]
// [All Author(s)], [Author’s Organization] – repeat per number of co-authors


// Repeat per number of abstracts
