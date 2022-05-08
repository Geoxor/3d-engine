import "./style.css";
import { Chunk,  } from "./Chunk";
import { Vec3D } from "./Vec3D";
import { Viewport } from "./Viewport";

class Rotation {
  constructor(public pitch: number, public yaw: number, public roll: number = 0 ) {

  }

  public rotate(pitch: number, yaw: number, roll: number) {
    if (this.yaw >= 180) {
      this.yaw -= 360;
    }
    if (this.yaw <= -180) {
      this.yaw += 360;
    }
    if (this.pitch >= 90) {
      this.pitch = 90;
    }
    if (this.pitch <= -90) {
      this.pitch = -90;
    }

    this.pitch += pitch;
    this.yaw -= yaw;
    this.roll += roll;
  }
}


class Camera {
  constructor(public position: Vec3D, public rotation: Rotation) {
  }

  public move(x: number, y: number, z: number) {
    this.position.x += x;
    this.position.y += y;
    this.position.z += z;

    return this;
  }

  public rotate(pitch: number, yaw: number, roll: number) {
    this.rotation.rotate(pitch, yaw, roll);
    return this;
  }
}

class Player {
  public position: Vec3D = new Vec3D(0, 5, 10);
  public camera = new Camera(this.position, new Rotation(0, 0, 0));
  public velocity: Vec3D = new Vec3D(1, 1, 1);
  public rotation: Rotation = new Rotation(0, 0);
  public fov = 6;

  constructor(){
    document.addEventListener("keydown", (e) => {
      e.key === "w" && (this.position.y -= this.velocity.y * 0.1);
      e.key === "s" &&  (this.position.y += this.velocity.y * 0.1);
      e.key === "a" &&  (this.position.x += this.velocity.x * 0.1);
      e.key === "d" &&  (this.position.x -= this.velocity.x * 0.1);
      e.key === " " &&  (this.position.z += this.velocity.z * 0.1);
      e.key === "Shift" &&  (this.position.z -= this.velocity.z * 0.1);
    });

    document.addEventListener("mousemove" , (e) => {
      this.camera.rotate(e.movementY * 0.1, e.movementX * 0.1, 0);
    });
  }
}

class Engine {
  public app = document.querySelector<HTMLDivElement>("#app")!; 
  public viewport: Viewport = new Viewport(this.app);
  public chunk: Chunk =  new Chunk(new Vec3D(5, 5, 10));
  public player: Player = new Player();

  public render() {
    this.viewport.canvas.fillStyle = "black";
    this.viewport.canvas.fillRect(0, 0, this.viewport.x, this.viewport.y);
    this.viewport.canvas.strokeStyle = "#ffffff";

    this.chunk.cubes.forEach((cube) => {
      const x = this.player.position.x - cube.position.x;
      const y = this.player.position.y - cube.position.y;
      const z = this.player.position.z - cube.position.z;

      for (let i = 0; i < cube.triangles.length; i++) {
        const triangle = cube.triangles[i];
  
        const projected = triangle.points.map((point) => {
          const vec = new Vec3D(point.x, point.y, point.z);
          vec.x += x;
          vec.y += y;
          vec.z += z;
          // rotation
          const rotated = vec.rotate(this.player.camera.rotation.pitch, this.player.camera.rotation.yaw, this.player.camera.rotation.roll);
          // perspective
          const perspective = rotated.perspective(this.player.fov);
          
          return perspective.project(this.viewport);
        });

        // draw the triangle
        this.viewport.canvas.beginPath();
        this.viewport.canvas.moveTo(projected[0].x, projected[0].y);
        this.viewport.canvas.lineTo(projected[1].x, projected[1].y);
        this.viewport.canvas.lineTo(projected[2].x, projected[2].y);
        this.viewport.canvas.closePath();
        this.viewport.canvas.stroke();
      }
    });
  
    // add text to the top left of the position
    this.viewport.canvas.font = "12px Arial";
    this.viewport.canvas.fillStyle = "#ffffff";
    this.viewport.canvas.fillText(`player x: ${this.player.position.x}`, 10, 20);
    this.viewport.canvas.fillText(`player y: ${this.player.position.y}`, 10, 35);
    this.viewport.canvas.fillText(`player z: ${this.player.position.z}`, 10, 50);
    this.viewport.canvas.fillText(`player fov: ${this.player.fov}`, 10, 65);
    this.viewport.canvas.fillText(`player rotation: ${this.player.rotation.pitch.toFixed(2)} ${this.player.rotation.yaw.toFixed(2)} ${this.player.rotation.roll.toFixed(2)}`, 10, 80);
  
  }

  public update() {
    this.render();
  }


  constructor() {

    // get delta time
    let lastTime = Date.now();
    let deltaTime = 0;
    const update = () => {
      const now = Date.now();
      deltaTime = now - lastTime;
      lastTime = now;
      this.update();
      requestAnimationFrame(update);
    }
    update();

    // setInterval(() => this.update(), 1000 / 60);
  }
}

new Engine();
