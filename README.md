# React Responsive Spritesheet
[![Build Status](https://travis-ci.org/danilosetra/react-responsive-spritesheet.svg?branch=master)](https://travis-ci.org/danilosetra/react-responsive-spritesheet) [![npm](https://img.shields.io/npm/l/react-responsive-spritesheet.svg)](https://npmjs.org/package/react-responsive-spritesheet) [![npm](https://img.shields.io/npm/v/react-responsive-spritesheet.svg)](https://npmjs.org/package/react-responsive-spritesheet) [![node version](https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square)](http://nodejs.org/download/) [![Known Vulnerabilities](https://snyk.io/test/github/danilosetra/react-responsive-spritesheet/badge.svg)](https://snyk.io/test/github/danilosetra/react-responsive-spritesheet)

React component which helps you to easily apply responsive spritesheet animations on your project.

## Installation

```bash
$ npm install react-responsive-spritesheet --save
```
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
          getInstance={instance => {
            this.spriteInstance = instance;
          }}
          onClick={() => {
            this.spriteInstance.play();
          }}
          onDoubleClick={() => {
            this.spriteInstance.pause();
          }}
          onMouseMove={() => {
            console.log('onMouseMove');
          }}
          onMouseEnter={() => {
            console.log('onMouseEnter');
          }}
          onMouseLeave={() => {
            console.log('onMouseLeave');
          }}
          onMouseOver={() => {
            console.log('onMouseOver');
          }}
          onMouseOut={() => {
            console.log('onMouseOut');
          }}
          onMouseDown={() => {
            console.log('onMouseDown');
          }}
          onMouseUp={() => {
            console.log('onMouseUp');
          }}
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
|   | **getInstance** | `callback` |   | *Return callback instance for spritesheet controls* |
|   | **onClick** | `function` |   | *Provides action onClick for spritesheet container* |
|   | **onDoubleClick** | `function` |   | *Provides action onDoubleClick for spritesheet container* |
|   | **onMouseMove** | `function` |   | *Provides action onMouseMove for spritesheet container* |
|   | **onMouseEnter** | `function` |   | *Provides action onMouseEnter for spritesheet container* |
|   | **onMouseLeave** | `function` |   | *Provides action onMouseLeave for spritesheet container* |
|   | **onMouseOver** | `function` |   | *Provides action onMouseOver for spritesheet container* |
|   | **onMouseOut** | `function` |   | *Provides action onMouseOut for spritesheet container* |
|   | **onMouseDown** | `function` |   | *Provides action onMouseDown for spritesheet container* |
|   | **onMouseUp** | `function` |   | *Provides action onMouseUp for spritesheet container* |