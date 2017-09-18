# React Responsive Spritesheet
[![Build Status](https://travis-ci.org/danilosetra/react-responsive-spritesheet.svg?branch=master)](https://travis-ci.org/danilosetra/react-responsive-spritesheet) [![npm](https://img.shields.io/npm/l/react-responsive-spritesheet.svg)](https://npmjs.org/package/react-responsive-spritesheet) [![npm](https://img.shields.io/npm/v/react-responsive-spritesheet.svg)](https://npmjs.org/package/react-responsive-spritesheet) [![node version](https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square)](http://nodejs.org/download/) [![Known Vulnerabilities](https://snyk.io/test/github/danilosetra/react-responsive-spritesheet/badge.svg)](https://snyk.io/test/github/danilosetra/react-responsive-spritesheet)

<p align="center">
  <img src="https://raw.githubusercontent.com/danilosetra/react-responsive-spritesheet/develop/assets/images/logo/rrs-logo.png" width="250" height="250">
</p>

## Hello, world!

React Responsive Spritesheet is a [React](https://facebook.github.io/react/) component which helps you to easily apply responsive spritesheet animations on your project.

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Call methods](#call-methods)
- [Requesting infos](#requesting-infos)

## Installation

```bash
$ npm install react-responsive-spritesheet --save
```
<!--
npm run build
npm version < patch / minor / major >
npm publish
git checkout master
git merge develop
git add .
git commit -m "npm version update"
git push origin master
git push origin < TAG_VERSION_NAME >
-->
---
## Usage

**Basic usage with required parameters**

```javascript
import Spritesheet from 'react-responsive-spritesheet';

class App extends Component {

  render() {

    return (
      <Spritesheet
        image={`http://www.example.com/assets/image.png`}
        widthFrame={800}
        heightFrame={648}
        steps={46}
        fps={12}
        orientation={`horizontal`}
      />
    );

  }

}
```

**Complete usage with all parameters**

```javascript
import Spritesheet from 'react-responsive-spritesheet';

class App extends Component {

  render() {

    return (
      <Spritesheet
        className={`my-element__class--style`}
        style={{ backgroundColor: 'red' }}
        image={`http://www.example.com/assets/image.png`}
        widthFrame={800}
        heightFrame={648}
        steps={46}
        fps={12}
        orientation={`horizontal`}
        timeout={1800}
        autoplay={false}
        loop={true}
        startAt={10}
        endAt={30}
        background={`http://www.example.com/assets/image.png`}
        backgroundSize={`cover`}
        backgroundRepeat={`no-repeat`}
        backgroundPosition={`center center`}
        getInstance={spritesheet => {
          this.spriteInstance = spritesheet;
        }}
        onClick={spritesheet => {
          spritesheet.play();
        }}
        onDoubleClick={spritesheet => {
          console.log( spritesheet.getInfo('isPlaying') );
        }}
        onMouseMove={spritesheet => {
          console.log( 'onMouseMove', spritesheet.getInfo('frame') );
        }}
        onMouseEnter={spritesheet => {
          console.log('onMouseEnter');
        }}
        onMouseLeave={spritesheet => {
          console.log('onMouseLeave');
        }}
        onMouseOver={spritesheet => {
          console.log('onMouseOver');
        }}
        onMouseOut={spritesheet => {
          console.log('onMouseOut');
        }}
        onMouseDown={spritesheet => {
          console.log('onMouseDown');
        }}
        onMouseUp={spritesheet => {
          console.log('onMouseUp');
        }}
        onInit={spritesheet => {
          console.log('onInit');
        }}
        onResize={spritesheet => {
          console.log( 'onResize', spritesheet.getInfo('frame') );
        }}
        onPlay={spritesheet => {
          console.log('onPlay');
        }}
        onPause={spritesheet => {
          console.log('onPause');
        }}
        onLoopComplete={spritesheet => {
          console.log('onLoopComplete');
        }}
        onEachFrame={spritesheet => {
          console.log('onEachFrame');
        }}
        onEnterFrame={[
          {
            frame: 2,
            callback: (() => {
              console.log('passed by frame 2')
            })
          },
          {
            frame: 7,
            callback: (() => {
              console.log('passed by frame 7')
            })
          }
        ]}
      />
    );

  }

}
```
---
## Options

| Required | Parameter | Type | Example | Description |
| :------------: | ------------ | ------------ | ------------ | ------------ |
|   | **className** | `string` | 'my-element__class--style' | *Applies a classname for spritehseet container* |
|   | **style** | `object` | { backgroundColor: 'red', display: 'flex' } | *Applies inline style for spritehseet container* |
| &#10003; | **image** | `string` | 'http://yyy.com/image.png' | *URL or path of image to animate* |
| &#10003; | **widthFrame** | `number` | 800 | *Original width of each frame, in pixels* |
| &#10003; | **heightFrame** | `number` | 800 | *Original height of each frame, in pixels* |
| &#10003; | **steps** | `number` | 47 | *Total frames / steps present on animation image* |
| &#10003; | **fps** | `number` | 12 | *Velocity / Animation frames per second* |
| &#10003; | **orientation** | `string` | 'horizontal' | *'horizontal', 'vertical' or 'multi-row' frames orientation on sprite image; Default: 'horizontal'* |
|   | **timeout** | `number` | 1200 | *Delay for start animating. The '**autoplay**' option must be **true*** |
|   | **autoplay** | `boolean` | false | *Determines if animation starts automatically* |
|   | **loop** | `boolean` | false | *Determines if animation replay on end* |
|   | **startAt** | `number` | false | *Determines the first frame which will be displayed on start to animate* |
|   | **endAt** | `number` | false | *Determines the last frame which will be displayed on stop animation* |
|   | **background** | `string` | '/assets/background.png' | *URL or path of background image placed behind animation* |
|   | **backgroundSize** | `string` | 'cover' | *Style for background image* |
|   | **backgroundRepeat** | `string` | 'no-repeat' | *Style for background image* |
|   | **backgroundPosition** | `string` | 'center center' | *Style for background image* |
|   | **getInstance** | `callback` |   | *Returns callback instance for spritesheet controls* |
|   | **onClick** | `function` |   | *Provides onClick callback function for spritesheet container* |
|   | **onDoubleClick** | `function` |   | *Provides onDoubleClick callback function for spritesheet container* |
|   | **onMouseMove** | `function` |   | *Provides onMouseMove callback function for spritesheet container* |
|   | **onMouseEnter** | `function` |   | *Provides onMouseEnter callback function for spritesheet container* |
|   | **onMouseLeave** | `function` |   | *Provides onMouseLeave callback function for spritesheet container* |
|   | **onMouseOver** | `function` |   | *Provides onMouseOver callback function for spritesheet container* |
|   | **onMouseOut** | `function` |   | *Provides onMouseOut callback function for spritesheet container* |
|   | **onMouseDown** | `function` |   | *Provides onMouseDown callback function for spritesheet container* |
|   | **onMouseUp** | `function` |   | *Provides onMouseUp callback function for spritesheet container* |
|   | **onInit** | `function` |   | *Provides callback function when the spritesheet initializes* |
|   | **onResize** | `function` |   | *Provides callback function when the spritesheet resizes* |
|   | **onPlay** | `function` |   | *Provides callback function when the spritesheet plays. spritesheet.goToAndPlay(x) method also fires this callback* |
|   | **onPause** | `function` |   | *Provides callback function when the spritesheet pauses. spritesheet.goToAndPause(x) method also fires this callback* |
|   | **onLoopComplete** | `function` |   | *Provides callback function when the animation completes a loop cicle* |
|   | **onEachFrame** | `function` |   | *Provides callback function when each animation frame is changed* |
|   | **onEnterFrame** | `array` |   | *Accepts an array of callback functions when the specific animation frame is displayed* |

---
## Call methods

Using the instance provided on callback functions you can call some methods

Example

```
onMouseEnter={spritesheet => {
  console.log( spritesheet.setStartAt(6) );
}}
```

| Method | Call | Description |
| ------------ | ------------ | ------------ |
| **play** | `spritesheet.play()` | Plays the animation from current frame |
| **pause** | `spritesheet.pause()` | Pauses the animation on current frame |
| **goToAndPlay** | `spritesheet.goToAndPlay(frameNumber)` | Plays the animation from specified frame as argument |
| **goToAndPause** | `spritesheet.goToAndPause(frameNumber)` | Pauses the animation on specified frame |
| **setStartAt** | `spritesheet.setStartAt(frameNumber)` | Sets the first frame to be displayed on animation starts. It will be considered on loop cycles. |
| **setEndAt** | `spritesheet.setEndAt(frameNumber)` | Sets the last frame to be displayed on animation ends. It will be considered on loop cycles. |
| **setFps** | `spritesheet.setFps(fpsNumber)` | Sets the fps (speed) of animation, even while is playing |
| **getInfo** | `spritesheet.getInfo('stringInfoToRetrieve')` | Returns some real-time information about spritesheet. See below on **[Requesting infos](#requesting-infos)** section |

---
## Requesting infos

Using the instance.getInfo(x) method provided on callback functions you can request a real-time information about your spritesheet animation

Example

```
onMouseEnter={spritesheet => {
  console.log( spritesheet.getInfo('frame') );
}}
```

| Parameter | Type | Returns |
| ------------ | ------------ | ------------ |
| **frame** | `number` | current frame of animation |
| **fps** | `number` | current frames per second (speed) |
| **steps** | `number` | total number of animation steps |
| **width** | `number` | scaled animation width, in pixels |
| **height** | `number` | scaled animation height, in pixels |
| **scale** | `number` | scale of spritesheet, based on default sizes, note that scale=1 is relative to original size |
| **isPlaying** | `boolean` | if animation is currently playing, returns true |
| **isPaused** | `boolean` | if animation is currently paused or stopped, returns true |
| **completeLoopCicles** | `number` | total number of cycles (loops) the animation has completed |