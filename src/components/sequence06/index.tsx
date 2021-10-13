import React from 'react';

import withSequence, { ContentProps } from 'modules/hocs/sequence';
import styleSequence from 'styles/page/sequence06.module.scss';
import data from 'static/animation/sequence06.json';

import SvgImage from 'components/sequence06/svg-image';
import Text1 from 'components/sequence06/text1';
import Text2 from 'components/sequence06/text2';

function Sequence05({ common, registAction }: ContentProps) {
  return (
    <>
      <SvgImage common={common} data={data.cuts.svg} registAction={registAction} />
      <Text1 common={common} data={data.cuts.text1} />
      <Text2 common={common} data={data.cuts.text2} />
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
