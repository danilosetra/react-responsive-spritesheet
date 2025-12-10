import randomID from 'random-id';
import React, { useEffect, useImperativeHandle, useRef } from 'react';
import type * as T from '../types/spritesheet';

const Spritesheet = React.forwardRef<T.SpritesheetInstance, T.SpritesheetProps>((props, ref) => {
  const idRef = useRef(`react-responsive-spritesheet--${randomID(8)}`);
  const spriteElRef = useRef<HTMLDivElement | null>(null);
  const spriteElContainerRef = useRef<HTMLDivElement | null>(null);
  const spriteElMoveRef = useRef<HTMLDivElement | null>(null);
  const imageSpriteRef = useRef<HTMLImageElement | null>(null);
  const colsRef = useRef<number | null>(null);
  const rowsRef = useRef<number | null>(null);
  const intervalSpriteRef = useRef<number | undefined>(undefined);
  const isResponsiveRef = useRef<boolean>(props.isResponsive !== undefined ? props.isResponsive : true);
  const startAtRef = useRef<number>(0);
  const endAtRef = useRef<number | false>(false);
  const fpsRef = useRef<number>(props.fps);
  const stepsRef = useRef<number>(props.steps);
  const completeLoopCiclesRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const spriteScaleRef = useRef<number>(1);
  const directionRef = useRef<T.Direction>(props.direction === 'rewind' ? 'rewind' : 'forward');
  const frameRef = useRef<number>(0);
  const handleWindowResizeRef = useRef<(() => void) | undefined>(undefined);
  const latestPropsRef = useRef<T.SpritesheetProps>(props);
  const instanceRef = useRef<T.SpritesheetInstance | null>(null);

  useEffect(() => {
    latestPropsRef.current = props;
  });

  const setStartAt = (frame?: number): number => {
    startAtRef.current = frame ? frame - 1 : 0;
    return startAtRef.current;
  };

  const setEndAt = (frame?: number | false): number | false => {
    endAtRef.current = frame === undefined ? false : frame;
    return endAtRef.current;
  };

  const setDirection = (direction?: T.Direction): T.Direction => {
    directionRef.current = direction === 'rewind' ? 'rewind' : 'forward';
    return directionRef.current;
  };

  const getInfo = (param: string): any => {
    switch (param) {
      case 'direction':
        return directionRef.current;
      case 'frame':
        return frameRef.current;
      case 'fps':
        return fpsRef.current;
      case 'steps':
        return stepsRef.current;
      case 'width':
        return spriteElContainerRef.current!.getBoundingClientRect().width;
      case 'height':
        return spriteElContainerRef.current!.getBoundingClientRect().height;
      case 'scale':
        return spriteScaleRef.current;
      case 'isPlaying':
        return isPlayingRef.current;
      case 'isPaused':
        return !isPlayingRef.current;
      case 'completeLoopCicles':
        return completeLoopCiclesRef.current;
      default:
        throw new Error(
          `Invalid param \`${param}\` requested by Spritesheet.getinfo(). See the documentation on https://github.com/danilosetra/react-responsive-spritesheet`
        );
    }
  };

  const resize = (callback: boolean = true): void => {
    const { widthFrame, onResize } = latestPropsRef.current;
    if (isResponsiveRef.current && spriteElRef.current && spriteElContainerRef.current) {
      spriteScaleRef.current = spriteElRef.current.offsetWidth / widthFrame;
      spriteElContainerRef.current.style.transform = `scale(${spriteScaleRef.current})`;
      spriteElRef.current.style.height = `${getInfo('height')}px`;
      if (callback && typeof onResize === 'function') onResize(instanceRef.current!);
    }
  };

  const moveImage = (play: boolean = true): void => {
    const { onEnterFrame, onEachFrame, loop = false, onLoopComplete, widthFrame, heightFrame } = latestPropsRef.current;
    const currentRow = Math.floor(frameRef.current / ((colsRef.current || 1) as number));
    const currentCol = frameRef.current - ((colsRef.current || 1) as number) * currentRow;
    if (spriteElMoveRef.current) {
      spriteElMoveRef.current.style.backgroundPosition = `-${widthFrame * currentCol}px -${heightFrame * currentRow}px`;
    }
    if (onEnterFrame && Array.isArray(onEnterFrame)) {
      onEnterFrame.forEach(frameAction => {
        if (frameAction.frame === frameRef.current && frameAction.callback) {
          try {
            frameAction.callback();
          } catch {}
        }
      });
    }
    if (play) {
      if (directionRef.current === 'rewind') {
        frameRef.current -= 1;
      } else {
        frameRef.current += 1;
      }
      if (typeof onEachFrame === 'function') onEachFrame(instanceRef.current!);
    }
    if (isPlayingRef.current) {
      if (
        (directionRef.current === 'forward' &&
          (frameRef.current === stepsRef.current || frameRef.current === endAtRef.current)) ||
        (directionRef.current === 'rewind' && (frameRef.current === -1 || frameRef.current === endAtRef.current))
      ) {
        if (loop) {
          if (typeof onLoopComplete === 'function') onLoopComplete(instanceRef.current!);
          completeLoopCiclesRef.current += 1;
          frameRef.current = startAtRef.current
            ? startAtRef.current
            : directionRef.current === 'rewind'
              ? stepsRef.current - 1
              : 0;
        } else {
          pause();
        }
      }
    }
  };

  const setIntervalPlayFunctions = (): void => {
    if (intervalSpriteRef.current) clearInterval(intervalSpriteRef.current);
    intervalSpriteRef.current = window.setInterval(
      () => {
        if (isPlayingRef.current) moveImage();
      },
      1000 / Math.max(1, fpsRef.current)
    );
  };

  const play = (withTimeout: boolean = false): void => {
    const { onPlay = () => {}, timeout = 0 } = latestPropsRef.current;
    if (!isPlayingRef.current) {
      setTimeout(
        () => {
          onPlay(instanceRef.current!);
          setIntervalPlayFunctions();
          isPlayingRef.current = true;
        },
        withTimeout ? timeout : 0
      );
    }
  };

  const pause = (): void => {
    const { onPause = () => {} } = latestPropsRef.current;
    isPlayingRef.current = false;
    if (intervalSpriteRef.current) clearInterval(intervalSpriteRef.current);
    onPause(instanceRef.current!);
  };

  const goToAndPlay = (frame?: number): void => {
    frameRef.current = frame !== undefined ? frame : frameRef.current;
    play();
  };

  const goToAndPause = (frame?: number): void => {
    pause();
    frameRef.current = frame !== undefined ? frame : frameRef.current;
    moveImage();
  };

  const setFps = (fps: number): void => {
    fpsRef.current = fps;
    setIntervalPlayFunctions();
  };

  const setInstance = (): T.SpritesheetInstance => {
    return {
      play,
      pause,
      goToAndPlay,
      goToAndPause,
      setStartAt,
      setEndAt,
      setFps,
      setDirection,
      getInfo
    };
  };

  instanceRef.current = setInstance();
  useImperativeHandle(ref, () => instanceRef.current!);

  useEffect(() => {
    const {
      isResponsive = true,
      startAt = 0,
      endAt = false,
      fps,
      steps,
      direction = 'forward',
      image,
      widthFrame,
      heightFrame,
      autoplay = true,
      getInstance = () => {},
      onInit = () => {}
    } = latestPropsRef.current;

    if (widthFrame <= 0 || heightFrame <= 0 || steps <= 0 || fps <= 0) {
      throw new Error('Invalid Spritesheet configuration');
    }

    isResponsiveRef.current = isResponsive;
    setStartAt(startAt);
    setEndAt(endAt);
    fpsRef.current = fps;
    stepsRef.current = steps;
    setDirection(direction);
    frameRef.current = startAtRef.current
      ? startAtRef.current
      : directionRef.current === 'rewind'
        ? stepsRef.current - 1
        : 0;

    const imgLoadSprite = new Image();
    imgLoadSprite.src = image;
    imgLoadSprite.onload = () => {
      if (spriteElRef.current && spriteElContainerRef.current && spriteElMoveRef.current) {
        imageSpriteRef.current = imgLoadSprite;
        colsRef.current = imageSpriteRef.current.width === widthFrame ? 1 : imageSpriteRef.current.width / widthFrame;
        rowsRef.current =
          imageSpriteRef.current.height === heightFrame ? 1 : imageSpriteRef.current.height / heightFrame;

        resize(false);
        handleWindowResizeRef.current = () => resize();
        window.addEventListener('resize', handleWindowResizeRef.current);
        moveImage(false);
        setTimeout(() => {
          resize(false);
        }, 10);

        if (autoplay !== false) play(true);

        const instance = instanceRef.current!;
        getInstance(instance);
        onInit(instance);
      }
    };
    imgLoadSprite.onerror = () => {
      throw new Error(`Failed to load image ${imgLoadSprite.src}`);
    };
    return () => {
      if (handleWindowResizeRef.current) window.removeEventListener('resize', handleWindowResizeRef.current);
      if (intervalSpriteRef.current) clearInterval(intervalSpriteRef.current);
    };
  }, []);

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
  } = props;

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    width: `${widthFrame}px`,
    height: `${heightFrame}px`,
    transform: `scale(${spriteScaleRef.current})`,
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

  return (
    <div
      className={`react-responsive-spritesheet ${idRef.current} ${className}`}
      style={style}
      ref={spriteElRef}
      onClick={() => onClick(instanceRef.current!)}
      onDoubleClick={() => onDoubleClick(instanceRef.current!)}
      onMouseMove={() => onMouseMove(instanceRef.current!)}
      onMouseEnter={() => onMouseEnter(instanceRef.current!)}
      onMouseLeave={() => onMouseLeave(instanceRef.current!)}
      onMouseOver={() => onMouseOver(instanceRef.current!)}
      onMouseOut={() => onMouseOut(instanceRef.current!)}
      onMouseDown={() => onMouseDown(instanceRef.current!)}
      onMouseUp={() => onMouseUp(instanceRef.current!)}
    >
      <div className='react-responsive-spritesheet-container' style={containerStyles} ref={spriteElContainerRef}>
        <div className='react-responsive-spritesheet-container__move' style={moveStyles} ref={spriteElMoveRef} />
      </div>
    </div>
  );
});

Spritesheet.displayName = 'Spritesheet';

export default Spritesheet;
