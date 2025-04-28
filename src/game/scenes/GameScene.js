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

    // Update player position with collision detection
    const originalX = this.player.x;
    const originalY = this.player.y;

    // Apply movement
    this.player.x += this.player.direction.x * this.player.speed * deltaTime;
    this.player.y += this.player.direction.y * this.player.speed * deltaTime;

    // Check tile collisions
    if (
      CollisionSystem.checkTileCollision(
        this.player,
        this.tileMap.map,
        this.tileSize
      )
    ) {
      this.player.x = originalX;
      this.player.y = originalY;
    }

    // Check entity collisions
    this.npcs.forEach((npc) => {
      if (CollisionSystem.checkEntityCollision(this.player, npc)) {
        this.player.x = originalX;
        this.player.y = originalY;
        npc.onCollision(); // NPC reaction to collision
      }
    });
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

    // Draw UI
    this.ctx.fillStyle = "#000";
    this.ctx.font = "16px Arial";
    this.ctx.textAlign = "left";
    this.ctx.fillText(
      `Position: ${Math.floor(this.player.x)}, ${Math.floor(this.player.y)}`,
      20,
      30
    );
  }
}
