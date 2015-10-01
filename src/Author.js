import React, { Component } from 'react';

class Author extends Component {
  render() {
    const { firstname, lastname, company, presenter, ...rest } = this.props;
    let className = 'co-author';
    if (presenter) {
      className = 'presenter';
    }
    const fullName = `${firstname} ${lastname}`;
    const seperator = ', ';
    return (
      <li className={className}>
        <span className="name">{fullName}</span>
        {seperator}
        <span className="company">{company}</span>
      </li>
    );
  }
}

export default Author;
