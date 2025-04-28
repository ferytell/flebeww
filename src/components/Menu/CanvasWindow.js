export class CanvasWindow {
  constructor(title, content, x, y, width, height, onClose) {
    this.title = title;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isOpen = false;
    this.isDragging = false;
    this.dragOffset = { x: 0, y: 0 };
    this.onClose = onClose;
    this.content = content;
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    if (this.onClose) this.onClose();
  }

  draw(ctx) {
    if (!this.isOpen) return;

    // Window background
    ctx.fillStyle = "rgba(50, 50, 80, 0.9)";
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.width, this.height, 5);
    ctx.fill();

    // Title bar
    ctx.fillStyle = "rgba(30, 30, 60, 1)";
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.width, 30, [5, 5, 0, 0]);
    ctx.fill();

    // Title text
    ctx.fillStyle = "white";
    ctx.font = "16px brush script mt";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(this.title, this.x + 10, this.y + 15);

    // Close button
    ctx.fillStyle = "rgba(255, 80, 80, 1)";
    ctx.beginPath();
    ctx.arc(this.x + this.width - 20, this.y + 15, 8, 0, Math.PI * 2);
    ctx.fill();
    // Close text
    ctx.fillStyle = "white";
    ctx.font = "14px trebuchet ms";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("x", this.x + this.width - 23, this.y + 15);

    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      this.content,
      this.x + this.width / 2,
      this.y + this.height / 2
    );

    // // Back button
    // ctx.fillStyle = "rgba(80, 80, 255, 1)";
    // ctx.beginPath();
    // ctx.roundRect(this.x + 10, this.y + 40, 60, 30, 5);
    // ctx.fill();

    // ctx.fillStyle = "white";
    // ctx.font = "14px Arial";
    // ctx.textAlign = "center";
    // ctx.textBaseline = "middle";
    // ctx.fillText("Back", this.x + 40, this.y + 55);
  }

  isTitleBarHovered(mouse) {
    return (
      mouse.x > this.x &&
      mouse.x < this.x + this.width &&
      mouse.y > this.y &&
      mouse.y < this.y + 30
    );
  }

  isCloseButtonHovered(mouse) {
    console.log("isCloseButtonHovered");
    const closeX = this.x + this.width - 20;
    const closeY = this.y + 15;
    const distance = Math.sqrt(
      (mouse.x - closeX) ** 2 + (mouse.y - closeY) ** 2
    );
    return distance < 8;
  }

  // isBackButtonHovered(mouse) {
  //   console.log("isBackButtonHovered");
  //   const closeX = this.x + this.width - 10;
  //   const closeY = this.y + 40;

  //   //ctx.roundRect(this.x + 10, this.y + 40, 60, 30, 5);
  //   const distance = Math.sqrt(
  //     (mouse.x - closeX) ** 2 + (mouse.y - closeY) ** 2
  //   );
  //   return distance < 8;
  // }

  startDrag(mouse) {
    if (this.isTitleBarHovered(mouse)) {
      this.isDragging = true;
      this.dragOffset = {
        x: mouse.x - this.x,
        y: mouse.y - this.y,
      };
    }
  }

  updateDrag(mouse) {
    if (this.isDragging) {
      this.x = mouse.x - this.dragOffset.x;
      this.y = mouse.y - this.dragOffset.y;
    }
  }

  endDrag() {
    this.isDragging = false;
  }
}
