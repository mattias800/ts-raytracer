import { Vec3 } from "../../common/raytracer/Vec3.ts";
import { HittableList } from "../../common/raytracer/hittables/HittableList.ts";
import { Sphere } from "../../common/raytracer/hittables/Sphere.ts";
import { Camera } from "../../common/raytracer/Camera.ts";
import { Lambertian } from "../../common/raytracer/materials/Lambertian.ts";
import { Color } from "../../common/raytracer/Color.ts";
import { Metal } from "../../common/raytracer/materials/Metal.ts";
import { Dielectric } from "../../common/raytracer/materials/Dielectric.ts";
import { getRandom } from "../../common/raytracer/MathUtils.ts";

export const main = () => {
  const world = new HittableList();

  const groundMaterial = new Lambertian(new Color(0.5, 0.5, 0.5));
  world.add(new Sphere(new Vec3(0, -1000, 0), 1000, groundMaterial));

  for (let a = -11; a < 11; a++) {
    for (let b = -11; b < 11; b++) {
      const chooseMat = Math.random();
      const center = new Vec3(
        a + 0.9 * Math.random(),
        0.2,
        b + 0.9 * Math.random(),
      );

      if (center.sub(new Vec3(4, 0.2, 0)).length() > 0.9) {
        let sphereMaterial;

        if (chooseMat < 0.8) {
          // diffuse
          const albedo = Color.random().multiply(Color.random());
          sphereMaterial = new Lambertian(albedo);
          world.add(new Sphere(center, 0.2, sphereMaterial));
        } else if (chooseMat < 0.95) {
          // metal
          const albedo = Color.random(0.5, 1);
          const fuzz = getRandom(0, 0.5);
          sphereMaterial = new Metal(albedo, fuzz);
          world.add(new Sphere(center, 0.2, sphereMaterial));
        } else {
          // glass
          sphereMaterial = new Dielectric(1.5);
          world.add(new Sphere(center, 0.2, sphereMaterial));
        }
      }
    }
  }

  const material1 = new Dielectric(1.5);
  world.add(new Sphere(new Vec3(0, 1, 0), 1.0, material1));

  const material2 = new Lambertian(new Color(0.4, 0.2, 0.1));
  world.add(new Sphere(new Vec3(-4, 1, 0), 1.0, material2));

  const material3 = new Metal(new Color(0.7, 0.6, 0.5), 0.0);
  world.add(new Sphere(new Vec3(4, 1, 0), 1.0, material3));

  const cam = new Camera();
  cam.aspectRatio = 16.0 / 9.0;
  cam.imageWidth = 1200;
  cam.samplesPerPixel = 500;
  cam.maxDepth = 50;

  cam.vfov = 20;
  cam.lookFrom = new Vec3(13, 2, 3);
  cam.lookAt = new Vec3(0, 0, 0);
  cam.vup = new Vec3(0, 1, 0);
  cam.defocusAngle = 0.6;
  cam.focusDistance = 10.0;

  cam.render(world);
};
