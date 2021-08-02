import Animation from 'utils/animation/model';
import * as parser from 'utils/animation/parser';

export const parseRowDatas = Animation.createAnimationList;

// 이전 스타일 객체에서 Short가 진행된 만큼 변화가 반영된 Style 객체를 반환합니다.
export function parseAnimation(short: number, progress: number, anis: Animation[]) {
  if (short <= 0 && progress <= 0) return anis[0]; // 더이상 뒤로갈 에니메이션이 없는 경우
  if (short >= anis.length - 1 && progress >= 0) return anis[anis.length - 1]; // 더이상 앞으로갈 에니메이션이 없는 경우
  if (progress === 0) return anis[short]; // progress가 0인 경우

  const curAni = anis[short];
  const nextAni = progress >= 0 ? anis[short + 1] : anis[short - 1];
  const absProgress = Math.abs(progress);

  const x = parser.parseX(curAni, nextAni, absProgress);
  const y = parser.parseY(curAni, nextAni, absProgress);
  const rotate = parser.parseRotate(curAni, nextAni, absProgress);
  const scale = parser.parseScale(curAni, nextAni, absProgress);
  const anchor = parser.parseAnchor(curAni, nextAni, absProgress);

  return new Animation({ x, y, rotate, scale, anchor });
}

// 스타일 객체를 React Component Style Object로 파싱합니다.
export function parseStyle(ani: Animation, baseW: number, baseH: number, stageW: number, stageH: number) {
  const rateW = stageW / baseW;
  const rateH = stageH / baseH;

  const x = (ani.x * rateW).toFixed(2);
  const y = (ani.y * rateH).toFixed(2);

  const transform = [`translate(${x}px, ${y}px)`, `rotate(${ani.rotate}deg)`, `scale(${ani.scale}, ${ani.scale})`];

  return {
    transformOrigin: ani.anchor,
    transform: transform.join(' '),
  };
}

export function neadAsync(short: number, progress: number, asyncs?: boolean[]) {
  if (!asyncs) return false; // async 배열이 준비되지 않으면 무조건 True입니다.
  if (short === 0 && progress <= 0) return false; // 더이상 뒤로갈 에니메이션이 없는 경우
  if (short === asyncs.length - 1 && progress >= 0) return false; // 더이상 앞으로갈 에니메이션이 없는 경우
  return progress >= 0 ? asyncs[short + 1] : asyncs[short - 1];
}
