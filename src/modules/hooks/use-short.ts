import { useState, useMemo, useEffect } from 'react';

import { AnimtaionRowData } from 'modules/animation/model';
import { parseRowDatas, parseAnimation, parseStyle } from 'modules/animation';

interface UuseShortData {
  baseWidth: number;
  baseHeight: number;
  animationData: AnimtaionRowData[];
}

interface useShorteProps {
  short: number;
  progress: number;
  target: HTMLElement | null;
  duration: number;
  shortEnd: number;
  stageWidth: number;
  stageHeight: number;
  data: UuseShortData;
}

function useShort({ short, progress, target, duration, shortEnd, stageWidth, stageHeight, data }: useShorteProps) {
  const [load, setLoad] = useState(false);
  const { baseHeight, baseWidth, animationData } = data;

  // Traget의 사이즈를 수집합니다.
  const [targetWidth, targetHeight] = useMemo(() => {
    if (!target) return [0, 0];
    return [target.clientWidth, target.clientHeight];
  }, [target, stageWidth, stageHeight]);

  /* ********************************** */
  /* Create Animation CSS Style Object  */
  /* ********************************** */

  const animationList = useMemo(() => parseRowDatas(animationData, shortEnd), []); // json 데이터를 파싱합니다.
  const animation = useMemo(() => parseAnimation(short, progress, animationList), [short, progress]); // progress 수치를 대입한 Animation 객체를 생성합니다.
  const trans = useMemo(() => load && short > 0, [load, short]); // load가 끝나기 전과 첫 short에서는 Transition으 적용하지 않습니다.

  const style = useMemo(() => {
    const opts = { trans, duration, baseWidth, baseHeight, stageWidth, stageHeight, targetWidth, targetHeight };
    return parseStyle(animation, load, opts);
  }, [trans, duration, baseWidth, baseHeight, stageWidth, stageHeight, targetWidth, targetHeight, animation, load]);

  /* ****************** */
  /* After Load Action  */
  /* ****************** */

  // Component가 Load되면 사이즈 재 측정 등의 로직을 수행해야 합니다.
  useEffect(() => {
    setLoad(true);
  }, []);

  return { load, style, targetWidth, targetHeight };
}

export default useShort;
