import Entity from "./Entity";

export default class NPC extends Entity {
  constructor(x, y) {
    super(x, y, 24, 24);
    this.color = "#e74c3c";
    this.speed = 50;
    this.directionTimer = 0;
    this.directionChangeInterval = 2; // seconds
    this.setRandomDirection();
  }

  setRandomDirection() {
    const directions = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];
    this.direction = directions[Math.floor(Math.random() * directions.length)];
  }

  update(deltaTime) {
    this.directionTimer += deltaTime;
    if (this.directionTimer >= this.directionChangeInterval) {
      this.setRandomDirection();
      this.directionTimer = 0;
    }

    // NPCs will handle their own collision in the GameScene
  }

  onCollision() {
    this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
    this.setRandomDirection();
  }
}
