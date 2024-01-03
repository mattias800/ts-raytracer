import { Ray } from "../Ray.ts";
import { Vec3 } from "../Vec3.ts";
import { Interval } from "../Interval.ts";

export class HitRecord {
  private _point: Vec3;
  private _normal: Vec3;
  private _t: number;
  private _frontFace: boolean;

  constructor(point: Vec3, normal: Vec3, t: number) {
    this._point = point;
    this._normal = normal;
    this._t = t;
    this._frontFace = false;
  }

  static init(): HitRecord {
    return new HitRecord(new Vec3(0, 0, 0), new Vec3(0, 0, 0), 0);
  }

  get point(): Vec3 {
    return this._point;
  }

  set point(value: Vec3) {
    this._point = value;
  }

  get normal(): Vec3 {
    return this._normal;
  }

  set normal(value: Vec3) {
    this._normal = value;
  }

  get t(): number {
    return this._t;
  }

  set t(value: number) {
    this._t = value;
  }

  setAll(v: HitRecord): void {
    this._point = v.point;
    this._normal = v.normal;
    this._t = v.t;
  }

  // outwardNormal must be unit length.
  setFaceNormal(r: Ray, outwardNormal: Vec3) {
    this._frontFace = r.direction.dot(outwardNormal) < 0;
    this._normal = this._frontFace ? outwardNormal : outwardNormal.negative();
  }
}

export interface Hittable {
  hit(r: Ray, rayT: Interval, rec: HitRecord): boolean;
}
