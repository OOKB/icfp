import React, { Component } from 'react';
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
    const { sessionCode, sessionName, sessionRoom } = this.props;
    return (
      <presentation>
        <sessionCode>{ sessionCode }</sessionCode>
        <sessionName>{ sessionName }</sessionName>
        <sessionRoom>{ sessionRoom }</sessionRoom>
      </presentation>
    )
  }
}

export default PerformedPanel;
