import React, { useMemo, useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import { parseRowDatas, parseAnimation, parseStyle } from 'utils/animation';
import data from 'statics/animation/sequence01.json';
import styleScene01 from 'styles/page/scene01.module.scss';

const cxScene = classNames.bind(styleScene01);
const info = data.cuts.title;

interface TitleProps {
  short: number;
  progress: number;
  stageWidth: number;
  stageHeight: number;
}

function Title({ short, progress, stageWidth, stageHeight }: TitleProps) {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [_load, setLoad] = useState(false);
  const titleClass = useMemo(() => cxScene('title', 'font-title-en'), []);

  const target = useRef<HTMLDivElement>(null);
  const [targetWidth, targetHeight] = useMemo(() => {
    if (!target.current) return [0, 0];
    return [target.current.clientWidth, target.current.clientHeight];
  }, [target.current, stageWidth, stageHeight]);

  // Animation 정보를 활용해 Transform Style Object를 만듭니다.
  const animtions = useMemo(() => parseRowDatas(info.animation), []);
  const style = useMemo(() => {
    const { baseWidth, baseHeight } = info;
    const ani = parseAnimation(short, progress, animtions);
    return parseStyle({ ani, baseWidth, baseHeight, stageWidth, stageHeight, targetWidth, targetHeight });
  }, [animtions, short, progress, targetWidth, targetHeight]);

  // Component가 Load되면 사이즈 재 측정 등의 로직을 수행해야 합니다.
  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <span style={style} ref={target} className={titleClass}>
      Aesop’s Fables
    </span>
  );
}

export default Title;
