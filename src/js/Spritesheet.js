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
  className: PropTypes.string,
  style: PropTypes.object,
  image: PropTypes.string.isRequired,
  widthFrame: PropTypes.number.isRequired,
  heightFrame: PropTypes.number.isRequired,
  isResponsive: PropTypes.bool,
  steps: PropTypes.number.isRequired,
  fps: PropTypes.number.isRequired,
  direction: PropTypes.string,
  timeout: PropTypes.number,
  autoplay: PropTypes.bool,
  loop: PropTypes.bool,
  startAt: PropTypes.number,
  endAt: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  background: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  backgroundSize: PropTypes.string,
  backgroundRepeat: PropTypes.string,
  backgroundPosition: PropTypes.string,
  getInstance: PropTypes.func,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onInit: PropTypes.func,
  onResize: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onLoopComplete: PropTypes.func,
  onEachFrame: PropTypes.func,
  onEnterFrame: PropTypes.array
};

Spritesheet.defaultProps = {
  className: '',
  style: {},
  isResponsive: true,
  direction: 'forward',
  timeout: 0,
  autoplay: true,
  loop: false,
  startAt: 0,
  endAt: false,
  background: false,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '',
  getInstance: () => {},
  onClick: () => {},
  onDoubleClick: () => {},
  onMouseMove: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onMouseOver: () => {},
  onMouseOut: () => {},
  onMouseDown: () => {},
  onMouseUp: () => {},
  onInit: () => {},
  onResize: () => {},
  onPlay: () => {},
  onPause: () => {},
  onLoopComplete: () => {},
  onEachFrame: () => {},
  onEnterFrame: []
};

export default Spritesheet;
