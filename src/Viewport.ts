export class Viewport {
  public x: number = window.innerWidth;
  public y: number = window.innerHeight;
  private _canvasElement: HTMLCanvasElement = document.createElement("canvas");
  public canvas = this._canvasElement.getContext("2d")!;

  constructor(public app: HTMLElement) {
    this.mountCanvas();
    window.onresize = () => this.updateDimensions();
  }

  public updateDimensions() {
    this.x = window.innerWidth;
    this.y = window.innerHeight;
    this.mountCanvas();
  }

  private mountCanvas() {
    this._canvasElement.width = this.x;
    this._canvasElement.height = this.y;
    this.app.appendChild(this._canvasElement);

    this._canvasElement.addEventListener("click", () => {
      this._canvasElement.requestPointerLock();
    })


    // fill the background with black

    this.canvas.fillStyle = "black";
    this.canvas.fillRect(
      0,
      0,
      this._canvasElement.width,
      this._canvasElement.height
    );
  }
}