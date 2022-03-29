import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Spritesheet extends Component {
  constructor(props) {
    super(props);

    const { isResponsive, startAt, endAt, fps, steps, direction } = this.props;

    this.id = `react-responsive-spritesheet--${Math.random().toString(16).slice(2)}`;
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
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

    let containerStyles = {
      position: 'relative',
      overflow: 'hidden',
      width: `${widthFrame}px`,
      height: `${heightFrame}px`,
      transform: `scale(${this.spriteScale})`,
      transformOrigin: '0 0',
      backgroundImage: `url(${background})`,
      backgroundSize,
      backgroundRepeat,
      backgroundPosition
    };

    let moveStyles = {
      overflow: 'hidden',
      backgroundRepeat: 'no-repeat',
      display: 'table-cell',
      backgroundImage: `url(${image})`,
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
        onClick: (e) => onClick(this.setInstance(), e),
        onDoubleClick: (e) => onDoubleClick(this.setInstance(), e),
        onMouseMove: (e) => onMouseMove(this.setInstance(), e),
        onMouseEnter: (e) => onMouseEnter(this.setInstance(), e),
        onMouseLeave: (e) => onMouseLeave(this.setInstance(), e),
        onMouseOver: (e) => onMouseOver(this.setInstance(), e),
        onMouseOut: (e) => onMouseOut(this.setInstance(), e),
        onMouseDown: (e) => onMouseDown(this.setInstance(), e),
        onMouseUp: (e) => onMouseUp(this.setInstance(), e)
      },
      elContainer
    );

    return elSprite;
  };

  init = () => {
    const { image, widthFrame, heightFrame, autoplay, getInstance, onInit } = this.props;

    let imgLoadSprite = new Image();
    imgLoadSprite.src = image;
    imgLoadSprite.onload = () => {
      if (document && document.querySelector(`.${this.id}`)) {
        this.imageSprite = imgLoadSprite;
        this.cols = this.imageSprite.width === widthFrame ? 1 : this.imageSprite.width / widthFrame;
        this.rows = this.imageSprite.height === heightFrame ? 1 : this.imageSprite.height / heightFrame;

        this.spriteEl = document.querySelector(`.${this.id}`);
        this.spriteElContainer = this.spriteEl.querySelector('.react-responsive-spritesheet-container');
        this.spriteElMove = this.spriteElContainer.querySelector('.react-responsive-spritesheet-container__move');

        this.resize(false);
        window.addEventListener('resize', this.resize);
        this.moveImage(false);
        setTimeout(() => {
          this.resize(false);
        }, 10);

        if (autoplay !== false) this.play(true);

        const instance = this.setInstance();

        getInstance(instance);
        onInit(instance);
      }
    };

    imgLoadSprite.onerror = () => {
      onError(instance, `Failed to load image ${imgLoadSprite.src}`);
    };
  };

  resize = (callback = true) => {
    const { widthFrame, onResize } = this.props;

    if (this.isResponsive) {
      this.spriteScale = this.spriteEl.offsetWidth / widthFrame;
      this.spriteElContainer.style.transform = `scale(${this.spriteScale})`;
      this.spriteEl.style.height = `${this.getInfo('height')}px`;
      if (callback && onResize) onResize(this.setInstance());
    }
  };

  play = (withTimeout = false) => {
    const { onPlay, timeout } = this.props;

    if (!this.isPlaying) {
      setTimeout(() => {
        onPlay(this.setInstance());
        this.setIntervalPlayFunctions();
        this.isPlaying = true;
      }, withTimeout ? timeout : 0);
    }
  };

  setIntervalPlayFunctions = () => {
    if (this.intervalSprite) clearInterval(this.intervalSprite);
    this.intervalSprite = setInterval(() => {
      if (this.isPlaying) this.moveImage();
    }, 1000 / this.fps);
  };

  moveImage = (play = true) => {
    const { onEnterFrame, onEachFrame, loop, onLoopComplete } = this.props;

    let currentRow = Math.floor(this.frame / this.cols);
    let currentCol = this.frame - this.cols * currentRow;
    this.spriteElMove.style.backgroundPosition = `-${this.props.widthFrame * currentCol}px -${this.props.heightFrame *
      currentRow}px`;

    if (onEnterFrame) {
      onEnterFrame.map((frameAction, i) => {
        if (frameAction.frame === this.frame && frameAction.callback) {
          frameAction.callback();
        }
      });
    }

    if (play) {
      if (this.direction === 'rewind') {
        this.frame -= 1;
      } else {
        this.frame += 1;
      }
      if (onEachFrame) onEachFrame(this.setInstance());
    }

    if (this.isPlaying) {
      if (
        (this.direction === 'forward' && (this.frame === this.steps || this.frame === this.endAt)) ||
        (this.direction === 'rewind' && (this.frame === -1 || this.frame === this.endAt))
      ) {
        if (loop) {
          if (onLoopComplete) onLoopComplete(this.setInstance());
          this.completeLoopCicles += 1;
          this.frame = this.startAt ? this.startAt : this.direction === 'rewind' ? this.steps - 1 : 0;
        } else {
          this.pause();
        }
      }
    }
  };

  pause = () => {
    const { onPause } = this.props;

    this.isPlaying = false;
    clearInterval(this.intervalSprite);
    onPause(this.setInstance());
  };

  goToAndPlay = frame => {
    this.frame = frame ? frame : this.frame;
    this.play();
  };

  goToAndPause = frame => {
    this.pause();
    this.frame = frame ? frame : this.frame;
    this.moveImage();
  };

  setStartAt = frame => {
    this.startAt = frame ? frame - 1 : 0;
    return this.startAt;
  };

  setEndAt = frame => {
    this.endAt = frame;
    return this.endAt;
  };

  setFps(fps) {
    this.fps = fps;
    this.setIntervalPlayFunctions();
  }

  setDirection = direction => {
    this.direction = direction === 'rewind' ? 'rewind' : 'forward';
    return this.direction;
  };

  getInfo = param => {
    switch (param) {
      case 'direction':
        return this.direction;
      case 'frame':
        return this.frame;
      case 'fps':
        return this.fps;
      case 'steps':
        return this.steps;
      case 'width':
        return this.spriteElContainer.getBoundingClientRect().width;
      case 'height':
        return this.spriteElContainer.getBoundingClientRect().height;
      case 'scale':
        return this.spriteScale;
      case 'isPlaying':
        return this.isPlaying;
      case 'isPaused':
        return !this.isPlaying;
      case 'completeLoopCicles':
        return this.completeLoopCicles;
      default:
        throw new Error(
          `Invalid param \`${param}\` requested by Spritesheet.getinfo(). See the documentation on https://github.com/danilosetra/react-responsive-spritesheet`
        );
    }
  };

  setInstance() {
    return {
      play: this.play,
      pause: this.pause,
      goToAndPlay: this.goToAndPlay,
      goToAndPause: this.goToAndPause,
      setStartAt: this.setStartAt,
      setEndAt: this.setEndAt,
      setFps: this.setFps,
      setDirection: this.setDirection,
      getInfo: this.getInfo
    };
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
  endAt: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.number]),
  background: PropTypes.string,
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
  onError: PropTypes.func,
  onResize: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.func]),
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onLoopComplete: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.func]),
  onEachFrame: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.func]),
  onEnterFrame: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.array])
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
  background: '',
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
  onError: () => {},
  onResize: false,
  onPlay: () => {},
  onPause: () => {},
  onLoopComplete: false,
  onEachFrame: false,
  onEnterFrame: false
};

export default Spritesheet;
