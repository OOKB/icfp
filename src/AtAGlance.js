import React, { Component } from 'react';

import SessionsList from './SessionsList';

class AtAGlance extends Component {
  render() {
    const { sessions, sessionStartTime, sessionEndTime } = this.props;
    const timeStr = `${sessionStartTime} - ${sessionEndTime}`;

    return (
      <ataglance>
        <h3 class="breaker">For the At-A-Glance sections</h3>
        <h3>{timeStr}</h3>

        <ul class="sessions-list">
          { sessions.map( item => (
            <SessionsList key={item.sessionCode} {...item} />
          ))}
        </ul>
      </ataglance>
    );
  }
}

export default AtAGlance;
