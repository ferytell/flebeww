export default class HomeScene {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  init() {
    // Initialization if needed
  }

  update() {
    // No updates needed for home scene
  }

  render() {
    this.ctx.fillStyle = "#f8f8f8";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "#333";
    this.ctx.font = "30px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Welcome to the Game",
      this.canvas.width / 2,
      this.canvas.height / 2
    );

    this.ctx.font = "20px Arial";
    this.ctx.fillText(
      'Select "Play" from the menu to start',
      this.canvas.width / 2,
      this.canvas.height / 2 + 40
    );
  }
}
