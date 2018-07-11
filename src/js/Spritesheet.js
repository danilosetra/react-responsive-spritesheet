import React from 'react';
import PropTypes from 'prop-types';

class Spritesheet extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.init();
  }

  init() {
    console.log('lets start...');
  }

  renderElements() {
    return <div />;
  }

  render() {
    return this.renderElements();
  }
}

Spritesheet.propTypes = {
  className: PropTypes.string
};

export default Spritesheet;
