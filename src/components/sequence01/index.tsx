import React, { useMemo, useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';

import data from 'static/animation/sequence01.json';
import styleScene01 from 'styles/page/scene01.module.scss';
import UseSequnce from 'modules/hooks/use-sequence';
import { callAfterRerender } from 'modules/helper';

import Title from 'components/sequence01/title';
import UnderLine from 'components/sequence01/under-line';
import SubTitle from 'components/sequence01/sub-title';
import Lion from 'components/sequence01/lion';

const cxScene = classNames.bind(styleScene01);
const info = data.cuts.container;

interface Sequence01rops {
  scene: number;
  progress: number;
  appWidth: number;
  appHeight: number;
  registAction: (regist: boolean) => void;
}

function Sequence01({ scene, progress, appWidth, appHeight, registAction }: Sequence01rops) {
  const [short, setShort] = useState(0); // 현재 Sequence Short 번호
  const endScene = useMemo(() => data.shortDest.length + data.startScene, []); // 더이상 진행할 내용일 없는 Scene 번호

  const container = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  const containerClass = useMemo(() => cxScene('container'), []);
  const stageClass = useMemo(() => cxScene('stage'), []);

  const { load, style, targetWidth, targetHeight } = UseSequnce({
    short,
    progress,
    target: container.current,
    duration: data.duration,
    stageWidth: appWidth,
    stageHeight: appHeight,
    data: info,
  });

  //  하위 컴포너트가 필요한 것은 Container의 사이즈가 아니라 Stage의 사이즈입니다.
  const [stageWidth, stageHeight] = useMemo(() => {
    if (!stage.current) return [0, 0];
    return [stage.current.clientWidth, stage.current.clientHeight];
  }, [stage.current, targetWidth, targetHeight]);

  // Scene에 해당하는 목표 Short 번호에 맞게 다음 Short 번호를 설정합니다.
  useEffect(() => {
    if (load && scene < endScene && scene >= data.startScene) {
      const current = scene - data.startScene;
      const shortDest = data.shortDest[current];

      if (short !== shortDest) {
        // Short의 변경이 필요하다면 Action 실행을 등록합니다.
        const shortNext = shortDest > short ? short + 1 : shortDest;
        // useState로 short를 변경하게되면, Repaint가 수행되기 전에 short 번호가 변경되는 것 같습니다.
        // 그로인해 short가 before load => 0 => 1이 아니라, before load => 1이 반영됩니다.
        // requestAnimationFrame을 render 전에 다시 한번 요청하는 트릭을 사용해서 해결합니다.
        callAfterRerender(() => setShort(shortNext));
        registAction(true);
      }
    }
  }, [load, scene]);

  // Short가 변경되면 Transalte 동작 후 목표 Short 번호에 맞게 Actrion을 진행합니다.
  useEffect(() => {
    if (load) {
      const shortDest = data.shortDest[scene - 1];
      const isFinish = shortDest === short;
      const nextShort = short + 1;

      setTimeout(() => {
        // Short가 목표치에 도달하면 Action을 종료합니다.
        if (isFinish) registAction(false);
        // Short가 목표치에 도달하지 목하면 다음 short로 이동합니다.
        else setShort(nextShort);
      }, data.duration);
    }
  }, [short]);

  return (
    <div className={containerClass} style={style} ref={container}>
      <div className={stageClass} ref={stage}>
        <Title short={short} progress={progress} stageWidth={stageWidth} stageHeight={stageHeight} />
        <UnderLine short={short} progress={progress} stageWidth={stageWidth} stageHeight={stageHeight} />
        <SubTitle short={short} progress={progress} stageWidth={stageWidth} stageHeight={stageHeight} />
        <Lion short={short} progress={progress} stageWidth={stageWidth} stageHeight={stageHeight} />
      </div>
    </div>
  );
}

export default Sequence01;
