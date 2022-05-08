import { Vec2D } from "./Vec2D";
import { Vec3D } from "./Vec3D";
import { Viewport } from "./Viewport";

export class Triangle {
  constructor(public points: [Vec3D, Vec3D, Vec3D]) {}

  public rotate(angleX: number, angleY: number, angleZ: number) {
    this.points.forEach((point) => {
      point.rotateX(angleX);
      point.rotateY(angleY);
      point.rotateZ(angleZ);
    });
  }

  public project(viewport: Viewport): [Vec2D, Vec2D, Vec2D] {
    return this.points.map((point) => point.project(viewport)) as [Vec2D, Vec2D, Vec2D];
  }
}
