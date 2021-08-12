import React, { useMemo, useRef } from 'react';
import classNames from 'classnames/bind';

import data from 'static/animation/sequence01.json';
import styleScene01 from 'styles/page/scene01.module.scss';
import UseShort from 'modules/hooks/use-short';

const cxScene = classNames.bind(styleScene01);
const info = data.cuts.text;

interface TextProps {
  short: number;
  nextShort: number;
  progress: number;
  stageWidth: number;
  stageHeight: number;
}

function Text({ short, nextShort, progress, stageWidth, stageHeight }: TextProps) {
  const target = useRef<HTMLDivElement>(null);
  const textCalss = useMemo(() => cxScene('text', 'font-main-ko'), []);

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
    <div style={style} ref={target} className={textCalss}>
      <p>동물들의 왕 사자가 병이 들어 누워 있었습니다.</p>
    </div>
  );
}

export default Text;
