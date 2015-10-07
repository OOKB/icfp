import React, { Component } from 'react';
// Individual Abstracts
// [Session Number (i.e. 1.1.08)] [Title of Session]
// [time] [Location]
// [Co-Moderator], [Co-moderator]
// [All Author(s)], [Author’s Organization] – repeat per number of co-authors
// Abstract 1 [Title]
// [Presenter], [Presenter’s Organization]
// [Author(s)], [Co-author’s Organization] – repeated per number of co-authors
// Abstract 2 [Title]
// [Presenter], [Presenter’s Organization]
// [Author(s)], [Author’s Organization] – repeated per number of co-authors
// Repeat per number of abstracts

class OralPresentations extends Component {
  render() {
    const { sessionCode, sessionName, sessionRoom } = this.props;
    return (
      <presentation>
        <sessionCode>{ sessionCode }</sessionCode>
        <sessionName>{ sessionName }</sessionName>
        <sessionRoom>{ sessionRoom }</sessionRoom>
      </presentation>
    )
  }
}

export default OralPresentations;
