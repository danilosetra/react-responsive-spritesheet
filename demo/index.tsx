import React from 'react';
import { createRoot } from 'react-dom/client';
import Spritesheet from '../src/js/Spritesheet';

const App = () => (
  <div style={{ padding: 20 }}>
    <h1>React Responsive Spritesheet Demo</h1>
    <p>Click to pause, double-click to play.</p>
    <Spritesheet
      image={
        'https://raw.githubusercontent.com/danilosetra/react-responsive-spritesheet/master/assets/images/examples/sprite-image-horizontal.png'
      }
      widthFrame={420}
      heightFrame={500}
      steps={14}
      fps={10}
      autoplay={true}
      loop={true}
      onClick={(spritesheet) => {
        spritesheet.pause();
      }}
      onDoubleClick={(spritesheet) => {
        spritesheet.play();
      }}
    />
  </div>
);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
