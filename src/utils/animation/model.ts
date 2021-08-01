export interface AnimationRowData {
  x?: number;
  y?: number;
  rotate?: number;
  scale?: number;
  anchor?: string;
}

class Animation {
  private _x: number;

  private _y: number;

  private _rotate: number;

  private _scale: number;

  private _anchor: string;

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get rotate() {
    return this._rotate;
  }

  get scale() {
    return this._scale;
  }

  get anchor() {
    return this._anchor;
  }

  constructor(row: AnimationRowData, defRow?: Animation) {
    this._x = row.x ?? defRow?.x ?? 0;
    this._y = row.y ?? defRow?.y ?? 0;
    this._rotate = row.rotate ?? defRow?.rotate ?? 0;
    this._scale = row.scale ?? defRow?.scale ?? 1;
    this._anchor = row.anchor ?? defRow?.anchor ?? 'center center';
  }

  static createAnimationList(rows: AnimationRowData[]) {
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
}

export default Animation;
