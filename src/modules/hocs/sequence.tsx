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
  registAction: (key: Symbol, regist: boolean) => void;
}

export interface SequenceProp {
  scene: number;
  progress: number;
  appWidth: number;
  appHeight: number;

  registAction: (key: Symbol, regist: boolean) => void;
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
    ({ scene, progress: _progress, appWidth, appHeight, registAction }: SequenceProp) => {
      const containerRef = useRef<any>(null);
      const stageRef = useRef<any>(null);

      // start scene에 도달하지 못하면 progress는 0입니다.
      const progress = useMemo(() => (scene >= startScene ? _progress : 0), [scene, startScene, _progress]);

      const { short, nextShort } = UseSequence({
        key: WrapperComponent.name,
        scene,
        progress,
        data: seqData,
        registAction,
      });

      const { style, targetWidth, targetHeight } = useShort({
        short,
        nextShort,
        progress,
        target: containerRef.current,
        startScene,
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

      // Actor들의 공통된 데이터를 만듭니다.
      const common = useMemo(() => {
        return { short, nextShort, progress, stageWidth, stageHeight, shortEnd, startScene, duration, cxSequence };
      }, [short, nextShort, progress, stageWidth, stageHeight, shortEnd, startScene, duration, cxSequence]);

      return (
        <div className={containerName} style={style} ref={containerRef}>
          <div className={stageName} ref={stageRef}>
            <WrapperComponent common={common} registAction={registAction} />
          </div>
        </div>
      );
    };
};

export default withSequence;
