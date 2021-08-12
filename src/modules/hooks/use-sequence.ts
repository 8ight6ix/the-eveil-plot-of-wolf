import { useState, useMemo, useEffect } from 'react';

import { callAfterRerender } from 'modules/helper';

interface UseSequenceData {
  duration: number;
  startScene: number;
  shortDest: number[];
}

interface UseSequenceProps {
  scene: number;
  progress: number;
  data: UseSequenceData;
  registAction: (regist: boolean) => void;
}

function UseSequence({ scene, progress, data, registAction }: UseSequenceProps) {
  const { duration, startScene, shortDest } = data;

  const [init, setInit] = useState(false); // UseEffect 컨트롤을 위한 초기화 여부
  const [short, setShort] = useState(0); // 현재 Sequence Short 번호
  const lastScene = useMemo(() => shortDest.length + startScene - 1, [shortDest, startScene]); // 더이상 진행할 내용일 없는 Scene 번호
  const isActive = useMemo(() => scene >= startScene && scene <= lastScene, [scene, startScene, lastScene]); // 현재 Scene 번호가 활동 범위인지 여부

  // Start Scene과 End Scene을 반영한 상대적은 Scene 번호
  const relativeScene = useMemo(
    () => Math.min(Math.max(scene - startScene, 0), shortDest.length - 1),
    [scene, startScene, shortDest],
  );

  // Progress가 증가함에 따라 이동하게 될 다음 Scene의 Short Number
  const nextShort = useMemo(() => {
    if (progress > 0 && scene < lastScene) return short + 1;
    if (progress < 0 && scene > startScene) return shortDest[relativeScene - 1];
    return short;
  }, [progress, scene, short, startScene, lastScene, relativeScene]);

  // Scene에 해당하는 목표 Short 번호에 맞게 다음 Short 번호를 설정합니다.
  useEffect(() => {
    const dest = shortDest[relativeScene];
    if (!isActive || short === dest) return;

    // Short의 변경이 필요하다면 Action 실행을 등록합니다.
    const next = dest > short ? short + 1 : dest;
    // useState로 short를 변경하게되면, Repaint가 수행되기 전에 short 번호가 변경되는 것 같습니다.
    // 그로인해 short가 before load => 0 => 1이 아니라, before load => 1이 반영됩니다.
    // requestAnimationFrame을 render 전에 다시 한번 요청하는 트릭을 사용해서 해결합니다.
    callAfterRerender(() => setShort(next));
    registAction(true);
  }, [scene]);

  // Short가 변경되면 Transalte 동작 후 목표 Short 번호에 맞게 Actrion을 진행합니다.
  useEffect(() => {
    if (!isActive || !init) return; // 첫 Mount에는 실행되지 않습니다.

    const dest = shortDest[relativeScene];
    const next = short + 1;
    const isFinish = dest === short;

    setTimeout(() => {
      // Short가 목표치에 도달하면 Action을 종료합니다.
      if (isFinish) registAction(false);
      // Short가 목표치에 도달하지 목하면 다음 short로 이동합니다.
      else setShort(next);
    }, duration);
  }, [short]);

  useEffect(() => {
    setInit(true);
  }, []);

  return {
    short,
    nextShort,
  };
}

export default UseSequence;
