import React, { Component } from 'react';

class Presenter extends Component {
  render() {
    const { children } = this.props;
    return <presenter className="presenter">{ children }</presenter>
  }
}

class CoAuthor extends Component {
  render() {
    const { children } = this.props;
    return <author className="co-author">{ children }</author>
  }
}

class Author extends Component {
  render() {
    const { firstname, lastname, company, presenter, ...rest } = this.props;

    let AuthorTag = CoAuthor;
    if (presenter) {
      AuthorTag = Presenter;
    }
    const fullName = `${firstname} ${lastname}`;
    const separator = ', ';

  return (
      <AuthorTag>
        <fullname>{fullName}</fullname>
        {separator}
        <company>{company}</company>
      </AuthorTag>
    );
  }
}

export default Author;
