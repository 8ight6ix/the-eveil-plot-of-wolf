import React, { useEffect, useCallback, useRef, useMemo, useState } from 'react';
import Lottie from 'react-lottie';

import withActor, { ContentProps } from 'modules/hocs/actor';
import svg from 'static/svg/fox-turtle.json';

const lottieOption = {
  loop: false,
  autoplay: false,
  animationData: svg,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

function FoxTurtle({ short, duration, registAction }: ContentProps) {
  const preShort = useRef<number>(short);
  const willStop = useRef<NodeJS.Timeout | null>(null);

  const actionKey = useMemo(() => Symbol('fox-turtle'), []);
  const [stop, setStop] = useState<boolean>(true);

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

  useEffect(() => {
    if (preShort.current === 0 && short === 1) {
      if (registAction) registAction(actionKey, true);
      setStop(false);
    } else if (preShort.current === 1 && short === 0) {
      willStop.current = setTimeout(() => setStop(true), duration);
    }

    preShort.current = short;
    return clearWillStop;
  }, [short]);

  return <Lottie options={lottieOption} eventListeners={eventListeners} isStopped={stop} />;
}

export default withActor({ className: 'fox-turtle' })(FoxTurtle);
