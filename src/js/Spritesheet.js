import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

class Spritesheet extends Component {
  constructor(props) {
    super(props);

    const { isResponsive, startAt, endAt, fps, steps, direction } = this.props;

    this.id = uniqueId('react-responsive-spritesheet--');
    this.spriteEl = this.spriteElContainer = this.spriteElMove = this.imageSprite = this.cols = this.rows = null;
    this.intervalSprite = false;
    this.isResponsive = isResponsive;
    this.startAt = this.setStartAt(startAt);
    this.endAt = this.setEndAt(endAt);
    this.fps = fps;
    this.steps = steps;
    this.completeLoopCicles = 0;
    this.isPlaying = false;
    this.spriteScale = 1;
    this.direction = this.setDirection(direction);
    this.frame = this.startAt ? this.startAt : this.direction === 'rewind' ? this.steps - 1 : 0;
  }

  componentDidMount() {
    this.init();
  }

  renderElements = () => {
    const {
      image,
      className,
      style,
      widthFrame,
      heightFrame,
      background,
      backgroundSize,
      backgroundRepeat,
      backgroundPosition,
      onClick,
      onDoubleClick,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onMouseOut,
      onMouseDown,
      onMouseUp
    } = this.props;

    const instance = this.setInstance();

    let containerStyles = {
      position: 'relative',
      overflow: 'hidden',
      width: `${widthFrame}px`,
      height: `${heightFrame}px`,
      transform: `scale(${this.spriteScale})`,
      transformOrigin: '0 0',
      backgroundImage: 'url(' + background + ')',
      backgroundSize,
      backgroundRepeat,
      backgroundPosition
    };

    let moveStyles = {
      overflow: 'hidden',
      backgroundRepeat: 'no-repeat',
      display: 'table-cell',
      backgroundImage: 'url(' + image + ')',
      width: `${widthFrame}px`,
      height: `${heightFrame}px`,
      transformOrigin: '0 50%'
    };

    let elMove = React.createElement('div', {
      className: 'react-responsive-spritesheet-container__move',
      style: moveStyles
    });

    let elContainer = React.createElement(
      'div',
      { className: 'react-responsive-spritesheet-container', style: containerStyles },
      elMove
    );

    let elSprite = React.createElement(
      'div',
      {
        className: `react-responsive-spritesheet ${this.id} ${className}`,
        style,
        onClick: () => onClick(instance),
        onDoubleClick: () => onDoubleClick(instance),
        onMouseMove: () => onMouseMove(instance),
        onMouseEnter: () => onMouseEnter(instance),
        onMouseLeave: () => onMouseLeave(instance),
        onMouseOver: () => onMouseOver(instance),
        onMouseOut: () => onMouseOut(instance),
        onMouseDown: () => onMouseDown(instance),
        onMouseUp: () => onMouseUp(instance)
      },
      elContainer
    );

    return elSprite;
  };

  init = () => {
    console.log('lets start...');
  };

  setInstance() {
    return {
      play: () => {},
      pause: () => {},
      goToAndPlay: () => {},
      goToAndPause: () => {},
      setStartAt: this.setStartAt,
      setEndAt: this.setEndAt,
      setFps: () => {},
      setDirection: this.setDirection,
      getInfo: () => {}
    };
  }

  setStartAt = frame => {
    this.startAt = frame ? frame - 1 : 0;
    return this.startAt;
  };

  setEndAt = frame => {
    this.endAt = frame;
    return this.endAt;
  };

  setDirection = direction => {
    this.direction = direction === 'rewind' ? 'rewind' : 'forward';
    return this.direction;
  };

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
