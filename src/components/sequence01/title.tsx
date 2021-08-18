import React from 'react';

import withActor from 'modules/hocs/actor';
import svg from 'static/svg/title.svg';

function Title() {
  return <img src={svg} alt="title" />;
}

export default withActor({ className: 'title font-title-en' })(Title);
