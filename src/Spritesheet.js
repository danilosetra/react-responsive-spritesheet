import React from 'react';
import PropTypes from 'prop-types';

class Spritesheet extends React.Component {
  constructor(props) {
    super(props);

    this.id = 'react-responsive-spritesheet--' + Math.random().toString(36).substring(7);
    this.spriteEl = this.spriteElContainer = this.spriteElMove = null;
    this.intervalSprite = false;
    this.startAt = this.props.startAt ? this.setStartAt(this.props.startAt) : 0;
    this.endAt = this.setEndAt(this.props.endAt);
    this.frame = this.startAt ? this.startAt : 0;
    this.fps = this.props.fps;
    this.steps = this.props.steps;
    this.completeLoopCicles = 0;
    this.isPlaying = false;
    this.spriteScale = 1;
  }

  componentDidMount() {
    this.init();
  }

  renderElements() {
    let containerBackgroundImage = '';
    let containerBackgroundSize = '';
    let containerBackgroundRepeat = '';
    let containerBackgroundPosition = '';
    if (this.props.background) {
      containerBackgroundImage = 'url(' + this.props.background + ')';
      containerBackgroundSize = this.props.backgroundSize ? this.props.backgroundSize : 'cover';
      containerBackgroundRepeat = this.props.backgroundRepeat ? this.props.backgroundRepeat : 'no-repeat';
      containerBackgroundPosition = this.props.backgroundPosition ? this.props.backgroundPosition : '';
    }

    let containerStyles = {
      position: 'relative',
      overflow: 'hidden',
      width: `${this.props.widthFrame}px`,
      height: `${this.props.heightFrame}px`,
      transform:`scale(${this.spriteScale})`,
      transformOrigin: '0 50%',
      backgroundImage: containerBackgroundImage,
      backgroundSize: containerBackgroundSize,
      backgroundRepeat: containerBackgroundRepeat,
      backgroundPosition: containerBackgroundPosition
    }

    let moveStyles = {
      overflow: 'hidden',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      display: 'table',
      backgroundImage: 'url(' + this.props.image + ')',
      width: `${this.props.widthFrame}px`,
      height: `${this.props.heightFrame}px`,
      transformOrigin: '0 50%'
    }

    let elMove = React.createElement('div', { className: 'react-responsive-spritesheet-container__move', style: moveStyles });
    let elContainer = React.createElement('div', { className: 'react-responsive-spritesheet-container', style: containerStyles }, elMove);
    let elSprite = React.createElement('div', {
      className: `react-responsive-spritesheet ${this.id} ${this.props.className ? this.props.className : ''}`,
      style: this.props.style,
      onClick: this.props.onClick ? this.props.onClick.bind(this.setInstance(), this) : null,
      onDoubleClick: this.props.onDoubleClick ? this.props.onDoubleClick.bind(this.setInstance(), this) : null,
      onMouseMove: this.props.onMouseMove ? this.props.onMouseMove.bind(this.setInstance(), this) : null,
      onMouseEnter: this.props.onMouseEnter ? this.props.onMouseEnter.bind(this.setInstance(), this) : null,
      onMouseLeave: this.props.onMouseLeave ? this.props.onMouseLeave.bind(this.setInstance(), this) : null,
      onMouseOver: this.props.onMouseOver ? this.props.onMouseOver.bind(this.setInstance(), this) : null,
      onMouseOut: this.props.onMouseOut ? this.props.onMouseOut.bind(this.setInstance(), this) : null,
      onMouseDown: this.props.onMouseDown ? this.props.onMouseDown.bind(this.setInstance(), this) : null,
      onMouseUp: this.props.onMouseUp ? this.props.onMouseUp.bind(this.setInstance(), this) : null
    }, elContainer);

    return elSprite;
  }

  init() {
    this.spriteEl = document.querySelector('.' + this.id);
    this.spriteElContainer = this.spriteEl.querySelector('.react-responsive-spritesheet-container');
    this.spriteElMove = this.spriteElContainer.querySelector('.react-responsive-spritesheet-container__move');

    this.resize(false);
    window.addEventListener('resize', this.resize.bind(this));
    this.moveImage(false);
    setTimeout(() => {
      this.resize(false);
    }, 10);

    if (this.props.autoplay !== false) {
      this.play(true);
    }

    if (this.props.getInstance) this.props.getInstance(this.setInstance());
    if (this.props.onInit) this.props.onInit(this.setInstance.bind(this));
  }

