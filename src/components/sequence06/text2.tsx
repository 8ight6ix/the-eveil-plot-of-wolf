import React from 'react';

import withActor from 'modules/hocs/actor';

function Text2() {
  return (
    <>
      <p>
        늑대는 졸지에 아무 말도 못한 채 죽게 되었습니다. 여우가 없는 틈을 타서 여우를 비방하고 음해하려던 늑대는, 되려
        자신이 화를 당하게 된 것이지요.
      </p>
    </>
  );
}

export default withActor({ className: 'text font-main-ko' })(Text2);
