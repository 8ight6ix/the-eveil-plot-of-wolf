import React from 'react';

import withActor from 'modules/hocs/actor';

function SubTitle() {
  return <span>이솝 이야기: 늑대의 흉계</span>;
}

export default withActor({ className: 'sub-title font-title-ko' })(SubTitle);
