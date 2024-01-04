import { Material } from "./Material.ts";
import { Color } from "../Color.ts";
import { Ray } from "../Ray.ts";
import { HitRecord } from "../hittables/HitRecord.ts";
import { Vec3 } from "../Vec3.ts";

export class Metal implements Material {
  albedo: Color;
  fuzz: number;

  constructor(albedo: Color, fuzz: number) {
    this.albedo = albedo;
    this.fuzz = fuzz;
  }

  scatter(
    rayIn: Ray,
    rec: HitRecord,
    attenuation: Color,
    scattered: Ray,
  ): boolean {
    const reflected = rayIn.direction.unitVector().reflect(rec.normal);

    scattered.origin = rec.point;
    scattered.direction = reflected.add(
      Vec3.randomUnitVector().multiplyByNum(this.fuzz),
    );

    attenuation.setAll(this.albedo);
    return true;
  }
}
