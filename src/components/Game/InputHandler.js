export class InputHandler {
  constructor() {
    // Keyboard state
    this.keys = {};
    this.keyState = {};

    // These are required for the methods to exist
    this.getHorizontalAxis = this.getHorizontalAxis.bind(this);
    this.getVerticalAxis = this.getVerticalAxis.bind(this);

    // Mouse state
    this.mouse = {
      x: 0,
      y: 0,
      clicked: false,
      isDown: false,
    };

    // Setup event listeners
    this.setupKeyboardListeners();
    this.setupMouseListeners();
  }

  setupKeyboardListeners() {
    window.addEventListener("keydown", (e) => {
      this.keys[e.key] = true;
      this.keyState[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key] = false;
      this.keyState[e.key] = false;
    });
  }

  getHorizontalAxis() {
    return (
      (this.keys["ArrowRight"] || this.keys["d"] ? 1 : 0) -
      (this.keys["ArrowLeft"] || this.keys["a"] ? 1 : 0)
    );
  }

  getVerticalAxis() {
    return (
      (this.keys["ArrowDown"] || this.keys["s"] ? 1 : 0) -
      (this.keys["ArrowUp"] || this.keys["w"] ? 1 : 0)
    );
  }

  setupMouseListeners() {
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener("mousedown", () => {
      this.mouse.isDown = true;
    });

    window.addEventListener("mouseup", () => {
      this.mouse.isDown = false;
      this.mouse.clicked = true;
    });
  }

  getHorizontalAxis() {
    return (
      (this.keys["ArrowRight"] || this.keys["d"] ? 1 : 0) -
      (this.keys["ArrowLeft"] || this.keys["a"] ? 1 : 0)
    );
  }

  getVerticalAxis() {
    return (
      (this.keys["ArrowDown"] || this.keys["s"] ? 1 : 0) -
      (this.keys["ArrowUp"] || this.keys["w"] ? 1 : 0)
    );
  }

  isKeyPressed(key) {
    return this.keys[key] || false;
  }

  isKeyJustPressed(key) {
    return this.keyState[key] || false;
  }

  clearKeyState() {
    this.keyState = {};
    this.mouse.clicked = false;
  }
}
