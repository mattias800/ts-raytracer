import { Material } from "./Material.ts";
import { Color } from "../Color.ts";
import { Ray } from "../Ray.ts";
import { HitRecord } from "../hittables/HitRecord.ts";

export class Metal implements Material {
  albedo: Color;

  constructor(albedo: Color) {
    this.albedo = albedo;
  }

  scatter(
    rayIn: Ray,
    rec: HitRecord,
    attenuation: Color,
    scattered: Ray,
  ): boolean {
    const reflected = rayIn.direction.unitVector().reflect(rec.normal);
    scattered.origin = rec.point;
    scattered.direction = reflected;
    attenuation.setAll(this.albedo);
    return true;
  }
}
