import React, { useMemo, useRef } from 'react';
import classNames from 'classnames/bind';

import data from 'static/animation/sequence03.json';
import styleSequence from 'styles/page/sequence03.module.scss';
import UseShort from 'modules/hooks/use-short';
import UseSequence from 'modules/hooks/use-sequence';

const cxSequence = classNames.bind(styleSequence);
const info = data.cuts.container;

interface Sequence03Props {
  scene: number;
  progress: number;
  appWidth: number;
  appHeight: number;
  registAction: (regist: boolean) => void;
}

function Sequence03({ scene, progress, appWidth, appHeight, registAction }: Sequence03Props) {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [stageWidth, stageHeight] = useMemo(() => {
    if (!stage.current) return [0, 0];
    return [stage.current.clientWidth, stage.current.clientHeight];
  }, [stage.current, targetWidth, targetHeight]);

  return (
    <div className={containerClass} style={style} ref={container}>
      <div className={stageClass} ref={stage} />
    </div>
  );
}

export default Sequence03;
