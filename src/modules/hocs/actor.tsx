import React, { useRef, useMemo } from 'react';
import { Argument } from 'classnames';

import useShort, { UseShortData } from 'modules/hooks/use-short';

export interface ActorConfigs {
  className: string;
}

export interface ContentProps {
  short: number;
  shortEnd: number;
}

export interface ActorCommonProps {
  short: number;
  nextShort: number;
  progress: number;
  stageWidth: number;
  stageHeight: number;

  shortEnd: number;
  duration: number;

  cxSequence: (...args: Argument[]) => string;
}

export interface ActorProps {
  common: ActorCommonProps;
  data: UseShortData;
}

const withActor =
  ({ className }: ActorConfigs) =>
  (WrapperComponent: (prop: ContentProps) => JSX.Element) =>
  ({
    common: { short, nextShort, progress, stageWidth, stageHeight, shortEnd, duration, cxSequence },
    data,
  }: ActorProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const name = useMemo(() => cxSequence(className.split(' ')), [cxSequence, className]);

    const { style } = useShort({
      short,
      nextShort,
      progress,
      target: ref.current,
      duration,
      shortEnd,
      stageWidth,
      stageHeight,
      data,
    });

    return (
      <div ref={ref} style={style} className={name}>
        <WrapperComponent short={short} shortEnd={shortEnd} />
      </div>
    );
  };

export default withActor;
