import React, { useMemo, useRef } from 'react';
import classNames from 'classnames/bind';

import data from 'static/animation/sequence01.json';
import styleScene01 from 'styles/page/scene01.module.scss';
import UseSequnce from 'modules/hooks/use-sequence';

const cxScene = classNames.bind(styleScene01);
const info = data.cuts.text;

interface TextProps {
  short: number;
  progress: number;
  stageWidth: number;
  stageHeight: number;
}

function Text({ short, progress, stageWidth, stageHeight }: TextProps) {
  const target = useRef<HTMLDivElement>(null);
  const textCalss = useMemo(() => cxScene('text', 'font-main-ko'), []);

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

  return (
    <p style={style} ref={target} className={textCalss}>
      동물들의 왕 사자가 병이 들어 누워 있었습니다.
    </p>
  );
}

export default Text;
