import { Cube } from "./Cube";
import { Vec3D } from "./Vec3D";

export class Chunk {
  public cubes: Cube[] = [];
  constructor(public size: Vec3D) {
    for (let x = 0; x < this.size.x; x++) {
      for (let y = 0; y < this.size.y; y++) {
        for (let z = 0; z < this.size.z; z++) {
          this.cubes.push(new Cube(new Vec3D(x, y, z)));
        }
      }
    }
  }
}