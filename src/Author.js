import React, { Component } from 'react';

class Author extends Component {
  render() {
    const { firstname, lastname, company, presenter, sessionCodes, tagName, ...other } = this.props;
    let element = tagName;
    // If no tagName defined we base it off the presenter value.
    if (!tagName) {
      if (presenter) {
        element = 'presenter';
      } else {
        element = 'author';
      }
    }

    let fullName = `${firstname} ${lastname}`;
    if (sessionCodes) {
      fullName = `${lastname}, ${firstname}`;
    }
    const separator = ', ';
    // Define the insides of the component.
    const DetailsEl = (
      <person>
        <fullname>{fullName}</fullname>
        { separator }
        { company ? <company>{ company }</company> : false }
        { sessionCodes ? <code dangerouslySetInnerHTML={{__html: sessionCodes}}  /> : false }
      </person>
    );
    // Use function call instead of jsx to use computed tag name.
    return React.createElement(element, other, DetailsEl);
  }
}

export default Author;
