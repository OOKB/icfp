import React, { Component } from 'react';

<!--
// Poster
// [poster session] [time] [location]
// [Poster ID]: [Poster Title]
// [Presenter], [Presenter’s Organization]
// [Co-author(s)], [Co-author’s Organization] – repeated per number of co-authors

class Poster extends Component {
  render() {
    { SessionName, SessionStartTime, SessionRoom, Presentations } = this.props;

    return (
      <section class="poster-session">

        {/* 1 set of meta-data listings per poster-session */}
        <ul class="meta-data">
          <li class="posterSession"><h1>{SessionName}</h1></li>
          <li class="time">{SessionStartTime}</li>
          <li class="location">{SessionRoom}</li>
          {/* <!-- day? --> */}
        </ul>

      </section>
    );
  }
}

default export Poster;
