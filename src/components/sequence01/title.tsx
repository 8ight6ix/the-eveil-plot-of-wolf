import React, { useMemo, useRef } from 'react';
import classNames from 'classnames/bind';

import data from 'static/animation/sequence01.json';
import styleScene01 from 'styles/page/scene01.module.scss';
import UseSequnce from 'modules/hooks/use-sequence';

const cxScene = classNames.bind(styleScene01);
const info = data.cuts.title;

interface TitleProps {
  short: number;
  progress: number;
  stageWidth: number;
  stageHeight: number;
}

function Title({ short, progress, stageWidth, stageHeight }: TitleProps) {
  const target = useRef<HTMLDivElement>(null);
  const titleClass = useMemo(() => cxScene('title', 'font-title-en'), []);

  const { style } = UseSequnce({
    short,
    progress,
    target: target.current,
    duration: data.duration,
    stageWidth,
    stageHeight,
    baseWidth: info.baseWidth,
    baseHeight: info.baseHeight,
    animationInfo: info.animation,
  });

  return (
    <span style={style} ref={target} className={titleClass}>
      Aesop’s Fables
    </span>
  );
}

export default Title;
