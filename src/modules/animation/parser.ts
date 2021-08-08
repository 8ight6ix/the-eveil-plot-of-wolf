import Animation from 'modules/animation/model';

// 변화를 반영한 X 값을 반환합니다.
export function parseX(cur: Animation, next: Animation, progress: number) {
  const moveX = ((next.x - cur.x) * progress) / 100;
  return cur.x + moveX;
}

// 변화를 반영한 Y 값을 반환합니다.
export function parseY(cur: Animation, next: Animation, progress: number) {
  const moveY = ((next.y - cur.y) * progress) / 100;
  return cur.y + moveY;
}

// 변화를 반영한 Rotate 값을 반환합니다.
export function parseRotate(cur: Animation, next: Animation, progress: number) {
  const rotate = ((next.rotate - cur.rotate) * progress) / 100;
  return cur.rotate + rotate;
}

// 변화를 반영한 Scale 값을 반환합니다.
export function parseScaleX(cur: Animation, next: Animation, progress: number) {
  const scale = ((next.scaleX - cur.scaleX) * progress) / 100;
  return cur.scaleX + scale;
}

// 변화를 반영한 Scale 값을 반환합니다.
export function parseScaleY(cur: Animation, next: Animation, progress: number) {
  const scale = ((next.scaleY - cur.scaleY) * progress) / 100;
  return cur.scaleY + scale;
}

// 변화를 반영한 Anchor 값을 반환합니다.
export function parseAnchor(cur: Animation, next: Animation, progress: number) {
  return progress >= 0 ? cur.anchor : next.anchor;
}

export function parseMarginLeft(cur: Animation, next: Animation, progress: number) {
  const marginLeft = ((next.marginLeft - cur.marginLeft) * progress) / 100;
  return cur.marginLeft + marginLeft;
}

export function parseMarginTop(cur: Animation, next: Animation, progress: number) {
  const marginTop = ((next.marginTop - cur.marginTop) * progress) / 100;
  return cur.marginTop + marginTop;
}
