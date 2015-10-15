import React, { Component, PropTypes } from 'react';

import Presentation from './Presentation';

class Poster extends Component {
  render() {
    const { sessionName, sessionStartTime, sessionEndTime, sessionRoom, presentations } = this.props;
    const sessionTime = `${sessionStartTime}-${sessionEndTime}`;

    return (
      <poster-session>

        {/* 1 set of meta-data listings per poster-session */}
        <sessionName>{sessionName}</sessionName>
        <sessionTime>{sessionTime}</sessionTime>
        <sessionRoom>{sessionRoom}</sessionRoom>
        {/* <!-- day? --> */}

        <columns>
          { presentations.map( item => (
              <Presentation key={item.id} {...item} />
          ))}
        </columns>

      </poster-session>
    );
  }
}
Poster.propTypes = {
  sessionName: PropTypes.string.isRequired,
  sessionStartTime: PropTypes.string.isRequired,
  sessionEndTime: PropTypes.string.isRequired,
  sessionRoom: PropTypes.string.isRequired,
  presentations: PropTypes.array.isRequired,
};
export default Poster;
