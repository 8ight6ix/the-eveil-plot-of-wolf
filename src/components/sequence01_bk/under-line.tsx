import React, { useMemo, useRef } from 'react';
import classNames from 'classnames/bind';

import data from 'static/animation/sequence01.json';
import styleSequence from 'styles/page/sequence01.module.scss';
import UseShort from 'modules/hooks/use-short';

const cxSequence = classNames.bind(styleSequence);
const info = data.cuts.underLine;

interface UnderLineProps {
  short: number;
  nextShort: number;
  progress: number;
  stageWidth: number;
  stageHeight: number;
}

function UnderLine({ short, nextShort, progress, stageWidth, stageHeight }: UnderLineProps) {
  const target = useRef<HTMLDivElement>(null);
  const underLineClass = useMemo(() => cxSequence('under-line'), []);

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

  return <div className={underLineClass} style={style} ref={target} />;
}

export default UnderLine;
