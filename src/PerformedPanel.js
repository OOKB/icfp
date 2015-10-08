import React, { Component } from 'react';

import Presentation from './Presentation';
import Author from './Author';

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

class PerformedPanel extends Component {
  render() {
    const { sessionCode, sessionName, sessionRoom, sessionStartTime, sessionEndTime, sessionDescription, moderatorOfPanel, presentations } = this.props;
    const timeStr = `${sessionStartTime} - ${sessionEndTime}`;

    return (
      <presentation>
        <sessionCode>{ sessionCode }</sessionCode>
        <sessionName>{ sessionName }</sessionName>
        <starttime>{ timeStr }</starttime>
        <sessionRoom>{ sessionRoom }</sessionRoom>
        <description dangerouslySetInnerHTML={{__html: sessionDescription}} />
        <moderator>{ moderatorOfPanel }</moderator>

        {
          presentations.map( (item, i) => {
            return (
              <Presentation key={item.iD} {...item} />
            )
          })
        }

      </presentation>
    )
  }
}

export default PerformedPanel;
