import Entity from "./Entity";

export default class Player extends Entity {
  constructor(x, y) {
    super(x, y, 24, 24);
    this.color = "#3498db";
    this.speed = 150;
    this.health = 100;
  }

  handleInput(input) {
    this.direction = { x: 0, y: 0 };

    if (input.up) this.direction.y = -1;
    if (input.down) this.direction.y = 1;
    if (input.left) this.direction.x = -1;
    if (input.right) this.direction.x = 1;

    // Normalize diagonal movement
    if (this.direction.x !== 0 && this.direction.y !== 0) {
      const length = Math.sqrt(this.direction.x ** 2 + this.direction.y ** 2);
      this.direction.x /= length;
      this.direction.y /= length;
    }
  }

  onCollision() {
    // Player reaction to collision
    this.color = "#9b59b6"; // Change color on collision
    setTimeout(() => {
      this.color = "#3498db";
    }, 200);
  }
}
