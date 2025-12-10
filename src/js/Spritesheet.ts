import PropTypes from 'prop-types';
import randomID from 'random-id';
import React, { Component } from 'react';
import type * as T from '../types/spritesheet';

class Spritesheet extends Component<T.SpritesheetProps> {
  static defaultProps: Partial<T.SpritesheetProps> = {
    className: '',
    style: {},
    isResponsive: true,
    direction: 'forward' as T.Direction,
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
    onResize: false,
    onPlay: () => {},
    onPause: () => {},
    onLoopComplete: false,
    onEachFrame: false,
    onEnterFrame: false
  };
  id: string;
  spriteEl: HTMLDivElement | null;
  spriteElContainer: HTMLDivElement | null;
  spriteElMove: HTMLDivElement | null;
  imageSprite: HTMLImageElement | null;
  cols: number | null;
  rows: number | null;
  intervalSprite?: number;
  isResponsive: boolean;
  startAt: number;
  endAt: number | false;
  fps: number;
  steps: number;
  completeLoopCicles: number;
  isPlaying: boolean;
  spriteScale: number;
  direction: T.Direction;
  frame: number;
  private handleWindowResize: () => void;

  constructor(props: T.SpritesheetProps) {
    super(props);

    const { isResponsive = true, startAt = 0, endAt = false, fps, steps, direction = 'forward' } = this.props;

    this.id = `react-responsive-spritesheet--${randomID(8)}`;
    this.spriteEl = this.spriteElContainer = this.spriteElMove = this.imageSprite = null;
    this.cols = this.rows = null;
    this.intervalSprite = undefined;
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
    this.handleWindowResize = () => this.resize();
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  renderElements = (): React.ReactElement => {
    const {
      image,
      className = '',
      style = {},
      widthFrame,
      heightFrame,
      background = '',
      backgroundSize = 'cover',
      backgroundRepeat = 'no-repeat',
      backgroundPosition = '',
      onClick = () => {},
      onDoubleClick = () => {},
      onMouseMove = () => {},
      onMouseEnter = () => {},
      onMouseLeave = () => {},
      onMouseOver = () => {},
      onMouseOut = () => {},
      onMouseDown = () => {},
      onMouseUp = () => {}
    } = this.props;

    const containerStyles: React.CSSProperties = {
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

    const moveStyles: React.CSSProperties = {
      overflow: 'hidden',
      backgroundRepeat: 'no-repeat',
      display: 'table-cell',
      backgroundImage: `url(${image})`,
      width: `${widthFrame}px`,
      height: `${heightFrame}px`,
      transformOrigin: '0 50%'
    };

    const elMove = React.createElement('div', {
      className: 'react-responsive-spritesheet-container__move',
      style: moveStyles
    });

    const elContainer = React.createElement(
      'div',
      {
        className: 'react-responsive-spritesheet-container',
        style: containerStyles
      },
      elMove
    );

    const elSprite = React.createElement(
      'div',
      {
        className: `react-responsive-spritesheet ${this.id} ${className}`,
        style,
        onClick: () => onClick(this.setInstance()),
        onDoubleClick: () => onDoubleClick(this.setInstance()),
        onMouseMove: () => onMouseMove(this.setInstance()),
        onMouseEnter: () => onMouseEnter(this.setInstance()),
        onMouseLeave: () => onMouseLeave(this.setInstance()),
        onMouseOver: () => onMouseOver(this.setInstance()),
        onMouseOut: () => onMouseOut(this.setInstance()),
        onMouseDown: () => onMouseDown(this.setInstance()),
        onMouseUp: () => onMouseUp(this.setInstance())
      },
      elContainer
    );

    return elSprite as unknown as React.ReactElement;
  };

  init = (): void => {
    const { image, widthFrame, heightFrame, autoplay = true, getInstance = () => {}, onInit = () => {} } = this.props;

    const imgLoadSprite = new Image();
    imgLoadSprite.src = image;
    imgLoadSprite.onload = () => {
      if (document && document.querySelector(`.${this.id}`)) {
        this.imageSprite = imgLoadSprite;
        this.cols = this.imageSprite.width === widthFrame ? 1 : this.imageSprite.width / widthFrame;
        this.rows = this.imageSprite.height === heightFrame ? 1 : this.imageSprite.height / heightFrame;

        this.spriteEl = document.querySelector(`.${this.id}`);
        this.spriteElContainer = this.spriteEl!.querySelector(
          '.react-responsive-spritesheet-container'
        ) as HTMLDivElement;
        this.spriteElMove = this.spriteElContainer!.querySelector(
          '.react-responsive-spritesheet-container__move'
        ) as HTMLDivElement;

        this.resize(false);
        window.addEventListener('resize', this.handleWindowResize);
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
      throw new Error(`Failed to load image ${imgLoadSprite.src}`);
    };
  };

  resize = (callback: boolean = true): void => {
    const { widthFrame, onResize } = this.props;

    if (this.isResponsive && this.spriteEl && this.spriteElContainer) {
      this.spriteScale = this.spriteEl.offsetWidth / widthFrame;
      this.spriteElContainer.style.transform = `scale(${this.spriteScale})`;
      this.spriteEl.style.height = `${this.getInfo('height')}px`;
      if (callback && typeof onResize === 'function') onResize(this.setInstance());
    }
  };

  play = (withTimeout: boolean = false): void => {
    const { onPlay = () => {}, timeout = 0 } = this.props;

    if (!this.isPlaying) {
      setTimeout(
        () => {
          onPlay(this.setInstance());
          this.setIntervalPlayFunctions();
          this.isPlaying = true;
        },
        withTimeout ? timeout : 0
      );
    }
  };

  setIntervalPlayFunctions = (): void => {
    if (this.intervalSprite) clearInterval(this.intervalSprite);
    this.intervalSprite = window.setInterval(() => {
      if (this.isPlaying) this.moveImage();
    }, 1000 / this.fps);
  };

  moveImage = (play: boolean = true): void => {
    const { onEnterFrame, onEachFrame, loop = false, onLoopComplete } = this.props;

    const currentRow = Math.floor(this.frame / (this.cols || 1));
    const currentCol = this.frame - (this.cols || 1) * currentRow;
    this.spriteElMove!.style.backgroundPosition = `-${this.props.widthFrame * currentCol}px -${
      this.props.heightFrame * currentRow
    }px`;

    if (onEnterFrame && Array.isArray(onEnterFrame)) {
      onEnterFrame.map(frameAction => {
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
      if (typeof onEachFrame === 'function') onEachFrame(this.setInstance());
    }

    if (this.isPlaying) {
      if (
        (this.direction === 'forward' && (this.frame === this.steps || this.frame === this.endAt)) ||
        (this.direction === 'rewind' && (this.frame === -1 || this.frame === this.endAt))
      ) {
        if (loop) {
          if (typeof onLoopComplete === 'function') onLoopComplete(this.setInstance());
          this.completeLoopCicles += 1;
          this.frame = this.startAt ? this.startAt : this.direction === 'rewind' ? this.steps - 1 : 0;
        } else {
          this.pause();
        }
      }
    }
  };

  pause = (): void => {
    const { onPause = () => {} } = this.props;

    this.isPlaying = false;
    if (this.intervalSprite) clearInterval(this.intervalSprite);
    onPause(this.setInstance());
  };

  goToAndPlay = (frame?: number): void => {
    this.frame = frame !== undefined ? frame : this.frame;
    this.play();
  };

  goToAndPause = (frame?: number): void => {
    this.pause();
    this.frame = frame !== undefined ? frame : this.frame;
    this.moveImage();
  };

  setStartAt = (frame?: number): number => {
    this.startAt = frame ? frame - 1 : 0;
    return this.startAt;
  };

  setEndAt = (frame?: number | false): number | false => {
    this.endAt = frame === undefined ? false : frame;
    return this.endAt;
  };

  setFps(fps: number): void {
    this.fps = fps;
    this.setIntervalPlayFunctions();
  }

  setDirection = (direction?: T.Direction): T.Direction => {
    this.direction = direction === 'rewind' ? 'rewind' : 'forward';
    return this.direction;
  };

  getInfo = (param: string): any => {
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
        return this.spriteElContainer!.getBoundingClientRect().width;
      case 'height':
        return this.spriteElContainer!.getBoundingClientRect().height;
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

  setInstance(): T.SpritesheetInstance {
    return {
      play: this.play,
      pause: this.pause,
      goToAndPlay: this.goToAndPlay,
      goToAndPause: this.goToAndPause,
      setStartAt: this.setStartAt,
      setEndAt: this.setEndAt,
      setFps: this.setFps.bind(this),
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
  onResize: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.func]),
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onLoopComplete: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.func]),
  onEachFrame: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.func]),
  onEnterFrame: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.array])
};

export default Spritesheet;
