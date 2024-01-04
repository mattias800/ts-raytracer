import { Vec3 } from "./Vec3.ts";

export class Ray {
  private _origin: Vec3;
  private _direction: Vec3;

  constructor(orig: Vec3, dir: Vec3) {
    this._origin = orig;
    this._direction = dir;
  }

  static init(): Ray {
    return new Ray(new Vec3(0, 0, 0), new Vec3(0, 0, 0));
  }

  get origin(): Vec3 {
    return this._origin;
  }

  set origin(value: Vec3) {
    this._origin = value;
  }

  get direction(): Vec3 {
    return this._direction;
  }

  set direction(value: Vec3) {
    this._direction = value;
  }

  at(t: number): Vec3 {
    return this._origin.add(this._direction.multiplyByNum(t));
  }
}
