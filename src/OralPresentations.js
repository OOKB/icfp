import React, { Component } from 'react';

import Presentation from './Presentation';

// Individual Abstracts
// [Session Number (i.e. 1.1.08)] [Title of Session]
// [time] [Location]

// [Co-Moderator], [Co-moderator]
// [All Author(s)], [Author’s Organization] – repeat per number of co-authors


// Repeat per number of abstracts

class OralPresentations extends Component {
  render() {
    const { sessionCode, sessionName, sessionRoom, presentations } = this.props;
    return (
      <presentation>
        <sessioncode>{ sessionCode }</sessioncode>
        <sessionname>{ sessionName }</sessionname>
        <sessionroom>{ sessionRoom }</sessionroom>
        <columns>
        {
          presentations.map( (item, i) => {
            return (
              <Presentation key={item.iD} {...item} />
            )
          })
        }
        </columns>
      </presentation>
    )
  }
}

export default OralPresentations;
