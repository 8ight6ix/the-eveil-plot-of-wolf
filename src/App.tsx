import React, { useState, useCallback, useRef, useMemo } from 'react';

import Scene01 from 'scenes/scene01';
import animation from 'static/animation/index.json';
import 'styles/main.scss';
import { clearTimeout, setTimeout } from 'timers';

function App() {
  const [scene, setScene] = useState(1); // 현재 Scene 번호
  const [progress, setProgress] = useState(0); // 현재 Scene 진행률
  const [actionFlag, setActionFlag] = useState(false); // 앤션 진행 플래그
  const [eventFalg, setEventFlag] = useState(false); // 이벤트 디바운스를 위한 플래그

  const actionCnt = useRef<number>(0); // 현재 Action 수행중인 Sequence 갯수
  const wheelStop = useRef<ReturnType<typeof setTimeout>>(); // 마우스 휠이 멈추면 발생하는 Timeout Event Handler
  const isMaxScene = useMemo(() => scene > animation.totalScene, [scene]); // 현재 Scene이 마지막인지
  const isMinScene = useMemo(() => scene === 1, [scene]); // 현재 Scene이 처음인지

  // 다음 쇼트를 진행합니다.
  const moveNextScene = useCallback(() => {
    if (isMaxScene) return;
    setScene(scene + 1);
    setProgress(0);
  }, [isMaxScene, scene]);

  // 이전 쇼트를 진행합니다.
  const movePrevScene = useCallback(() => {
    if (isMinScene) return;
    setScene(scene - 1);
    setProgress(0);
  }, [isMinScene, scene]);

  // Sequence의 Action 실행/종료를 보고 받습니다.
  const registAction = useCallback((regist: boolean) => {
    if (regist) actionCnt.current += 1;
    else actionCnt.current -= 1;

    if (actionFlag && actionCnt.current === 0) {
      // Action 중에 Action을 진행하고 있는 Sequece가 0이 되면 Action을 종료합니다.
      if (progress > 0) moveNextScene();
      else movePrevScene();
      setActionFlag(false);
    } else if (actionFlag && actionCnt.current > 0) {
      // Action 증이 아닌데 Action을 진행하는 Sequnce가 생기면 Action Flag를 활성화 합니다.
      setActionFlag(true);
    }
  }, []);

  // 진행률의 변동을 반영합니다.
  const renderProgress = useCallback(
    (delta: number) => {
      // 더이상 진행할 쇼트가 없으면 멈춥니다.
      const next = progress + delta * animation.deletaSensitive;
      if (next > 0 && isMaxScene) return;
      if (next < 0 && isMinScene) return;

      // 진행률이 일장 값 이상 도달하면, 자동으로 수행합니다.
      if (Math.abs(next) >= animation.actionStart) {
        setProgress(next > 0 ? 100 : -100);
        setActionFlag(true);
      } else {
        setProgress(next);
      }
    },
    [progress, isMaxScene, isMinScene],
  );

  const wheelCallback = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      // Flag가 있거나, 수직 변동 값이 없으면 진행하지 않습니다.
      if (eventFalg && actionFlag) return;

      window.requestAnimationFrame(() => {
        // 마우스 움직임을 Process에 반여하고, Event Flag는 제거합니다.
        renderProgress(e.deltaY);
        setEventFlag(false);

        // Action 상태가 아닌데 Wheel이 멈추면 Process를 초기화합니다.
        if (wheelStop.current) clearTimeout(wheelStop.current);
        if (!actionFlag) wheelStop.current = setTimeout(() => setProgress(0), 100);
      });

      setEventFlag(true);
    },
    [eventFalg, actionFlag, renderProgress],
  );

  return (
    <div className="App" onWheel={wheelCallback}>
      <Scene01 scene={scene} progress={progress} registAction={registAction} />
    </div>
  );
}

export default App;
