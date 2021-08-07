import React, { useMemo, useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';

import { parseRowDatas, parseAnimation, parseStyle } from 'utils/animation';
import data from 'statics/animation/sequence01.json';
import styleScene01 from 'styles/page/scene01.module.scss';

import Title from 'sequences/sequence01/title';

const cxScene = classNames.bind(styleScene01);
const info = data.cuts.container;

interface Sequence01rops {
  scene: number;
  progress: number;
  stageWidth: number;
  stageHeight: number;
  registAction: (regist: boolean) => void;
}

function Sequence01({ scene, progress, stageWidth, stageHeight, registAction }: Sequence01rops) {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [_load, setLoad] = useState(false);
  const [short, setShort] = useState(0); // 현재 Sequence Short 번호
  const endScene = useMemo(() => data.shortDest.length + data.startScene, []); // 더이상 진행할 내용일 없는 Scene 번호

  const target = useRef<HTMLDivElement>(null);
  const [targetWidth, targetHeight] = useMemo(() => {
    if (!target.current) return [0, 0];
    return [target.current.clientWidth, target.current.clientHeight];
  }, [target.current, stageWidth, stageHeight]);

  const containerClass = useMemo(() => cxScene('container'), []);
  const stageClass = useMemo(() => cxScene('stage'), []);

  // Animation 정보를 활용해 Transform Style Object를 만듭니다.
  const animtions = useMemo(() => parseRowDatas(info.animation), []);
  const style = useMemo(() => {
    const { baseWidth, baseHeight } = info;
    const ani = parseAnimation(short, progress, animtions);
    return parseStyle({ ani, baseWidth, baseHeight, stageWidth, stageHeight, targetWidth, targetHeight });
  }, [animtions, short, progress, targetWidth, targetHeight]);

  // Scene에 해당하는 목표 Short 번호에 맞게 다음 Short 번호를 설정합니다.
  useEffect(() => {
    if (scene < endScene && scene >= data.startScene) {
      const current = scene - data.startScene;
      const shortDest = data.shortDest[current];

      if (short !== shortDest) {
        // Short의 변경이 필요하다면 Action 실행을 등록합니다.
        const shortNext = shortDest > short ? short + 1 : shortDest;
        setShort(shortNext);
        registAction(true);
      }
    }
  }, [scene, endScene]);

  // Short가 변경되면 Transalte 동작 후 목표 Short 번호에 맞게 Actrion을 진행합니다.
  useEffect(() => {
    const shortDest = data.shortDest[scene - 1];
    const isFinish = shortDest === short;
    const nextShort = short + 1;

    setTimeout(() => {
      // Short가 목표치에 도달하면 Action을 종료합니다.
      if (isFinish) registAction(false);
      // Short가 목쵸피에 도달하지 목하면 다음 short로 이동합니다.
      else setShort(nextShort);
    }, data.duration);
  }, [short]);

  // Component가 Load되면 사이즈 재 측정 등의 로직을 수행해야 합니다.
  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <div className={containerClass} style={style}>
      <div className={stageClass} ref={target}>
        <Title short={short} progress={progress} stageWidth={targetWidth} stageHeight={targetHeight} />
      </div>
    </div>
  );
}

export default Sequence01;
