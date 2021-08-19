import React from 'react';

import withActor from 'modules/hocs/actor';

function Text() {
  return (
    <>
      <p>화가 난 사자는 으르렁거리며 여우에게 달려들었습니다. 여우가 침착하게 말했습니다.</p>
      <p>“제가 오늘 늦은 것에는 다 이유가 있습니다요. 폐하의 병에 대한 치료법을 알아 오느라 늦은 것입니다.”</p>
    </>
  );
}

export default withActor({ className: 'text font-main-ko' })(Text);
