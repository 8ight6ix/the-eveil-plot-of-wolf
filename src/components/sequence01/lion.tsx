import React, { useMemo, useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Lottie from 'react-lottie';

import data from 'static/animation/sequence01.json';
import svg from 'static/svg/lion.json';
import styleScene01 from 'styles/page/scene01.module.scss';
import UseShort from 'modules/hooks/use-short';

const cxScene = classNames.bind(styleScene01);
const info = data.cuts.lion;

interface LionProps {
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

function Lion({ short, nextShort, progress, stageWidth, stageHeight }: LionProps) {
  const target = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState<boolean>(false);
  const lionClass = useMemo(() => cxScene('lion'), []);

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
    setPlay(short < 4);
  }, [short]);

  return (
    <div style={style} ref={target} className={lionClass}>
      <Lottie options={lottieOption} isPaused={!play} />
    </div>
  );
}

export default Lion;
