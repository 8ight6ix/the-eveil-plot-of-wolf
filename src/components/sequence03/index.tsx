import React from 'react';

import withSequence, { ContentProps } from 'modules/hocs/sequence';
import styleSequence from 'styles/page/sequence03.module.scss';
import data from 'static/animation/sequence03.json';

import LionWolf from 'components/sequence03/lion-wolf';
import Text from 'components/sequence03/text';

function Sequence03({ common }: ContentProps) {
  return (
    <>
      <LionWolf common={common} data={data.cuts.lionWolf} />
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
})(Sequence03);
