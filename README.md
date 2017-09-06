# React Responsive Spritesheet
[![Build Status](https://travis-ci.org/danilosetra/react-responsive-spritesheet.svg?branch=master)](https://travis-ci.org/danilosetra/react-responsive-spritesheet) [![npm](https://img.shields.io/npm/l/react-responsive-spritesheet.svg)](https://npmjs.org/package/react-responsive-spritesheet) [![npm](https://img.shields.io/npm/v/react-responsive-spritesheet.svg)](https://npmjs.org/package/react-responsive-spritesheet) [![node version](https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square)](http://nodejs.org/download/) [![Known Vulnerabilities](https://snyk.io/test/github/danilosetra/react-responsive-spritesheet/badge.svg)](https://snyk.io/test/github/danilosetra/react-responsive-spritesheet)

React component which helps you to easily apply responsive spritesheet animations on your project.

## Installation

```bash
$ npm install react-responsive-spritesheet --save
```
<!-- 
npm run build
npm publish < patch / minor / major >
npm publish
git add .
git commit -m "npm version update"
git push origin master
git push origin < TAG_VERSION_NAME>
-->
---
## Usage

**Simple usage with required parameters**

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
|   | **className** | `string` | 'my-element__class--style' | *Apply a classname for spritehseet container* |
|   | **style** | `object` | { backgroundColor: 'red', display: 'flex' } | *Apply inline style for spritehseet container* |
| &#10003; | **image** | `string` | 'http://yyy.com/image.png' | *URL or path for image to animate* |
| &#10003; | **widthFrame** | `number` | 800 | *Original width of each frame, in pixels* |
| &#10003; | **heightFrame** | `number` | 800 | *Original height of each frame, in pixels* |
| &#10003; | **steps** | `number` | 47 | *Total frames / steps animation* |
| &#10003; | **fps** | `number` | 12 | *Velocity / Animation frames per second* |
| &#10003; | **orientation** | `string` | 'horizontal' | *'horizontal' or 'vertical' frames orientation on sprite image* |
|   | **timeout** | `number` | 1200 | *Delay for start animating. The '**autoplay**' option must be **true*** |
|   | **autoplay** | `boolean` | false | *Determines if animation starts automatically* |
|   | **loop** | `boolean` | false | *Determines if animation replay on end* |
|   | **background** | `string` | '/assets/background.png' | *URL or path for background image placed behind animation* |
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
|   | **onEnterFrame** | `array` |   | *Provides an array of callback functions when specific animation frame is displayed* |