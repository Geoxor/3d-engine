import { Mesh } from "./Mesh";
import { Triangle } from "./Triangle";
import { Vec3D } from "./Vec3D";

export class Cube extends Mesh {
  constructor(public position: Vec3D) {
    super([
      new Triangle([new Vec3D(0, 0, 0), new Vec3D(1, 0, 0), new Vec3D(1, 1, 0)]),
      new Triangle([new Vec3D(1, 1, 0), new Vec3D(0, 1, 0), new Vec3D(0, 0, 0)]),
      new Triangle([new Vec3D(0, 0, 1), new Vec3D(1, 0, 1), new Vec3D(1, 1, 1)]),
      new Triangle([new Vec3D(1, 1, 1), new Vec3D(0, 1, 1), new Vec3D(0, 0, 1)]),
      new Triangle([new Vec3D(0, 0, 0), new Vec3D(0, 1, 0), new Vec3D(0, 1, 1)]),
      new Triangle([new Vec3D(0, 1, 1), new Vec3D(0, 0, 1), new Vec3D(0, 0, 0)]),
      new Triangle([new Vec3D(1, 0, 0), new Vec3D(1, 1, 0), new Vec3D(1, 1, 1)]),
      new Triangle([new Vec3D(1, 1, 1), new Vec3D(1, 0, 1), new Vec3D(1, 0, 0)]),
    ])
  }
}
