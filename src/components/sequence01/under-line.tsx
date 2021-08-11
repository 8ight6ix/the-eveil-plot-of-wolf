import React, { useMemo, useRef } from 'react';
import classNames from 'classnames/bind';

import data from 'static/animation/sequence01.json';
import styleScene01 from 'styles/page/scene01.module.scss';
import UseSequnce from 'modules/hooks/use-sequence';

const cxScene = classNames.bind(styleScene01);
const info = data.cuts.underLine;

interface UnderLineProps {
  short: number;
  progress: number;
  stageWidth: number;
  stageHeight: number;
}

function UnderLine({ short, progress, stageWidth, stageHeight }: UnderLineProps) {
  const target = useRef<HTMLDivElement>(null);
  const underLineClass = useMemo(() => cxScene('under-line'), []);

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

  return <div className={underLineClass} style={style} ref={target} />;
}

export default UnderLine;
