import React from 'react';

import withActor from 'modules/hocs/actor';

function Text1() {
  return (
    <>
      <p>
        “명의로 소문난 거북 영감에게 폐하의 증상을 말하니 고뿔인 것 같다고 하옵니다. 고뿔은 몸을 따뜻하게 다스려야 하는
        병으로,
      </p>
      <p>
        두꺼운 가죽을 덮고 주무시면 좋을 것이라더군요. 소인이 듣기로는 늑대의 가죽이 두껍고 부드럽기로 소문이
        나있다던데, 마침 이 자리에 늑대가 있으니 시험을 해봐도 좋을 듯 하옵니다.”
      </p>
    </>
  );
}

export default withActor({ className: 'text font-main-ko' })(Text1);
