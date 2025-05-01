import Entity from "./Entity";

export default class Player extends Entity {
  constructor(x, y) {
    super(x, y, 24, 24);
    this.color = "#3498db";
    this.speed = 4;
    this.health = 100;

    // Add these properties for more precise physics
    this.positionPrecision = 0.01; // Small value for snapping
    this.skinWidth = 0.05; // Small inset to prevent sticking

    // Gravity properties
    this.gravity = 20;
    this.velocityY = 0;
    this.jumpForce = -15; // Negative because y increases downward
    this.isGrounded = false;
    this.canJump = true;
  }

  handleInput(input) {
    // Horizontal movement (left/right)
    this.direction.x = 0;
    if (input.left) this.direction.x = -1;
    if (input.right) this.direction.x = 1;

    // Jumping
    if (input.up && this.isGrounded && this.canJump) {
      this.velocityY = this.jumpForce;
      this.isGrounded = false;
      this.canJump = false;

      // Prevent continuous jumping while holding the key
      setTimeout(() => {
        this.canJump = true;
      }, 300);
    }
  }

  update(deltaTime) {
    // Apply gravity
    this.velocityY += this.gravity * deltaTime;

    // Update position based on velocity
    this.y += this.velocityY * deltaTime;
    this.x += this.direction.x * this.speed * deltaTime;

    // Reset grounded state - will be set by collision system
    this.isGrounded = false;
  }

  // onCollision() {
  //   // Player reaction to collision
  //   this.color = "#9b59b6"; // Change color on collision
  //   setTimeout(() => {
  //     this.color = "#3498db";
  //   }, 200);
  // }

  onCollision(direction) {
    // Handle collision responses
    if (direction === "top") {
      // Hit something above us (ceiling)
      this.velocityY = 0;
    } else if (direction === "bottom") {
      // Landed on something
      this.velocityY = 0;
      this.isGrounded = true;
    } else if (direction === "left" || direction === "right") {
      console.log("left or right");
      // Hit a wall
      // Optional: you might want to stop horizontal movement here
    }

    // Visual feedback
    this.color = "#9b59b6";
    setTimeout(() => {
      this.color = "#3498db";
    }, 200);
  }
}
