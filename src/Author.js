import React, { Component } from 'react';

class Author extends Component {
  render() {
    const { firstname, lastname, company, presenter, ...rest } = this.props;
    let className = 'co-author';
    if (presenter) {
      className = 'presenter';
    }
    const fullName = `${firstname} ${lastname}`;

  return (
      <author className={className}>
        <fullname>{fullName}</fullname>
        <company>{company}</company>
      </author>
    );
  }
}

export default Author;
