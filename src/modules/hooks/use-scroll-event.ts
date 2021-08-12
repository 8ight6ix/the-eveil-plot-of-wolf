import React, { useState, useRef, useCallback } from 'react';

interface UseScrollEventProps {
  wheelSensitive: number;
}

function UseScrollEvent({ wheelSensitive }: UseScrollEventProps) {
  const [dist, setDist] = useState<number>(0); // Scroll Distance
  const [touchY, setTouchY] = useState<number | null>(null); // Touch Start Point

  const eventFlag = useRef(false); // 이벤트 디바운스를 플래그
  const freezeFlag = useRef(false); // 동작 멈춤 플래그
  const eventStopOut = useRef<ReturnType<typeof setTimeout>>(); // 스크롤 이벤트가 멈추면 발생하는 Timeout Event Handler

  // Dist 값을 0으로 초기화합니다.
  const initDist = useCallback(() => {
    setDist(0);
  }, []);

  // Hook 외부에서 동작 멈춤 제어
  const setFreeze = useCallback((freeze: boolean) => {
    if (freeze !== freezeFlag.current) freezeFlag.current = freeze;
  }, []);

  // 스크롤 이벤트 동작을 처리합니다.
  const eventHandler = useCallback((delta: number) => {
    // 선언된 Flag가 있으면 동작하지 않습니다.
    if (eventFlag.current || freezeFlag.current) return;
    eventFlag.current = true;

    window.requestAnimationFrame(() => {
      // 스크롤 움직임을 Dist에 반영하고, Event Flag는 제거합니다.
      eventFlag.current = false;
      setDist(delta);

      // Freeze 상태가 아닌데 Scroll Event가 멈추면 Dist를 초기화합니다.
      if (eventStopOut.current) clearTimeout(eventStopOut.current);
      eventStopOut.current = setTimeout(() => {
        if (!freezeFlag.current) initDist();
      }, 100);
    });
  }, []);

  // Wheel Event의 동작을 처리합니다.
  const wheelCallback = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      eventHandler(e.deltaY + dist * wheelSensitive);
    },
    [dist, wheelSensitive],
  );

  // Touch Start Event의 동작을 처리합니다.
  const touchStartCallback = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 1) return; // 한손가락 터치만 허용합니다.
    setTouchY(e.touches[0].clientY);
  }, []);

  // Touch Move Event의 동작을 처리힙니다.
  const touchMoveCallback = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (typeof touchY === 'number') {
        eventHandler((touchY - e.touches[0].clientY) * wheelSensitive);
      }
    },
    [touchY],
  );

  // Touch End Event의 동작을 처리합니다.
  const touchEndCallback = useCallback(() => setTouchY(0), []);

  return {
    dist,
    initDist,
    setFreeze,
    wheelCallback,
    touchStartCallback,
    touchMoveCallback,
    touchEndCallback,
  };
}

export default UseScrollEvent;
