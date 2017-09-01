import React from 'react';
import PropTypes from 'prop-types';

class Spritesheet extends React.Component {
  constructor(props) {
    super(props);

    this.spriteID = 'react-responsive-spritesheet--' + Math.random().toString(36).substring(7);
    this.spriteEl = this.spriteElContainer = this.spriteElMove = this.intervalSprite = null;
    this.actFrame = 0;
    this.isPlaying = false;
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
    let elSprite = React.createElement('div', { className: `react-responsive-spritesheet ${this.spriteID} ${this.props.className ? this.props.className : ''}`, style: this.props.style }, elContainer);

    return elSprite;
  }

  init() {
    this.actFrame = 0;
    this.spriteEl = document.querySelector('.' + this.spriteID);
    this.spriteElContainer = this.spriteEl.querySelector('.react-responsive-spritesheet-container');
    this.spriteElMove = this.spriteElContainer.querySelector('.react-responsive-spritesheet-container__move');

    this.resize();
    window.addEventListener('resize', this.resize.bind(this));
    this.moveImage(false);
    setTimeout(() => {
      this.resize();
    }, 100);

    if (this.props.autoplay) {
      this.play(false);
    }

    if (this.props.getInstance) {
      this.props.getInstance(this);
    }
  }

  resize() {
    let scaleSprite = this.spriteEl.offsetWidth / this.props.widthFrame;
    this.spriteElContainer.style.transform = `scale(${scaleSprite})`;
  }

  moveImage(play = true) {
    if (this.props.direction === 'vertical') {
      this.spriteElMove.style.backgroundPosition = `0 -${this.props.heightFrame * this.actFrame}px`;
    } else {
      this.spriteElMove.style.backgroundPosition = `-${this.props.widthFrame * this.actFrame}px 0`;
    }

    if (play) {
      this.actFrame += 1;
    }
  }

  playOneFrame() {
    this.resize();
    this.moveImage();
    if (this.actFrame >= this.props.steps) {
      this.actFrame = 0;
    }
  }

  play(withTimeout = true) {
    if (!this.isPlaying) {
      setTimeout(() => {
        this.intervalSprite = setInterval(() => {
          this.moveImage();

          if (this.actFrame === this.props.steps) {
            if (this.props.loop) {
              this.actFrame = 0;
            } else {
              this.stop();
            }
          }
        }, 1000 / this.props.fps);
      }, withTimeout ? (this.props.timeout ? this.props.timeout : 0) : 0);
      this.isPlaying = true;
    }
  }

  stop() {
    this.actFrame = this.props.steps - 1;
    this.isPlaying = false;
    clearInterval(this.intervalSprite);
  }

  clickAction() {
    if (this.props.frameByFrame) {
      this.playOneFrame();
    }
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
  direction: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  autoplay: PropTypes.bool,
  loop: PropTypes.bool,
  background: PropTypes.string,
  backgroundSize: PropTypes.string,
  backgroundRepeat: PropTypes.string,
  backgroundPosition: PropTypes.string,
  getInstance: PropTypes.func,
  frameByFrame: PropTypes.bool
};

export default Spritesheet;