import React from 'react';

import withActor from 'modules/hocs/actor';

function Text() {
  return (
    <>
      <p>평소 여우에 대한 시기 질투가 심했던 늑대는 여우가 없는 틈을 타서 욕을 하기 시작했습니다.</p>
      <p>“여우는 원래 그런 놈입니다요. 평소 폐하에 대한 존경심은 하나도 없죠. 엄벌에 처함이 마땅하옵니다.”</p>
    </>
  );
}

export default withActor({ className: 'text font-main-ko' })(Text);
