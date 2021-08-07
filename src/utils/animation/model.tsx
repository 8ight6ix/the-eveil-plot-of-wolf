export interface InformationRowData {
  x?: number;
  y?: number;
  rotate?: number;
  scale?: number;
  anchor?: string[];
}

class Information {
  private _x: number;

  private _y: number;

  private _rotate: number;

  private _scale: number;

  private _anchor: string[];

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

  constructor(row: InformationRowData, defRow?: Information) {
    this._x = row.x ?? defRow?.x ?? 0;
    this._y = row.y ?? defRow?.y ?? 0;
    this._rotate = row.rotate ?? defRow?.rotate ?? 0;
    this._scale = row.scale ?? defRow?.scale ?? 1;
    this._anchor = row.anchor ?? defRow?.anchor ?? ['center'];
  }
}

export default Information;
