import React, { useState, useEffect, useCallback, useRef } from 'react';
import Lottie from 'react-lottie';

import withActor, { ContentProps } from 'modules/hocs/actor';
import svg from 'static/svg/fox-turtle.json';

const lottieOption = {
  loop: true,
  autoplay: true,
  animationData: svg,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

function FoxTurtle({ short, duration }: ContentProps) {
  const [stop, setStop] = useState<boolean>(true);
  const [paused, setPaused] = useState<boolean>(true);
  const willStop = useRef<NodeJS.Timeout | null>(null);

  const clearWillStop = useCallback(() => {
    if (willStop.current) clearTimeout(willStop.current);
    willStop.current = null;
  }, []);

  useEffect(() => {
    if (short === 1) {
      if (paused) setPaused(false);
      if (stop) setStop(false);
    } else {
      if (!paused) setPaused(true);
      if (!stop) willStop.current = setTimeout(() => setStop(true), duration);
    }

    return clearWillStop;
  }, [short]);

  return <Lottie options={lottieOption} isPaused={paused} isStopped={stop} />;
}

export default withActor({ className: 'fox-turtle' })(FoxTurtle);
