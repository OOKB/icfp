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
    const { authors, sessionCode, sessionName, sessionRoom, sessionStartTime, presentations } = this.props;
    return (
      <presentation>
        <sessionCode>{ sessionCode }</sessionCode>
        <sessionName>{ sessionName }</sessionName>
        <starttime>{ sessionStartTime }</starttime>
        <sessionRoom>{ sessionRoom }</sessionRoom>
        <authors>
          { authors.map( item => <Author key={item.contactID} {...item} /> ) }
        </authors>
        <columns>
        {
          presentations.map( (item, i) => {
            return (
              <Presentation key={item.iD} {...item} />
            )
          })
        }
        </columns>
      </presentation>
    )
  }
}

export default PerformedPanel;
