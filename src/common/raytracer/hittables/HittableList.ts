import { Hittable } from "./Hittable.ts";
import { Ray } from "../Ray.ts";
import { Interval } from "../Interval.ts";
import {HitRecord} from "./HitRecord.ts";

export class HittableList implements Hittable {
  private objects: Array<Hittable>;

  constructor(objects: Array<Hittable>) {
    this.objects = objects;
  }

  clear() {
    this.objects = [];
  }

  add(object: Hittable) {
    this.objects.push(object);
  }

  hit(r: Ray, rayT: Interval, rec: HitRecord): boolean {
    let tempRec = HitRecord.init();
    let hitAnything = false;
    let closestSoFar = rayT.max;

    for (let i = 0; i < this.objects.length; i++) {
      const object = this.objects[i];
      if (object.hit(r, new Interval(rayT.min, closestSoFar), tempRec)) {
        hitAnything = true;
        closestSoFar = tempRec.t;
        rec.setAll(tempRec);
      }
    }

    return hitAnything;
  }
}
