import React, { Component } from 'react';

import SessionsList from './SessionsList';

class AtAGlance extends Component {
  render() {
    const { sessions, sessionStartTime, sessionEndTime } = this.props;
    const timeStr = `${sessionStartTime} - ${sessionEndTime}`;

    return (
      <ataglance>
        <h3 className="breaker">For the At-A-Glance sections</h3>
        <h3>{timeStr}</h3>

        <div className="sessions-list">
          { sessions.map( item => (
            <SessionsList key={item.sessionCode} {...item} />
          ))}
        </div>
      </ataglance>
    );
  }
}

export default AtAGlance;
