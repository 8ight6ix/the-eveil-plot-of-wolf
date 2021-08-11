import React, { useMemo, useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Lottie from 'react-lottie';

import data from 'static/animation/sequence01.json';
import svg from 'static/svg/scroll.json';
import styleScene01 from 'styles/page/scene01.module.scss';
import UseSequnce from 'modules/hooks/use-sequence';

const cxScene = classNames.bind(styleScene01);
const info = data.cuts.scroll;

interface ScrollProps {
  short: number;
  progress: number;
  stageWidth: number;
  stageHeight: number;
}

const lottieOption = {
  loop: true,
  autoplay: true,
  animationData: svg,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

function Scroll({ short, progress, stageWidth, stageHeight }: ScrollProps) {
  const target = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState<boolean>(false);
  const lionClass = useMemo(() => cxScene('scroll'), []);

  const { style } = UseSequnce({
    short,
    progress,
    target: target.current,
    duration: data.duration,
    shortEnd: data.shortEnd,
    stageWidth,
    stageHeight,
    data: info,
  });

  useEffect(() => {
    setPlay(short === 2);
  }, [short]);

  return (
    <div style={style} ref={target} className={lionClass}>
      <Lottie options={lottieOption} isPaused={!play} />
    </div>
  );
}

export default Scroll;
