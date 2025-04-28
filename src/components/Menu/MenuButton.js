export class MenuButton {
  constructor(text, x, y, action) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 40;
    this.active = false;
    this.action = action;
  }

  draw(ctx) {
    // Draw button background
    ctx.fillStyle = this.active
      ? "rgba(100, 100, 255, 0.8)"
      : "rgba(0, 0, 100, 0.5)";
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.width, this.height, 10);
    ctx.fill();

    // Draw button text
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
  }

  isHovered(mouse) {
    return (
      mouse.x > this.x &&
      mouse.x < this.x + this.width &&
      mouse.y > this.y &&
      mouse.y < this.y + this.height
    );
  }
}
