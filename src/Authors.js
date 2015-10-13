import React, { Component, PropTypes } from 'react';

import Author from './Author';
// import OralPresentations from './OralPresentations';

class Authors extends Component {
  render() {
    const { authors } = this.props.route;

    return (
      <authors>
        { authors.map(author => <Author key={author.firstname + author.lastname} {...author} />) }
      </authors>
    );
  }
}
Authors.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Authors;
