import { Color } from "./Color.ts";
import { getRandom } from "./MathUtils.ts";

export class Vec3 {
  private readonly _x: number;
  private readonly _y: number;
  private readonly _z: number;

  constructor(x: number, y: number, z: number) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  static zero() {
    return new Vec3(0, 0, 0);
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get z(): number {
    return this._z;
  }

  static random(min: number, max: number): Vec3 {
    return new Vec3(
      getRandom(min, max),
      getRandom(min, max),
      getRandom(min, max),
    );
  }

  static randomInUnitSphere() {
    while (true) {
      const p = Vec3.random(-1, 1);
      if (p.lengthSquared() < 1) {
        return p;
      }
    }
  }

  static randomUnitVector() {
    return this.randomInUnitSphere().unitVector();
  }

  static randomOnHemisphere(normal: Vec3): Vec3 {
    const onUnitSphere = this.randomUnitVector();
    if (onUnitSphere.dot(normal) > 0.0) {
      return onUnitSphere;
    } else {
      return onUnitSphere.negative();
    }
  }

  negative(): Vec3 {
    return new Vec3(-this._x, -this._y, -this._z);
  }

  add(v: Vec3): Vec3 {
    return new Vec3(this._x + v.x, this._y + v.y, this._z + v.z);
  }

  sub(v: Vec3): Vec3 {
    return new Vec3(this._x - v.x, this._y - v.y, this._z - v.z);
  }

  multiply(v: Vec3): Vec3 {
    return new Vec3(this._x * v.x, this._y * v.y, this._z * v.z);
  }

  multiplyByNum(t: number): Vec3 {
    return new Vec3(this._x * t, this._y * t, this._z * t);
  }

  divide(v: Vec3): Vec3 {
    return new Vec3(this._x / v.x, this._y / v.y, this._z / v.z);
  }

  divideByNum(t: number): Vec3 {
    return this.multiplyByNum(1 / t);
  }

  lengthSquared(): number {
    return this._x * this._x + this._y * this._y + this._z * this._z;
  }

  length(): number {
    return Math.sqrt(this.lengthSquared());
  }

  dot(v: Vec3): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  cross(v: Vec3): Vec3 {
    return new Vec3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x,
    );
  }

  unitVector(): Vec3 {
    return this.divideByNum(this.length());
  }

  toColor(): Color {
    return new Color(this._x, this._y, this._z);
  }
}
