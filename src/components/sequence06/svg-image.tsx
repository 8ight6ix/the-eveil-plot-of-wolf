import React, { useEffect, useCallback, useRef, useMemo, useState } from 'react';
import Lottie from 'react-lottie';

import withActor, { ContentProps } from 'modules/hocs/actor';
import svg1 from 'static/svg/fox-turtle.json';
import svg2 from 'static/svg/wolf-trans.json';

function SvgImage({ short, duration, registAction }: ContentProps) {
  const [stop, setStop] = useState<boolean>(true);
  const [transition, setTransition] = useState<boolean>(true);
  const [direction, setDirection] = useState<number>(1);

  const preShort = useRef<number>(short);
  const willStop = useRef<NodeJS.Timeout | null>(null);
  const actionKey = useMemo(() => Symbol('fox-turtle'), []);

  const clearWillStop = useCallback(() => {
    if (willStop.current) clearTimeout(willStop.current);
    willStop.current = null;
  }, []);

  const completeCallback = useCallback(() => {
    if (registAction) registAction(actionKey, false);
  }, [registAction, actionKey]);

  const eventListeners = useMemo((): { eventName: 'complete'; callback: () => void }[] => {
    return [{ eventName: 'complete', callback: completeCallback }];
  }, [completeCallback]);

  const lottieOptions = useMemo(() => {
    return { animationData: transition ? svg1 : svg2, loop: false, autoplay: false };
  }, [transition]);

  useEffect(() => {
    if (preShort.current === 0 && short === 1) {
      if (registAction) registAction(actionKey, true);
      setStop(false);
    } else if (preShort.current === 1 && short === 2) {
      if (registAction) registAction(actionKey, true);
      setTransition(false);
      setDirection(1);
    } else if (preShort.current === 2 && short === 1) {
      if (registAction) registAction(actionKey, true);
      setDirection(-1);
    } else if (preShort.current === 1 && short === 0) {
      willStop.current = setTimeout(() => {
        setTransition(true);
        setDirection(1);
        setStop(true);
      }, duration);
    }

    preShort.current = short;
    return clearWillStop;
  }, [short]);

  return <Lottie options={lottieOptions} eventListeners={eventListeners} isStopped={stop} direction={direction} />;
}

export default withActor({ className: 'svg' })(SvgImage);
