import React, { Component } from 'react';

class SessionsList extends Component {
  render() {
    const { sessionCode, sessionName, sessionRoom, sessionStartTime, sessionEndTime } = this.props;
    const timeStr = `${sessionStartTime} - ${sessionEndTime}`;
    const separator = `\u0009`;

    return (
      <div className="item presentation">
        <sessioncode>{ sessionCode }</sessioncode>
        { separator }
        <sessionname><strong>{ sessionName }</strong></sessionname>
        { separator }
        <sessionroom>{ sessionRoom }</sessionroom>
      </div>
    );
  }
}

export default SessionsList;

// Repeat per number
