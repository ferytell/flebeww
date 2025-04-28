export class Entity {
  constructor({
    x = 0,
    y = 0,
    width = 32,
    height = 32,
    speed = 0,
    direction = { x: 0, y: 0 },
    health = 100,
    maxHealth = 100,
    isActive = true,
    sprite = null,
    onAction = () => {},
    onDestroy = () => {},
  } = {}) {
    // Position and size
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    // Movement
    this.speed = speed;
    this.direction = direction;
    this.velocity = { x: 0, y: 0 };

    // Health
    this.health = health;
    this.maxHealth = maxHealth;

    // State
    this.isActive = isActive;
    this.sprite = sprite;

    // Callbacks
    this.onAction = onAction;
    this.onDestroy = onDestroy;
  }

  // Update entity state (position, health, etc.)
  update(deltaTime) {
    if (!this.isActive) return;

    // Apply movement
    this.velocity.x = this.direction.x * this.speed;
    this.velocity.y = this.direction.y * this.speed;

    this.x += this.velocity.x * deltaTime;
    this.y += this.velocity.y * deltaTime;
  }

  // Draw the entity
  draw(ctx) {
    if (!this.isActive) return;

    if (this.sprite) {
      // Draw sprite if available
      ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    } else {
      // Default rectangle representation
      ctx.fillStyle = "rgba(1, 252, 1, 0.9)";
      ctx.beginPath();
      ctx.roundRect(this.x, this.y, this.width, this.height, 5);
      ctx.fill();
    }

    // Optional: Draw health bar
    this.drawHealthBar(ctx);
  }

  drawHealthBar(ctx) {
    if (this.health < this.maxHealth) {
      const barWidth = this.width;
      const barHeight = 5;
      const healthPercentage = this.health / this.maxHealth;

      // Background
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(this.x, this.y - 10, barWidth, barHeight);

      // Health
      ctx.fillStyle =
        healthPercentage > 0.6
          ? "green"
          : healthPercentage > 0.3
          ? "yellow"
          : "red";
      ctx.fillRect(this.x, this.y - 10, barWidth * healthPercentage, barHeight);
    }
  }

  // Handle collision with another entity
  checkCollision(otherEntity) {
    return (
      this.x < otherEntity.x + otherEntity.width &&
      this.x + this.width > otherEntity.x &&
      this.y < otherEntity.y + otherEntity.height &&
      this.y + this.height > otherEntity.y
    );
  }

  // Take damage
  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.destroy();
    }
  }

  // Destroy the entity
  destroy() {
    this.isActive = false;
    this.onDestroy(this);
  }

  // Perform entity-specific action
  action() {
    this.onAction(this);
  }
}
