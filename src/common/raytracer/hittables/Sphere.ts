import { HitRecord, Hittable } from "./Hittable.ts";
import { Ray } from "../Ray.ts";
import { Vec3 } from "../Vec3.ts";
import {Interval} from "../Interval.ts";

export class Sphere implements Hittable {
  private _center: Vec3;
  private _radius: number;

  constructor(center: Vec3, radius: number) {
    this._center = center;
    this._radius = radius;
  }

  get center(): Vec3 {
    return this._center;
  }

  set center(value: Vec3) {
    this._center = value;
  }

  get radius(): number {
    return this._radius;
  }

  set radius(value: number) {
    this._radius = value;
  }

  hit(r: Ray, rayT: Interval, rec: HitRecord): boolean {
    const oc = r.origin.sub(this._center);
    const a = r.direction.lengthSquared();
    const halfB = oc.dot(r.direction);
    const c = oc.lengthSquared() - this._radius * this._radius;
    const discriminant = halfB * halfB - a * c;

    if (discriminant < 0) {
      return false;
    }

    const sqrtd = Math.sqrt(discriminant);

    let root = (-halfB - sqrtd) / a;

    if (!rayT.surrounds(root)) {
      root = (-halfB + sqrtd) / a;
      if (!rayT.surrounds(root)) {
        return false;
      }
    }

    rec.t = root;
    rec.point = r.at(rec.t);
    rec.normal = rec.point.sub(this._center).divideByNum(this._radius);
    const outwardNormal = rec.point.sub(this._center).divideByNum(this._radius);
    rec.setFaceNormal(r, outwardNormal);

    return true;
  }
}
