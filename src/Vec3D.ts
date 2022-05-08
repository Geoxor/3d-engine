import { Vec2D } from "./Vec2D";
import { Viewport } from "./Viewport";

export class Vec3D {
  constructor(public x: number, public y: number, public z: number) {}

  public rotate(pitch: number, yaw: number, roll: number) {
    const pitchRadians = pitch * Math.PI / 180;
    const yawRadians = yaw * Math.PI / 180;
    const rollRadians = roll * Math.PI / 180;

    this.rotateX(pitchRadians);
    this.rotateY(yawRadians);
    this.rotateZ(rollRadians);

    return this;
  }

  public perspective(fov: number, aspect: number = 1, near: number = 0.01, far: number = 0.1) {
    const z = this.z;
    this.z = (far + near) / (far - near) * (z - near);
    this.z = this.z * (fov / (2 * Math.PI));
    this.z = this.z * (aspect);
    return this;
  }

  public project(viewport: Viewport): Vec2D {
    const x = viewport.x / 2 + (this.x / this.z) * viewport.x / 2;
    const y = viewport.y / 2 + (this.y / this.z) * viewport.y / 2;
    return new Vec2D(x, y);
  }

  public rotateX(angle: number) {
    const y = this.y * Math.cos(angle) - this.z * Math.sin(angle);
    const z = this.y * Math.sin(angle) + this.z * Math.cos(angle);
    this.y = y;
    this.z = z;
  }

  public rotateY(angle: number) {
    const x = this.x * Math.cos(angle) + this.z * Math.sin(angle);
    const z = -this.x * Math.sin(angle) + this.z * Math.cos(angle);
    this.x = x;
    this.z = z;
  }

  public rotateZ(angle: number) {
    const x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    const y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    this.x = x;
    this.y = y;
  }
}
