import React, { Component } from 'react';

import Author from './Author';

class Presentation extends Component {
  render() {
    const { authors, description, num } = this.props;
    const { title } = description;
    // const [presenter, ...otherAuthors] = authors;
    // presenter prints out first, presenter with value of "1" in the json indicated they are the presenter

    return (
      <poster>
        { num ? <sessionCode>{num}</sessionCode> : false }
        <postertitle>{title}</postertitle>
        <authors>
          { authors.map( item => <Author key={item.contactID} {...item} /> ) }
        </authors>
      </poster>
    );
  }
}

export default Presentation;
