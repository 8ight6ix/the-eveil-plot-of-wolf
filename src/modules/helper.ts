// state 혹은 prop의 변경이 repaint 이전에 전부 수행될 시, 중간과정이 생햑됩니다.
// requestAnimationFrame을 render 전에 다시 한번 요청하는 트릭을 사용해서 해결합니다.
export const callAfterRerender = (cb: () => void) => {
  requestAnimationFrame(() => requestAnimationFrame(cb));
};
