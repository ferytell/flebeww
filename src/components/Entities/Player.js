import { Entity } from "./Entity";

export class Player extends Entity {
  constructor(config) {
    super({
      ...config,
      speed: 200, // Default player speed
      health: 150, // Default player health
      maxHealth: 150,
    });

    this.score = 0;
    this.inventory = [];
    this.isPlayer = true;
  }

  update(deltaTime, inputHandler) {
    // Get input from input handler
    this.direction = {
      x: inputHandler.getHorizontalAxis(),
      y: inputHandler.getVerticalAxis(),
    };

    // Normalize diagonal movement
    if (this.direction.x !== 0 && this.direction.y !== 0) {
      this.direction.x *= 0.7071; // 1/sqrt(2)
      this.direction.y *= 0.7071;
    }

    // Handle shooting if space is pressed
    if (inputHandler.isKeyJustPressed(" ")) {
      this.shoot();
    }

    super.update(deltaTime);
  }

  shoot() {
    console.log("Player shoots!");
    // Create projectile logic here
  }

  draw(ctx) {
    super.draw(ctx);

    // Draw player-specific elements
    if (!this.sprite) {
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.width / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }

  addToInventory(item) {
    this.inventory.push(item);
  }

  increaseScore(points) {
    this.score += points;
  }
}
