import React from 'react';

import withSequence, { ContentProps } from 'modules/hocs/sequence';
import styleSequence from 'styles/page/sequence01.module.scss';
import data from 'static/animation/sequence01.json';

import Title from 'components/sequence01/title';
import UnderLine from 'components/sequence01/under-line';
import SubTitle from 'components/sequence01/sub-title';
import Lion from 'components/sequence01/lion';
import Scroll from 'components/sequence01/scroll';
import Text from 'components/sequence01/text';

function Sequence01({ common }: ContentProps) {
  return (
    <>
      <Title common={common} data={data.cuts.title} />
      <UnderLine common={common} data={data.cuts.underLine} />
      <SubTitle common={common} data={data.cuts.subTitle} />
      <Lion common={common} data={data.cuts.lion} />
      <Scroll common={common} data={data.cuts.scroll} />
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
})(Sequence01);
