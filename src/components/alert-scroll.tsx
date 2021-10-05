import React, { useMemo } from 'react';
import classNames from 'classnames/bind';

import styleAlert from 'styles/components/alert-scroll.module.scss';

const cxAlert = classNames.bind(styleAlert);

interface AlertScrollProps {
  enable: boolean;
}

function AlertScroll({ enable }: AlertScrollProps) {
  const value = useMemo(() => (enable ? 'Enable' : 'Disable'), [enable]);

  const containerClass = useMemo(() => cxAlert('container', 'font-main-ko'), []);
  const keyClass = useMemo(() => cxAlert('key'), []);
  const valueClass = useMemo(() => cxAlert('value', { 'value-invalid': !enable }), [enable]);

  return (
    <div className={containerClass}>
      <p className={keyClass}>Scroll</p>
      <p className={valueClass}>{value}</p>
    </div>
  );
}

export default AlertScroll;
