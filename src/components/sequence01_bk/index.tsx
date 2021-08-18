import React, { useMemo, useRef } from 'react';
import classNames from 'classnames/bind';

import data from 'static/animation/sequence01.json';
import styleSequence from 'styles/page/sequence01.module.scss';
import UseShort from 'modules/hooks/use-short';
import UseSequence from 'modules/hooks/use-sequence';

import Title from 'components/sequence01_bk/title';
import UnderLine from 'components/sequence01_bk/under-line';
import SubTitle from 'components/sequence01_bk/sub-title';
import Lion from 'components/sequence01_bk/lion';
import Scroll from 'components/sequence01_bk/scroll';
import Text from 'components/sequence01_bk/text';

const cxSequence = classNames.bind(styleSequence);
const info = data.cuts.container;

interface Sequence01Props {
  scene: number;
  progress: number;
  appWidth: number;
  appHeight: number;
  registAction: (regist: boolean) => void;
}

function Sequence01({ scene, progress, appWidth, appHeight, registAction }: Sequence01Props) {
  const container = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  const containerClass = useMemo(() => cxSequence('container'), []);
  const stageClass = useMemo(() => cxSequence('stage'), []);

  const { short, nextShort } = UseSequence({ scene, progress, data, registAction });
  const { style, targetWidth, targetHeight } = UseShort({
    short,
    nextShort,
    progress,
    target: container.current,
    duration: data.duration,
    shortEnd: data.shortEnd,
    stageWidth: appWidth,
    stageHeight: appHeight,
    data: info,
  });

  //  하위 컴포너트가 필요한 것은 Container의 사이즈가 아니라 Stage의 사이즈입니다.
  const [stageWidth, stageHeight] = useMemo(() => {
    if (!stage.current) return [0, 0];
    return [stage.current.clientWidth, stage.current.clientHeight];
  }, [stage.current, targetWidth, targetHeight]);

  return (
    <div className={containerClass} style={style} ref={container}>
      <div className={stageClass} ref={stage}>
        <Title
          short={short}
          nextShort={nextShort}
          progress={progress}
          stageWidth={stageWidth}
          stageHeight={stageHeight}
        />
        <UnderLine
          short={short}
          nextShort={nextShort}
          progress={progress}
          stageWidth={stageWidth}
          stageHeight={stageHeight}
        />
        <SubTitle
          short={short}
          nextShort={nextShort}
          progress={progress}
          stageWidth={stageWidth}
          stageHeight={stageHeight}
        />
        <Lion
          short={short}
          nextShort={nextShort}
          progress={progress}
          stageWidth={stageWidth}
          stageHeight={stageHeight}
        />
        <Scroll
          short={short}
          nextShort={nextShort}
          progress={progress}
          stageWidth={stageWidth}
          stageHeight={stageHeight}
        />
        <Text
          short={short}
          nextShort={nextShort}
          progress={progress}
          stageWidth={stageWidth}
          stageHeight={stageHeight}
        />
      </div>
    </div>
  );
}

export default Sequence01;
