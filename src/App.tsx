import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';

import Sequence01 from 'sequences/sequence01';
import animation from 'statics/animation/index.json';
import 'styles/main.scss';

function App() {
  const app = useRef<HTMLDivElement>(null); // Application Container Element
  const [width, setWidth] = useState(0); // Application Width
  const [height, setHeight] = useState(0); // Application Height

  const [scene, setScene] = useState(1); // 현재 Scene 번호
  const [progress, setProgress] = useState(0); // 현재 Scene 진행률
  const actionFlag = useRef(false); // 앤션 진행 플래그
  const eventFalg = useRef(false); // 이벤트 디바운스를 플래그

  const actionCnt = useRef<number>(0); // 현재 Action 수행중인 Sequence 갯수
  const wheelStop = useRef<ReturnType<typeof setTimeout>>(); // 마우스 휠이 멈추면 발생하는 Timeout Event Handler
  const isMaxScene = useMemo(() => scene > animation.totalScene, [scene]); // 현재 Scene이 마지막인지 여부
  const isMinScene = useMemo(() => scene === 1, [scene]); // 현재 Scene이 처음인지 여부

  // 다음 Scene을 진행합니다.
  const moveNextScene = useCallback(() => {
    if (isMaxScene) return;
    setScene(scene + 1);
    setProgress(0);
  }, [isMaxScene, scene]);

  // 이전 Scene을 진행합니다.
  const movePrevScene = useCallback(() => {
    if (isMinScene) return;
    setScene(scene - 1);
    setProgress(0);
  }, [isMinScene, scene]);

  // Sequence의 Action 실행/종료를 보고 받습니다.
  const registAction = useCallback(
    (regist: boolean) => {
      if (regist) actionCnt.current += 1;
      else if (actionCnt.current > 0) actionCnt.current -= 1;

      if (actionCnt.current === 0) {
        actionFlag.current = false;
        // 전체 Action 종료 후 진행도에 따라 다음 혹은 이전 Scene으로 이동합니다.
        if (progress === 100) moveNextScene();
        else if (progress === -100) movePrevScene();
      } else if (!actionFlag.current) {
        // Action 증이 아닌데 Action을 진행하는 Sequnce가 생기면 Action Flag를 활성화 합니다.
        actionFlag.current = true;
      }
    },
    [progress],
  );

  // 진행률의 변동을 반영합니다.
  const renderProgress = useCallback(
    (delta: number) => {
      // 더이상 진행할 쇼트가 없으면 멈춥니다.
      const next = progress + delta * animation.deletaSensitive;
      if (next > 0 && isMaxScene) return;
      if (next < 0 && isMinScene) return;

      // 진행률이 일장 값 이상 도달하면, 자동으로 수행합니다.
      if (Math.abs(next) >= animation.actionStart) {
        actionFlag.current = true;
        setProgress(next > 0 ? 100 : -100);
      } else {
        setProgress(next);
      }
    },
    [progress, isMaxScene, isMinScene],
  );

  const wheelCallback = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      // Flag가 있거나, 수직 변동 값이 없으면 진행하지 않습니다.
      if (eventFalg.current && actionFlag.current) return;

      window.requestAnimationFrame(() => {
        // 마우스 움직임을 Process에 반여하고, Event Flag는 제거합니다.
        eventFalg.current = false;
        renderProgress(e.deltaY);

        // Action 상태가 아닌데 Wheel이 멈추면 Process를 초기화합니다.
        if (wheelStop.current) clearTimeout(wheelStop.current);
        wheelStop.current = setTimeout(() => {
          if (!actionFlag.current) setProgress(0);
        }, 100);
      });

      eventFalg.current = true;
    },
    [renderProgress],
  );

  // Window 사이즈가 조정되면 Sequence Container들을 resize합니다.
  const resize = useCallback(() => {
    if (app.current) {
      setWidth(app.current.clientWidth);
      setHeight(app.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);

  return (
    <div className="App" onWheel={wheelCallback} ref={app}>
      <Sequence01
        scene={scene}
        progress={progress}
        width={width}
        height={height}
        actionFlag={actionFlag.current}
        registAction={registAction}
      />
    </div>
  );
}

export default App;