  resize(callback = true) {
    this.spriteScale = this.spriteEl.offsetWidth / this.props.widthFrame;
    this.spriteElContainer.style.transform = `scale(${this.spriteScale})`;
    if(callback && this.props.onResize) this.props.onResize(this.setInstance());
  }

  moveImage(play = true) {
    if (this.props.orientation === 'vertical') {
      this.spriteElMove.style.backgroundPosition = `0 -${this.props.heightFrame * this.frame}px`;
    } else {
      this.spriteElMove.style.backgroundPosition = `-${this.props.widthFrame * this.frame}px 0`;
    }

    if(this.props.onEnterFrame){
      this.props.onEnterFrame.map((frameAction, i) => {
        if(frameAction.frame === this.frame && frameAction.callback){
          frameAction.callback();
        }
      });
    }

    if (play) {
      this.frame += 1;
      if (this.props.onEachFrame) this.props.onEachFrame(this.setInstance());
    }

    if(this.isPlaying){
      if (this.frame === this.steps || this.frame === this.endAt) {
        if (this.props.loop) {
          if(this.props.onLoopComplete) this.props.onLoopComplete(this.setInstance());
          this.completeLoopCicles += 1;
          this.frame = this.startAt ? this.startAt : 0;
        } else {
          this.pause();
        }
      }
    }
  }

  setInstance(){
    return {
      play: this.play.bind(this),
      pause: this.pause.bind(this),
      goToAndPlay: this.goToAndPlay.bind(this),
      goToAndPause: this.goToAndPause.bind(this),
      setStartAt: this.setStartAt.bind(this),
      setEndAt: this.setEndAt.bind(this),
      setFps: this.setFps.bind(this),
      getInfo: this.getInfo.bind(this)
    };
  }

  getInfo(param){
    switch(param){
      case 'frame': {
        return this.frame;
      }
      case 'fps': {
        return this.fps;
      }
      case 'steps': {
        return this.steps;
      }
      case 'width': {
        return this.spriteElContainer.getBoundingClientRect().width;
      }
      case 'height': {
        return this.spriteElContainer.getBoundingClientRect().height;
      }
      case 'scale': {
        return this.spriteScale;
      }
      case 'isPlaying': {
        return this.isPlaying;
      }
      case 'isPaused': {
        return !this.isPlaying;
      }
      case 'completeLoopCicles': {
        return this.completeLoopCicles;
      }
      default: {
        console.error(`Invalid param \`${param}\` requested by Spritesheet.getinfo(). See the documentation on https://github.com/danilosetra/react-responsive-spritesheet`); 
        break;
      }
    }
  }

  setStartAt(frame){
    this.startAt = frame - 1;
    return this.startAt;
  }

  setEndAt(frame){
    this.endAt = frame;
    return this.endAt;
  }

  setFps(fps){
    this.fps = fps;
    this.setIntervalPlayFunctions();
  }

  play(withTimeout = false, setNewInterval = false) {
    if (!this.isPlaying) {
      setTimeout(() => {
        if(this.props.onPlay) this.props.onPlay(this.setInstance());
        this.setIntervalPlayFunctions();
        this.isPlaying = true;
      }, withTimeout ? (this.props.timeout ? this.props.timeout : 0) : 0);
    }
  }

  setIntervalPlayFunctions(){
    if(this.intervalSprite) clearInterval(this.intervalSprite);
    this.intervalSprite = setInterval(() => {
      if (this.isPlaying) {
        this.moveImage();
      }
    }, 1000 / this.fps);
  }

  pause() {
    this.isPlaying = false;
    clearInterval(this.intervalSprite);
    if(this.props.onPause) this.props.onPause(this.setInstance());
  }

  goToAndPlay(frame = 0){
    this.frame = frame;
    this.play();
  }

  goToAndPause(frame = 0){
    this.pause();
    this.frame = frame;
    this.moveImage();
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
  steps: PropTypes.number.isRequired,
  fps: PropTypes.number.isRequired,
  orientation: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  autoplay: PropTypes.bool,
  loop: PropTypes.bool,
  startAt: PropTypes.number,
  endAt: PropTypes.number,
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
  onResize: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onLoopComplete: PropTypes.func,
  onEachFrame: PropTypes.func,
  onEnterFrame: PropTypes.array
};

export default Spritesheet;