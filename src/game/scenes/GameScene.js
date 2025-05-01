import Player from "../entities/Player";
import NPC from "../entities/NPC";
import InputHandler from "../core/InputHandler";
import TileMap from "../core/TileMap";
import CollisionSystem from "../core/CollisionSystem";

export default class GameScene {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.player = null;
    this.npcs = [];
    this.inputHandler = null;
    this.tileMap = null;
    this.tileSize = 32;
    this.lastTime = 0;
  }

  init() {
    this.player = new Player(64, 64);
    this.inputHandler = new InputHandler();
    this.tileMap = new TileMap(this.tileSize);

    // Add some NPCs
    this.npcs = [new NPC(160, 160), new NPC(320, 96), new NPC(96, 320)];
  }

  update(deltaTime) {
    // Handle player input
    const input = this.inputHandler.getInput();
    this.player.handleInput(input);

    // Update player physics
    this.player.update(deltaTime);

    // // Update player position with collision detection
    // const originalX = this.player.x;
    // const originalY = this.player.y;

    // Check and resolve collisions
    CollisionSystem.resolveCollision(
      this.player,
      this.tileMap.map,
      this.tileSize
    );

    // Apply movement
    // this.player.x += this.player.direction.x * this.player.speed * deltaTime;
    // this.player.y += this.player.direction.y * this.player.speed * deltaTime;
    // Keep player within canvas bounds (optional)
    this.player.x = Math.max(
      0,
      Math.min(this.canvas.width - this.player.width, this.player.x)
    );
    this.player.y = Math.max(
      0,
      Math.min(this.canvas.height - this.player.height, this.player.y)
    );

    // Check tile collisions
    // if (
    //   CollisionSystem.checkTileCollision(
    //     this.player,
    //     this.tileMap.map,
    //     this.tileSize
    //   )
    // ) {
    //   this.player.x = originalX;
    //   this.player.y = originalY;
    // }

    // // Check entity collisions
    // this.npcs.forEach((npc) => {
    //   if (CollisionSystem.checkEntityCollision(this.player, npc)) {
    //     this.player.x = originalX;
    //     this.player.y = originalY;
    //     npc.onCollision(); // NPC reaction to collision
    //   }
    // });
  }

  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Render tilemap
    this.tileMap.render(this.ctx);

    // Render NPCs
    this.npcs.forEach((npc) => npc.render(this.ctx));

    // Render player
    this.player.render(this.ctx);

    // // Draw UI
    // this.ctx.fillStyle = "#000";
    // this.ctx.font = "16px Arial";
    // this.ctx.textAlign = "left";
    // this.ctx.fillText(
    //   `Position: ${Math.floor(this.player.x)}, ${Math.floor(this.player.y)}`,
    //   20,
    //   30
    // );

    // Add to GameScene render()
    this.ctx.strokeStyle = "red";
    this.ctx.strokeRect(
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height
    );

    // Draw tile grid
    this.ctx.strokeStyle = "rgba(0,0,0,0.2)";
    for (let y = 0; y < this.tileMap.platforms.length; y++) {
      for (let x = 0; x < this.tileMap.platforms[y].length; x++) {
        if (this.tileMap.platforms[y][x] === 1) {
          this.ctx.strokeRect(
            x * this.tileSize,
            y * this.tileSize,
            this.tileSize,
            this.tileSize
          );
        }
      }
    }
    // Draw UI
    this.ctx.fillStyle = "#000";
    this.ctx.font = "16px Arial";
    this.ctx.textAlign = "left";
    this.ctx.fillText(
      `Position: ${Math.floor(this.player.x)}, ${Math.floor(this.player.y)}`,
      20,
      30
    );
    this.ctx.fillText(
      `Velocity Y: ${this.player.velocityY.toFixed(1)}`,
      20,
      50
    );
    this.ctx.fillText(`Grounded: ${this.player.isGrounded}`, 20, 70);
  }
}
