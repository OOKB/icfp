import React, { Component, PropTypes } from 'react';

// import Poster from './Poster';
// import SessionDay from './SessionDay';
// import Authors from './Authors';

export default class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <h1>Platen: HTML»Print demo</h1>
        <h2>International Conference on Family Planning.</h2>
        { children }
      </div>
    );
  }
}
App.propTypes = {
  route: PropTypes.object.isRequired,
};
