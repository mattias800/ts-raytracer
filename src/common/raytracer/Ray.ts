import { Vec3 } from "./Vec3.ts";

export class Ray {
  private readonly _orig: Vec3;
  private readonly _dir: Vec3;

  constructor(orig: Vec3, dir: Vec3) {
    this._orig = orig;
    this._dir = dir;
  }

  get origin(): Vec3 {
    return this._orig;
  }

  get direction(): Vec3 {
    return this._dir;
  }

  at(t: number): Vec3 {
    return this._orig.add(this._dir.multiplyByNum(t));
  }
}
