import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';

import withActor, { ContentProps } from 'modules/hocs/actor';
import svg from 'static/svg/scroll.json';

const lottieOption = {
  loop: true,
  autoplay: true,
  animationData: svg,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

function Scroll({ short }: ContentProps) {
  const [play, setPlay] = useState<boolean>(false);

  useEffect(() => {
    setPlay(short === 2);
  }, [short]);

  return <Lottie options={lottieOption} isPaused={!play} />;
}

export default withActor({ className: 'scroll' })(Scroll);
