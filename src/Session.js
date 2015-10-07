import React, { Component } from 'react';

import Presentation from './Presentation';

class Session extends Component {
  render() {
    const { sessionName, sessionRoom, presentations, sessionCode } = this.props;

    return (
      <presentation>

        {/* 1 set of meta-data listings per poster-session */}
        <sessionName>{sessionName}</sessionName>
        <sessionRoom>{sessionRoom}</sessionRoom>
        {/* <!-- day? --> */}

        <columns>
          { presentations.map( (item, i) => {
            return (
              <Presentation num={sessionCode} key={sessionCode} {...item} />
            )
          })}
        </columns>

      </presentation>
    );
  }
}

export default Session;
