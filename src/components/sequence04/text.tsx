import React from 'react';

import withActor from 'modules/hocs/actor';

function Text() {
  return (
    <p>
      뒤늦게 도착한 여우가 그 말을 듣게 되었습니다. 화를 당할까 염려한 여우는 도망칠까 했지만, 괘씸한 늑대를 혼쭐 내줄
      계략이 떠올랐습니다.
    </p>
  );
}

export default withActor({ className: 'text font-main-ko' })(Text);
