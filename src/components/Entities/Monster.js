import { Entity } from "./Entity";

export class Monster extends Entity {
  constructor(config) {
    super({
      ...config,
      speed: 80, // Default monster speed
      health: 50, // Default monster health
      maxHealth: 50,
    });

    this.damage = 10;
    this.attackCooldown = 1000; // ms
    this.lastAttackTime = 0;
    this.isEnemy = true;
  }

  update(deltaTime, target) {
    // Simple AI: move toward target
    if (target) {
      const dx = target.x - this.x;
      const dy = target.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0) {
        this.direction = {
          x: dx / distance,
          y: dy / distance,
        };
      }
    }

    super.update(deltaTime);
  }

  draw(ctx) {
    super.draw(ctx);

    // Draw monster-specific elements
    if (!this.sprite) {
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fill();
    }
  }

  attack(target, currentTime) {
    if (currentTime - this.lastAttackTime > this.attackCooldown) {
      target.takeDamage(this.damage);
      this.lastAttackTime = currentTime;
      return true;
    }
    return false;
  }
}
