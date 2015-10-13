import React, { Component } from 'react';

class SessionsList extends Component {
  render() {
    const { sessionCode, sessionName, sessionRoom, sessionStartTime, sessionEndTime } = this.props;
    const timeStr = `${sessionStartTime} - ${sessionEndTime}`;

    return (
      <li className="item presentation">
        <sessioncode>{ sessionCode }</sessioncode>
        <sessionname><strong>{ sessionName }</strong></sessionname>
        <sessionroom>{ sessionRoom }</sessionroom>
      </li>
    );
  }
}

export default SessionsList;

// Repeat per number
