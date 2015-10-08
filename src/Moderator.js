import React, { Component } from 'react';

class Moderator extends Component {
  render() {
    const { firstname, lastname, company, ...rest } = this.props;

    const fullName = `${firstname} ${lastname}`;
    const separator = ', ';

  return (
      <moderator>
        <fullname>{fullName}</fullname>
        {separator}
        <company>{company}</company>
      </moderator>
    );
  }
}

export default Moderator;
