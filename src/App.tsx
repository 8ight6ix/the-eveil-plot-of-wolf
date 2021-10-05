import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';

import AlertScroll from 'components/alert-scroll';

import Sequence01 from 'components/sequence01';
import Sequence03 from 'components/sequence03';
import Sequence04 from 'components/sequence04';
import Sequence05 from 'components/sequence05';
import Sequence06 from 'components/sequence06';

import useScrollEvent from 'modules/hooks/use-scroll-event';
import animation from 'static/animation/index.json';
import 'styles/main.scss';

function App() {
  const [scene, setScene] = useState(0); // 현재 Scene 번호
  const [width, setWidth] = useState(document.body.clientWidth); // Application Width
  const [height, setHeight] = useState(document.body.clientHeight); // Application Height
  const [scrollEnable, setScrollEnable] = useState(true); // 현재 스크롤이 가능한지 여부

  const actionMap = useRef<Map<Symbol, boolean>>(new Map()); // 현재 Action 수행중인 개체
  const isMaxScene = useMemo(() => scene === animation.totalScene, [scene]); // 현재 Scene이 마지막인지 여부
  const isMinScene = useMemo(() => scene === 0, [scene]); // 현재 Scene이 처음인지 여부

  const { dist, initDist, setFreeze, wheelCallback, touchStartCallback, touchMoveCallback, touchEndCallback } =
    useScrollEvent({ wheelSensitive: animation.deletaSensitive });

  // 다음 Scene을 진행합니다.
  const moveNextScene = useCallback(() => {
    if (!isMaxScene) setScene(scene + 1);
    if (dist) initDist();
  }, [isMaxScene, scene, dist]);

  // 이전 Scene을 진행합니다.
  const movePrevScene = useCallback(() => {
    if (!isMinScene) setScene(scene - 1);
    if (dist) initDist();
  }, [isMinScene, scene, dist]);

  // Sequence의 Action 실행/종료를 보고 받습니다.
  const registAction = useCallback(
    (key: Symbol, regist: boolean) => {
      if (regist) actionMap.current.set(key, true);
      else if (actionMap.current.has(key)) actionMap.current.delete(key);

      // Action이 실행중인 Sequence가 하나라도 있으면 스크롤 이벤트를 중단합니다.
      const freeze = actionMap.current.size > 0;
      setFreeze(freeze);

      // 현재 스크롤이 가능 여부를 보여주기위해 값을 설정합니다.
      setScrollEnable(!freeze);
    },
    [setFreeze],
  );

  // Scroll 이동 값이 일정 값 이상 도달하면 다음 Scene으로 이동합니다.
  useEffect(() => {
    if (Math.abs(dist) >= animation.actionStart) {
      if (dist > 0 && !isMaxScene) moveNextScene();
      else if (dist < 0 && !isMinScene) movePrevScene();
    }
  }, [dist]);

  // Window 사이즈가 조정되면 Sequence Container들을 resize합니다.
  const resizeCallback = useCallback(() => {
    setWidth(document.body.clientWidth);
    setHeight(document.body.clientHeight);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resizeCallback);
    return () => window.removeEventListener('resize', resizeCallback);
  }, [resizeCallback]);

  return (
    <div
      className="App"
      onWheel={wheelCallback}
      onTouchStart={touchStartCallback}
      onTouchMove={touchMoveCallback}
      onTouchEnd={touchEndCallback}
    >
      <AlertScroll enable={scrollEnable} />
      <Sequence01 scene={scene} progress={dist} appWidth={width} appHeight={height} registAction={registAction} />
      <Sequence03 scene={scene} progress={dist} appWidth={width} appHeight={height} registAction={registAction} />
      <Sequence04 scene={scene} progress={dist} appWidth={width} appHeight={height} registAction={registAction} />
      <Sequence05 scene={scene} progress={dist} appWidth={width} appHeight={height} registAction={registAction} />
      <Sequence06 scene={scene} progress={dist} appWidth={width} appHeight={height} registAction={registAction} />
    </div>
  );
}

export default App;
