export interface InformationRowData {
  x?: number;
  y?: number;
  rotate?: number;
  scaleX?: number;
  scaleY?: number;
  marginLeft?: number;
  marginTop?: number;
  anchor?: string[];
  visibility?: boolean;
}

class Information {
  private _x: number;

  private _y: number;

  private _rotate: number;

  private _scaleX: number;

  private _scaleY: number;

  private _marginLeft: number;

  private _marginTop: number;

  private _anchor: string[];

  private _visibility: boolean;

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get rotate() {
    return this._rotate;
  }

  get scaleX() {
    return this._scaleX;
  }

  get scaleY() {
    return this._scaleY;
  }

  get marginLeft() {
    return this._marginLeft;
  }

  get marginTop() {
    return this._marginTop;
  }

  get anchor() {
    return this._anchor;
  }

  get visibility() {
    return this._visibility;
  }

  constructor(row: InformationRowData, defRow?: Information) {
    this._x = row.x ?? defRow?.x ?? 0;
    this._y = row.y ?? defRow?.y ?? 0;
    this._rotate = row.rotate ?? defRow?.rotate ?? 0;
    this._scaleX = row.scaleX ?? defRow?.scaleX ?? 1;
    this._scaleY = row.scaleY ?? defRow?.scaleY ?? 1;
    this._marginLeft = row.marginLeft ?? defRow?._marginLeft ?? 0;
    this._marginTop = row.marginTop ?? defRow?._marginTop ?? 0;
    this._anchor = row.anchor ?? defRow?.anchor ?? ['center'];
    this._visibility = row.visibility ?? defRow?.visibility ?? true;
  }
}

export default Information;
