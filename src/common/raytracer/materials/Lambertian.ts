import { Material } from "./Material.ts";
import { Color } from "../Color.ts";
import { Ray } from "../Ray.ts";
import { HitRecord } from "../hittables/HitRecord.ts";
import { Vec3 } from "../Vec3.ts";

export class Lambertian implements Material {
  albedo: Color;

  constructor(albedo: Color) {
    this.albedo = albedo;
  }

  scatter(
    _rayIn: Ray,
    rec: HitRecord,
    attenuation: Color,
    scattered: Ray,
  ): boolean {
    let scatterDirection = rec.normal.add(Vec3.randomUnitVector());

    if (scatterDirection.nearZero()) {
      scatterDirection = rec.normal;
    }

    scattered.origin = rec.point;
    scattered.direction = scatterDirection;
    attenuation.setAll(this.albedo);
    return true;
  }
}
