import React, { Component } from 'react';

class Author extends Component {
  render() {
    const { firstname, lastname, company, presenter, ...rest } = this.props;
    let { tagName } = this.props;
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
      <person>
        <fullname>{fullName}</fullname>
        {separator}
        <company>{company}</company>
      </person>

    // Use function call instead of jsx to use computed tag name.
    return React.createElement(tagName, rest, DetailsEl);
  }
}

export default Author;
