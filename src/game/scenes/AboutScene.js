export default class AboutScene {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  init() {
    // Initialization if needed
  }

  update() {
    // No updates needed for about scene
  }

  render() {
    this.ctx.fillStyle = "#e8f8f8";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "#333";
    this.ctx.font = "30px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("About the Game", this.canvas.width / 2, 60);

    this.ctx.font = "16px Arial";
    this.ctx.textAlign = "left";

    const lines = [
      "This is a simple game built with React and Canvas.",
      "",
      "Features:",
      "- Modular architecture",
      "- Entity component system",
      "- Scene management",
      "- Input handling",
      "",
      "Use the menu to navigate between scenes.",
    ];

    lines.forEach((line, i) => {
      this.ctx.fillText(line, 50, 120 + i * 30);
    });
  }
}
