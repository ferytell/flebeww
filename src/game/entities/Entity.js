export default class Entity {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.direction = { x: 0, y: 0 };
    this.color = "#000000";
    this.collidable = true;
  }

  update(deltaTime) {
    // this.x += this.direction.x * this.speed * deltaTime;
    // this.y += this.direction.y * this.speed * deltaTime;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  collidesWith(other) {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }
}
