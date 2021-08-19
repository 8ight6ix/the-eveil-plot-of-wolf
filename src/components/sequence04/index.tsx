import React from 'react';

import withSequence, { ContentProps } from 'modules/hocs/sequence';
import styleSequence from 'styles/page/sequence04.module.scss';
import data from 'static/animation/sequence04.json';

import LionWolf from 'components/sequence04/fox';
import Text from 'components/sequence04/text';

function Sequence04({ common }: ContentProps) {
  return (
    <>
      <LionWolf common={common} data={data.cuts.fox} />
      <Text common={common} data={data.cuts.text} />
    </>
  );
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
})(Sequence04);
