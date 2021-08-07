import React from 'react';
import Animation, { InformationRowData } from 'modules/animation/model';
import * as parser from 'modules/animation/parser';

interface ParseStyleParma {
  ani: Animation;
  baseWidth: number;
  baseHeight: number;
  stageWidth: number;
  stageHeight: number;
  targetWidth: number;
  targetHeight: number;
}

// Row Data 리스트를 Information 리스트로 파싱합니다.
export function parseRowDatas(rows: InformationRowData[]) {
  const size = rows.length;
  const animations = Array<Animation>(size);

  if (size > 0) {
    // 존재하지 않는 Animation Row Data는 이전 Data의 것을 그대로 사용합니다.
    animations[0] = new Animation(rows[0]);
    for (let i = 1; i < size; i += 1) {
      animations[i] = new Animation(rows[i], animations[i - 1]);
    }
  }

  return animations;
}

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
export function parseStyle(opts: ParseStyleParma): React.CSSProperties {
  const { ani, baseWidth, baseHeight, stageWidth, stageHeight, targetWidth, targetHeight } = opts;

  const rateW = stageWidth / baseWidth;
  const rateH = stageHeight / baseHeight;
  const x = (ani.x * rateW).toFixed(2);
  const y = (ani.y * rateH).toFixed(2);

  const transform = [`translate(${x}px, ${y}px)`, `rotate(${ani.rotate}deg)`, `scale(${ani.scale}, ${ani.scale})`];
  const anchor = ani.anchor.slice(0, 2);
  const marginLeft = parser.parseMarginLeft(targetWidth, anchor[0]);
  const marginTop = parser.parseMarginTop(targetHeight, anchor[1] ?? anchor[0]);

  return {
    position: 'absolute',
    transformOrigin: anchor.join(' '),
    transform: transform.join(' '),
    marginLeft: `${marginLeft}px`,
    marginTop: `${marginTop}px`,
  };
}
