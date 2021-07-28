import React, { useMemo } from 'react';
import classNames from 'classnames/bind';

import styleScene01 from 'styles/page/scene01.module.scss';

const cxScene = classNames.bind(styleScene01);

function Scene01() {
  const sceneClassName = useMemo(() => cxScene('scene'), []);
  const stageClassName = useMemo(() => cxScene('stage'), []);

  return (
    <div className={sceneClassName}>
      <div className={stageClassName} />
    </div>
  );
}

export default Scene01;
