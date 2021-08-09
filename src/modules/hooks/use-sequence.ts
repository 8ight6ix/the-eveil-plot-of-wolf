import { useState, useMemo, useEffect } from 'react';

import { AnimtaionRowData } from 'modules/animation/model';
import { parseRowDatas, parseAnimation, parseStyle } from 'modules/animation';

interface UseSequenceData {
  baseWidth: number;
  baseHeight: number;
  animationData: AnimtaionRowData[];
}

interface UseSequenceProps {
  short: number;
  progress: number;
  target: HTMLElement | null;
  duration: number;
  stageWidth: number;
  stageHeight: number;
  data: UseSequenceData;
}

function UseSequence({ short, progress, target, duration, stageWidth, stageHeight, data }: UseSequenceProps) {
  const [load, setLoad] = useState(false);
  const { baseHeight, baseWidth, animationData } = data;

  // Traget의 사이즈를 수집합니다.
  const [targetWidth, targetHeight] = useMemo(() => {
    if (!target) return [0, 0];
    return [target.clientWidth, target.clientHeight];
  }, [target, stageWidth, stageHeight]);

  // Animation 정보를 활용해 Transform Style Object를 만듭니다.
  const animtions = useMemo(() => parseRowDatas(animationData), []);
  const style = useMemo(() => {
    const ani = parseAnimation(short, progress, animtions); // progress 수치를 대입한 새로운 Animation 객체를 생성합니다.
    const trans = load && short > 0; // 로드가 완료되지 않았거나, 첫 short일 떄는 transition이 필요하지 않습니다.
    const opts = { trans, duration, baseWidth, baseHeight, stageWidth, stageHeight, targetWidth, targetHeight };
    return parseStyle(ani, load, opts);
  }, [short, progress, animtions, load, duration, baseWidth, baseHeight, targetWidth, targetHeight]);

  // Component가 Load되면 사이즈 재 측정 등의 로직을 수행해야 합니다.
  useEffect(() => {
    setLoad(true);
  }, []);

  return { load, style, targetWidth, targetHeight };
}

export default UseSequence;
