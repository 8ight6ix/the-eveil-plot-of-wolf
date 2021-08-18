import React from 'react';

import withSequence, { ContentProps } from 'modules/hocs/sequence';
import styleSequence from 'styles/page/sequence03.module.scss';
import data from 'static/animation/sequence03.json';

// eslint-disable-next-line no-unused-vars
function Sequence03({ common }: ContentProps) {
  return <></>;
}

export default withSequence({
  cx: styleSequence,
  containerClassName: 'container',
  stageClassName: 'stage',
  startScene: data.startScene,
  duration: data.duration,
  shortEnd: data.shortEnd,
  shortDest: data.shortDest,
  data: data.cuts.container,
})(Sequence03);
