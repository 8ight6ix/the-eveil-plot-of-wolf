import React, { useMemo, useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';

import data from 'statics/animation/sequence01.json';
import styleScene01 from 'styles/page/scene01.module.scss';
import UseSequnce from 'modules/hooks/use-sequence';
import Title from 'components/sequence01/title';

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
  const [short, setShort] = useState(0); // 현재 Sequence Short 번호
  const endScene = useMemo(() => data.shortDest.length + data.startScene, []); // 더이상 진행할 내용일 없는 Scene 번호
  const target = useRef<HTMLDivElement>(null);

  const containerClass = useMemo(() => cxScene('container'), []);
  const stageClass = useMemo(() => cxScene('stage'), []);

  const { style, targetWidth, targetHeight } = UseSequnce({
    short,
    progress,
    target: target.current,
    stageWidth,
    stageHeight,
    baseWidth: info.baseWidth,
    baseHeight: info.baseHeight,
    animationInfo: info.animation,
  });

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

  return (
    <div className={containerClass} style={style}>
      <div className={stageClass} ref={target}>
        <Title short={short} progress={progress} stageWidth={targetWidth} stageHeight={targetHeight} />
      </div>
    </div>
  );
}

export default Sequence01;
