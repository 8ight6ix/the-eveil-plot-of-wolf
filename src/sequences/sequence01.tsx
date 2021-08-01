/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import React, { useMemo, useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';

import { parseRowDatas, parseAnimation, parseStyle, neadAsync } from 'utils/animation';
import aniInfo from 'statics/animation/sequence01.json';
import styleScene01 from 'styles/page/scene01.module.scss';

const cxScene = classNames.bind(styleScene01);

interface Sequence01rops {
  scene: number;
  progress: number;
  width: number;
  height: number;
  actionFlag: boolean;
  registAction: (regist: boolean) => void;
}

function Sequence01({ scene, progress, width, height, actionFlag, registAction }: Sequence01rops) {
  const [short, setShort] = useState(0);
  const prevScene = useRef(1);

  const containerClass = useMemo(() => cxScene('container'), []);
  const stageClass = useMemo(() => cxScene('stage'), []);

  const animtions = useMemo(() => parseRowDatas(aniInfo.cuts.container), []);
  const style = useMemo(() => {
    const { baseWith, baseHeight } = aniInfo;
    const ani = parseAnimation(short, progress, animtions);
    return parseStyle(ani, baseWith, baseHeight, width, height);
  }, [animtions, short, progress, width, height]);

  useEffect(() => {
    if (progress === 100 && actionFlag) {
      if (neadAsync(short, progress, aniInfo.asyncs)) {
        registAction(true);
        setTimeout(() => registAction(false), 1200);
      }
    }
  }, [progress, actionFlag]);

  useEffect(() => {
    if (scene >= aniInfo.startScene) {
      if (scene > prevScene.current) setShort(short + 1);
      else if (scene < prevScene.current) setShort(short - 1);
      prevScene.current = short;
    }
  }, [scene]);

  return (
    <div className={containerClass} style={style}>
      <div className={stageClass} />
    </div>
  );
}

export default Sequence01;
