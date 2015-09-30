import React, { Component } from 'react';

import Presentation from './Presentation';

class Poster extends Component {
  render() {
    const { sessionName, sessionStartTime, sessionRoom, presentations } = this.props;

    return (
      <section className="poster-session">

        {/* 1 set of meta-data listings per poster-session */}
        <ul className="meta-data">
          <li className="posterSession">
            <h1>{sessionName}</h1>
          </li>
          <li className="time">{sessionStartTime}</li>
          <li className="location">{sessionRoom}</li>
          {/* <!-- day? --> */}
        </ul>

        { presentations.map( item => <Presentation key={item.iD} {...item} /> ) }

      </section>
    );
  }
}

export default Poster;
