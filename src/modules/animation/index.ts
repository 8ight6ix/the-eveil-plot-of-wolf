import React from 'react';
import Animation, { AnimtaionRowData } from 'modules/animation/model';
import * as parser from 'modules/animation/parser';

interface ParseStyleParma {
  trans: boolean;
  duration: number;
  baseWidth: number;
  baseHeight: number;
  stageWidth: number;
  stageHeight: number;
  targetWidth: number;
  targetHeight: number;
}

// Row Data 리스트를 Information 리스트로 파싱합니다.
export function parseRowDatas(rows: AnimtaionRowData[], shortEnd: number) {
  const animations = Array<Animation>(shortEnd + 1);
  const lastAnimation = rows.reduce((prev: Animation | undefined, cur, i) => {
    animations[i] = new Animation(cur, prev);
    return animations[i];
  }, undefined);

  for (let i = rows.length; i <= shortEnd; i += 1) {
    animations[i] = new Animation({}, lastAnimation);
  }

  return animations;
}

// 스타일 객체에서 Short가 진행된 만큼 변화가 반영된 Style 객체를 반환합니다.
export function parseAnimation(short: number, nextShort: number, progress: number, anis: Animation[]) {
  if (short === nextShort) return anis[short];

  const curAni = anis[short];
  const nextAni = anis[nextShort];
  const absProgress = Math.abs(progress);

  const { visibility } = nextAni;
  const x = parser.parseX(curAni, nextAni, absProgress);
  const y = parser.parseY(curAni, nextAni, absProgress);
  const rotate = parser.parseRotate(curAni, nextAni, absProgress);
  const scaleX = parser.parseScaleX(curAni, nextAni, absProgress);
  const scaleY = parser.parseScaleY(curAni, nextAni, absProgress);
  const marginLeft = parser.parseMarginLeft(curAni, nextAni, absProgress);
  const marginTop = parser.parseMarginTop(curAni, nextAni, absProgress);
  const anchor = parser.parseAnchor(curAni, nextAni, absProgress);
  const opacity = parser.parseOpacity(curAni, nextAni, absProgress);

  return new Animation({ x, y, rotate, scaleX, scaleY, marginLeft, marginTop, anchor, visibility, opacity });
}

// 스타일 객체를 React Component Style Object로 파싱합니다.
export function parseStyle(ani: Animation, load: boolean, opts: ParseStyleParma): React.CSSProperties {
  const { trans, duration, baseWidth, baseHeight, stageWidth, stageHeight, targetWidth, targetHeight } = opts;

  const rateW = stageWidth / baseWidth;
  const rateH = stageHeight / baseHeight;
  const x = (ani.x * rateW).toFixed(2);
  const y = (ani.y * rateH).toFixed(2);

  const anchor = ani.anchor.slice(0, 2);
  const visibility = load && ani.visibility ? 'visible' : 'hidden';
  const opacity = (ani.opactiy / 100).toFixed(2);
  const marginLeft = ((targetWidth * ani.marginLeft) / 100).toFixed(2);
  const marginTop = ((targetHeight * ani.marginTop) / 100).toFixed(2);
  const transform = [`translate(${x}px, ${y}px)`, `rotate(${ani.rotate}deg)`, `scale(${ani.scaleX}, ${ani.scaleY})`];

  const style: React.CSSProperties = {
    position: 'absolute',
    visibility,
    opacity,
    transformOrigin: anchor.join(' '),
    transform: transform.join(' '),
    marginLeft: `${marginLeft}px`,
    marginTop: `${marginTop}px`,
  };

  if (trans) {
    style.transitionProperty = 'transform, margin, opacity';
    style.transitionDuration = `${duration / 1000}s`;
    style.transitionTimingFunction = 'cubic-bezier(0.2, 0.2, 0, 1)';
  }

  return style;
}
