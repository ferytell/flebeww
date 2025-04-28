import { CanvasWindow } from "../Menu/CanvasWindow";
import { EntityManager } from "../Entities/EntityManager";
import { Player } from "../Entities/Player";
import { Monster } from "../Entities/Monster";
import { InputHandler } from "./InputHandler";

export class GameWindow extends CanvasWindow {
  constructor(x, y, width, height, onClose) {
    super("Game", "XXX", x, y, width, height, onClose);
    this.entityManager = new EntityManager();
    this.lastTime = performance.now();
    this.inputHandler = new InputHandler();
    this.initGame();

    // Game-specific initialization
  }
  initGame() {
    // Create player
    this.player = new Player({
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
      width: 32,
      height: 32,
      onDestroy: () => console.log("Player died!"),
    });
    this.entityManager.addEntity(this.player);

    // Create monsters
    for (let i = 0; i < 5; i++) {
      const monster = new Monster({
        x: this.x + Math.random() * this.width,
        y: this.y + Math.random() * this.height,
        width: 24,
        height: 24,
        onDestroy: () => this.player.increaseScore(10),
      });
      this.entityManager.addEntity(monster);
    }
  }

  update() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    // Update player with input
    if (this.player) {
      this.player.update(deltaTime, this.inputHandler);
    }

    // Update other entities
    this.entityManager.updateAll(deltaTime, this.player);
    this.entityManager.checkCollisions();

    // Clear one-time input states
    this.inputHandler.clearKeyState();
  }

  draw(ctx) {
    super.draw(ctx); // Draw the window first

    // Draw game content within window bounds
    ctx.save();
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.clip();

    this.entityManager.drawAll(ctx);

    ctx.restore();
  }
}
