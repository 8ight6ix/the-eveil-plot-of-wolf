import React from 'react';

import withActor from 'modules/hocs/actor';

function Text() {
  return <p>동물들의 왕 사자가 병이 들어 누워 있었습니다.</p>;
}

export default withActor({ className: 'text font-main-ko' })(Text);
