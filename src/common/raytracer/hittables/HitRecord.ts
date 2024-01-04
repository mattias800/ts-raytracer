import { Vec3 } from "../Vec3.ts";
import { Ray } from "../Ray.ts";
import { Material } from "../materials/Material.ts";
import { Lambertian } from "../materials/Lambertian.ts";
import { colors } from "../Color.ts";

export class HitRecord {
  private _point: Vec3;
  private _normal: Vec3;
  private _t: number;
  private _frontFace: boolean;
  private _material: Material;

  constructor(point: Vec3, normal: Vec3, t: number) {
    this._point = point;
    this._normal = normal;
    this._t = t;
    this._frontFace = false;
    this._material = new Lambertian(colors.black);
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

  get material(): Material {
    return this._material;
  }

  set material(value: Material) {
    this._material = value;
  }

  get frontFace(): boolean {
    return this._frontFace;
  }

  setAll(v: HitRecord): void {
    this._point = v.point;
    this._normal = v.normal;
    this._t = v.t;
    this._frontFace = v._frontFace;
    this._material = v.material;
  }

  // outwardNormal must be unit length.
  setFaceNormal(r: Ray, outwardNormal: Vec3) {
    this._frontFace = r.direction.dot(outwardNormal) < 0;
    this._normal = this._frontFace ? outwardNormal : outwardNormal.negative();
  }
}
