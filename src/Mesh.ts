import { Triangle } from "./Triangle";

export class Mesh {
  constructor(public triangles: Triangle[]) {}

  public rotate(angleX: number, angleY: number, angleZ: number) {
    this.triangles.forEach((triangle) => {
      triangle.rotate(angleX, angleY, angleZ);
    });
  }

  public translate(x: number, y: number, z: number) {
    this.triangles.forEach((triangle) => {
      triangle.points.forEach((point) => {
        point.x += x;
        point.y += y;
        point.z += z;
      })
    });
  }
}
