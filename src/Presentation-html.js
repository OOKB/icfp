import React, { Component } from 'react';

import Author from './Author';

class Presentation extends Component {
  render() {
    const { authors, description, iD } = this.props;
    const { title } = description;
    // const [presenter, ...otherAuthors] = authors;
    // presenter prints out first, presenter with value of "1" in the json indicated they are the presenter

    return (
      <div className="poster">
        <div className="meta-data">
          <p className="posterID">{iD}</p>
          <h2 className="posterTitle">{title}</h2>
          <ul className="authors list-reset">
            { authors.map( item => <Author key={item.contactID} {...item} /> ) }
          </ul>
        </div>
      </div>
    );
  }
}

export default Presentation;
