import React, { useRef, useMemo } from 'react';
import classNames from 'classnames/bind';

import { ActorCommonProps } from 'modules/hocs/actor';
import UseSequence from 'modules/hooks/use-sequence';
import useShort, { UseShortData } from 'modules/hooks/use-short';

export interface SequenceConfig {
  cx: { readonly [key: string]: string };
  containerClassName: string;
  stageClassName: string;

  startScene: number;
  duration: number;
  shortEnd: number;
  shortDest: number[];

  data: UseShortData;
}

export interface ContentProps {
  common: ActorCommonProps;
}

export interface SequenceProp {
  scene: number;
  progress: number;
  appWidth: number;
  appHeight: number;

  registAction: (regist: boolean) => void;
}

const withSequence = ({
  cx,
  containerClassName,
  stageClassName,
  startScene,
  duration,
  shortEnd,
  shortDest,
  data: shortData,
}: SequenceConfig) => {
  const cxSequence = classNames.bind(cx);
  const containerName = cxSequence(containerClassName.split(' '));
  const stageName = cxSequence(stageClassName.split(' '));
  const seqData = { duration, startScene, shortDest, shortEnd };

  return (WrapperComponent: (prop: ContentProps) => JSX.Element) =>
    ({ scene, progress, appWidth, appHeight, registAction }: SequenceProp) => {
      const containerRef = useRef<any>(null);
      const stageRef = useRef<any>(null);

      const { short, nextShort } = UseSequence({ scene, progress, data: seqData, registAction });
      const { style, targetWidth, targetHeight } = useShort({
        short,
        nextShort,
        progress,
        target: containerRef.current,
        duration,
        shortEnd,
        stageWidth: appWidth,
        stageHeight: appHeight,
        data: shortData,
      });

      //  하위 컴포너트가 필요한 것은 Container의 사이즈가 아니라 Stage의 사이즈입니다.
      const [stageWidth, stageHeight] = useMemo(() => {
        if (!stageRef.current) return [0, 0];
        return [stageRef.current.clientWidth, stageRef.current.clientHeight];
      }, [stageRef.current, targetWidth, targetHeight]);

      const common = useMemo(
        () => ({ short, nextShort, progress, stageWidth, stageHeight, shortEnd, duration, cxSequence }),
        [short, nextShort, progress, stageWidth, stageHeight, shortEnd, duration, cxSequence],
      );

      return (
        <div className={containerName} style={style} ref={containerRef}>
          <div className={stageName} ref={stageRef}>
            <WrapperComponent common={common} />
          </div>
        </div>
      );
    };
};

export default withSequence;
