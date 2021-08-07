import { useState, useMemo, useEffect } from 'react';

import { InformationRowData } from 'modules/animation/model';
import { parseRowDatas, parseAnimation, parseStyle } from 'modules/animation';

interface UseSequenceProps {
  short: number;
  progress: number;
  target: HTMLElement | null;
  stageWidth: number;
  stageHeight: number;
  baseWidth: number;
  baseHeight: number;
  animationInfo: InformationRowData[];
}

function UseSequence({
  short,
  progress,
  target,
  stageWidth,
  stageHeight,
  baseWidth,
  baseHeight,
  animationInfo,
}: UseSequenceProps) {
  const [load, setLoad] = useState(false);

  // Traget의 사이즈를 수집합니다.
  const [targetWidth, targetHeight] = useMemo(() => {
    if (!target) return [0, 0];
    return [target.clientWidth, target.clientHeight];
  }, [target, stageWidth, stageHeight]);

  // Animation 정보를 활용해 Transform Style Object를 만듭니다.
  const animtions = useMemo(() => parseRowDatas(animationInfo), []);
  const style = useMemo(() => {
    const ani = parseAnimation(short, progress, animtions);
    return parseStyle({ ani, baseWidth, baseHeight, stageWidth, stageHeight, targetWidth, targetHeight });
  }, [animtions, short, progress, targetWidth, targetHeight]);

  // Component가 Load되면 사이즈 재 측정 등의 로직을 수행해야 합니다.
  useEffect(() => {
    setLoad(true);
  }, []);

  return { load, style, targetWidth, targetHeight };
}

export default UseSequence;
