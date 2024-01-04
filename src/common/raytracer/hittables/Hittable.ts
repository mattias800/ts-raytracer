import { Ray } from "../Ray.ts";
import { Interval } from "../Interval.ts";
import { HitRecord } from "./HitRecord.ts";

export interface Hittable {
  hit(r: Ray, rayT: Interval, rec: HitRecord): boolean;
}
