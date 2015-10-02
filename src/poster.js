import React, { Component } from 'react';

import Presentation from './Presentation';

class Poster extends Component {
  render() {
    const { sessionName, sessionStartTime, sessionEndTime, sessionRoom, presentations } = this.props;
    const sessionTime = `${sessionStartTime}-${sessionEndTime}`;

    return (
      <section className="poster-session">

        {/* 1 set of meta-data listings per poster-session */}
        <ul className="meta-data list-reset">
          <li className="posterSession sessionName">
            <h1>{sessionName}</h1>
          </li>
          <li className="time">{sessionTime} </li>
          <li className="location">{sessionRoom}</li>
          {/* <!-- day? --> */}
        </ul>

        { presentations.map( item => <Presentation key={item.orderof+item.iD} {...item} /> ) }

      </section>
    );
  }
}

export default Poster;
