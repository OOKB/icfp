import React, { Component } from 'react';

class Author extends Component {
  render() {
    const { firstname, lastname, company, presenter, ...other } = this.props;
    let { tagName, ...rest } = other;
    // If no tagName defined we base it off the presenter value.
    if (!tagName) {
      if (presenter) {
        tagName = 'presenter';
      }
      else {
        tagName = 'author';
      }
    }

    const fullName = `${firstname} ${lastname}`;
    const separator = ', ';
    // Define the insides of the component.
    const DetailsEl =
      <div>
        <fullname>{fullName}</fullname>
        {separator}
        <company>{company}</company>
      </div>

    // Use function call instead of jsx to use computed tag name.
    return React.createElement(tagName, rest, DetailsEl);
  }
}

export default Author;
