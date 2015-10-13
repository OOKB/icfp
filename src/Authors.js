import React, { Component, PropTypes } from 'react';

import Author from './Author';
// import OralPresentations from './OralPresentations';

class Authors extends Component {
  render() {
    const { authors } = this.props;

    return (
      <authors>
        { authors.map(author => <Author key={author.firstname + author.lastname} {...author} />) }
      </authors>
    );
  }
}
Authors.propTypes = {
  authors: PropTypes.array.isRequired,
};

export default Authors;
