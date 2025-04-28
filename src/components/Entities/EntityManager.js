export class EntityManager {
  constructor() {
    this.entities = [];
    this.player = null;
  }

  addEntity(entity) {
    this.entities.push(entity);
    if (entity.isPlayer) {
      this.player = entity;
    }
  }

  removeEntity(entity) {
    this.entities = this.entities.filter((e) => e !== entity);
    if (entity.isPlayer) {
      this.player = null;
    }
  }

  updateAll(deltaTime, inputHandler) {
    // Update player first
    if (this.player) {
      this.player.update(deltaTime, inputHandler);
    }

    // Update other entities
    this.entities.forEach((entity) => {
      if (!entity.isPlayer && entity.isActive) {
        entity.update(deltaTime, this.player);
      }
    });

    // Clean up destroyed entities
    this.entities = this.entities.filter((entity) => entity.isActive);
  }

  drawAll(ctx) {
    // Draw all active entities
    this.entities.forEach((entity) => {
      if (entity.isActive) {
        entity.draw(ctx);
      }
    });

    // Draw player last (on top)
    if (this.player && this.player.isActive) {
      this.player.draw(ctx);
    }
  }

  checkCollisions() {
    // Example: Check collisions between enemies and player
    if (!this.player) return;

    this.entities.forEach((entity) => {
      if (entity.isEnemy && entity.checkCollision(this.player)) {
        entity.attack(this.player, performance.now());
      }
    });
  }
}
