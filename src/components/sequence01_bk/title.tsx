import React, { useMemo, useRef } from 'react';
import classNames from 'classnames/bind';

import data from 'static/animation/sequence01.json';
import svg from 'static/svg/title.svg';
import styleSequence from 'styles/page/sequence01.module.scss';
import UseShort from 'modules/hooks/use-short';

const cxSequence = classNames.bind(styleSequence);
const info = data.cuts.title;

interface TitleProps {
  short: number;
  nextShort: number;
  progress: number;
  stageWidth: number;
  stageHeight: number;
}

function Title({ short, nextShort, progress, stageWidth, stageHeight }: TitleProps) {
  const target = useRef<HTMLDivElement>(null);
  const titleClass = useMemo(() => cxSequence('title', 'font-title-en'), []);

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

  return (
    <div style={style} ref={target} className={titleClass}>
      <img src={svg} alt="title" />
    </div>
  );
}

export default Title;
