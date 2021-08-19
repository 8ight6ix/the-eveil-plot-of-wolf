import React from 'react';

import withSequence, { ContentProps } from 'modules/hocs/sequence';
import styleSequence from 'styles/page/sequence05.module.scss';
import data from 'static/animation/sequence05.json';

import LionFox from 'components/sequence05/lion-fox';
import Text from 'components/sequence05/text';

function Sequence05({ common }: ContentProps) {
  return (
    <>
      <LionFox common={common} data={data.cuts.lionFox} />
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
})(Sequence05);
