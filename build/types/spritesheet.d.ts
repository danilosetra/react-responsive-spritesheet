import type { CSSProperties } from 'react';
export type Direction = 'forward' | 'rewind';
export type FrameAction = {
    frame: number;
    callback?: () => void;
};
export type SpritesheetInstance = {
    play: (withTimeout?: boolean) => void;
    pause: () => void;
    goToAndPlay: (frame?: number) => void;
    goToAndPause: (frame?: number) => void;
    setStartAt: (frame?: number) => number;
    setEndAt: (frame?: number | false) => number | false;
    setFps: (fps: number) => void;
    setDirection: (direction?: Direction) => Direction;
    getInfo: (param: string) => any;
};
export interface SpritesheetProps {
    className?: string;
    style?: CSSProperties;
    image: string;
    widthFrame: number;
    heightFrame: number;
    isResponsive?: boolean;
    steps: number;
    fps: number;
    direction?: Direction;
    timeout?: number;
    autoplay?: boolean;
    loop?: boolean;
    startAt?: number;
    endAt?: number | false;
    background?: string;
    backgroundSize?: string;
    backgroundRepeat?: string;
    backgroundPosition?: string;
    getInstance?: (instance: SpritesheetInstance) => void;
    onClick?: (instance: SpritesheetInstance) => void;
    onDoubleClick?: (instance: SpritesheetInstance) => void;
    onMouseMove?: (instance: SpritesheetInstance) => void;
    onMouseEnter?: (instance: SpritesheetInstance) => void;
    onMouseLeave?: (instance: SpritesheetInstance) => void;
    onMouseOver?: (instance: SpritesheetInstance) => void;
    onMouseOut?: (instance: SpritesheetInstance) => void;
    onMouseDown?: (instance: SpritesheetInstance) => void;
    onMouseUp?: (instance: SpritesheetInstance) => void;
    onInit?: (instance: SpritesheetInstance) => void;
    onResize?: false | ((instance: SpritesheetInstance) => void);
    onPlay?: (instance: SpritesheetInstance) => void;
    onPause?: (instance: SpritesheetInstance) => void;
    onLoopComplete?: false | ((instance: SpritesheetInstance) => void);
    onEachFrame?: false | ((instance: SpritesheetInstance) => void);
    onEnterFrame?: false | FrameAction[];
}
//# sourceMappingURL=spritesheet.d.ts.map