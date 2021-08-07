import Animation from 'utils/animation/model';

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
export function parseScale(cur: Animation, next: Animation, progress: number) {
  const scale = ((next.scale - cur.scale) * progress) / 100;
  return cur.scale + scale;
}

// 변화를 반영한 Anchor 값을 반환합니다.
export function parseAnchor(cur: Animation, next: Animation, progress: number) {
  return progress >= 0 ? cur.anchor : next.anchor;
}

// 가로축 Margin 값을 반환합니다.
export function parseMarginLeft(width: number, anchor: string) {
  if (anchor === 'right') return -width;
  if (anchor === 'center') return -(width / 2);
  return 0;
}

// 세로축 Margin 값을 반환합니다.
export function parseMarginTop(height: number, anchor: string) {
  if (anchor === 'end') return -height;
  if (anchor === 'center') return -(height / 2);
  return 0;
}
