import React, { useMemo, useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Lottie from 'react-lottie';

import data from 'static/animation/sequence01.json';
import svg from 'static/svg/scroll.json';
import styleSequence from 'styles/page/sequence01.module.scss';
import UseShort from 'modules/hooks/use-short';

const cxSequence = classNames.bind(styleSequence);
const info = data.cuts.scroll;

interface ScrollProps {
  short: number;
  nextShort: number;
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

function Scroll({ short, nextShort, progress, stageWidth, stageHeight }: ScrollProps) {
  const target = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState<boolean>(false);
  const lionClass = useMemo(() => cxSequence('scroll'), []);

  const { style } = UseShort({
    short,
    nextShort,
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
