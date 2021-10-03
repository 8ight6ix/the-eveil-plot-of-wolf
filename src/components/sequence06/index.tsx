import React from 'react';

import withSequence, { ContentProps } from 'modules/hocs/sequence';
import styleSequence from 'styles/page/sequence06.module.scss';
import data from 'static/animation/sequence06.json';

import FoxTurtle from 'components/sequence06/fox-turtle';
import Text from 'components/sequence06/text';

function Sequence05({ common, registAction }: ContentProps) {
  return (
    <>
      <FoxTurtle common={common} data={data.cuts.foxTurtle} registAction={registAction} />
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
