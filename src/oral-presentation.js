import React, { Component } from 'react';

import Presentation from './Presentation';

class Oralpresentation extends Component {
  render() {
    const { sessionName, sessionStartTime, sessionRoom, presentations } = this.props;



    return (
      <section className="oral-presentation">

        {/* 1 set of meta-data listings per poster-session */}
        <ul className="meta-data">
          <li className="sessionName">
            <h1>{sessionName}</h1>
          </li>
          <li className="time">{sessionStartTime}</li>
          <li className="location">{sessionRoom}</li>
          <li>Moderators, but I do not know where this data comes from</li>
          {/* <!-- day? --> */}
        </ul>

        { presentations.map( item => <Presentation key={item.orderof+item.iD} {...item} /> ) }

      </section>
    );
  }
}

export default Oralpresentation;
