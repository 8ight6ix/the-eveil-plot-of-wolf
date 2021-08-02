import React, { useMemo, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { parseRowDatas, parseAnimation, parseStyle } from 'utils/animation';
import aniInfo from 'statics/animation/sequence01.json';
import styleScene01 from 'styles/page/scene01.module.scss';

const cxScene = classNames.bind(styleScene01);

interface Sequence01rops {
  scene: number;
  progress: number;
  width: number;
  height: number;
  registAction: (regist: boolean) => void;
}

function Sequence01({ scene, progress, width, height, registAction }: Sequence01rops) {
  const [short, setShort] = useState(0); // 현재 Sequence Short 번호

  const containerClass = useMemo(() => cxScene('container'), []);
  const stageClass = useMemo(() => cxScene('stage'), []);

  // Animation 정보를 활용해 Transform Style Object를 만듭니다.
  const animtions = useMemo(() => parseRowDatas(aniInfo.cuts.container), []);
  const style = useMemo(() => {
    const { baseWith, baseHeight } = aniInfo;
    const ani = parseAnimation(short, progress, animtions);
    return parseStyle(ani, baseWith, baseHeight, width, height);
  }, [animtions, short, progress, width, height]);

  // FIXME: mout state 추가해서, translate 뒤 늦게 추가

  // Scene에 해당하는 목표 Short 번호에 맞게 다음 Short 번호를 설정합니다.
  useEffect(() => {
    const shortDest = aniInfo.shortDest[scene];
    if (short !== shortDest) {
      // Short의 변경이 필요하다면 Action 실행을 등록합니다.
      const shortNext = shortDest > short ? short + 1 : shortDest;
      setShort(shortNext);
      registAction(true);
    }
  }, [scene]);

  // Short가 변경되면 Transalte 동작 후 목표 Short 번호에 맞게 Actrion을 진행합니다.
  useEffect(() => {
    const shortDest = aniInfo.shortDest[scene];
    const isFinish = shortDest === short;
    const nextShort = short + 1;

    setTimeout(() => {
      // Short가 목표치에 도달하면 Action을 종료합니다.
      if (isFinish) registAction(false);
      // Short가 목쵸피에 도달하지 목하면 다음 short로 이동합니다.
      else setShort(nextShort);
    }, aniInfo.duration);
  }, [short]);

  return (
    <div className={containerClass} style={style}>
      <div className={stageClass} />
    </div>
  );
}

export default Sequence01;
