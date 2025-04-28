export default class InputHandler {
  constructor() {
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      space: false,
      enter: false,
    };

    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener("keydown", (e) => {
      // eslint-disable-next-line default-case
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          this.keys.up = true;
          break;
        case "ArrowDown":
        case "s":
        case "S":
          this.keys.down = true;
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          this.keys.left = true;
          break;
        case "ArrowRight":
        case "d":
        case "D":
          this.keys.right = true;
          break;
        case " ":
          this.keys.space = true;
          break;
        case "Enter":
          this.keys.enter = true;
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      // eslint-disable-next-line default-case
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          this.keys.up = false;
          break;
        case "ArrowDown":
        case "s":
        case "S":
          this.keys.down = false;
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          this.keys.left = false;
          break;
        case "ArrowRight":
        case "d":
        case "D":
          this.keys.right = false;
          break;
        case " ":
          this.keys.space = false;
          break;
        case "Enter":
          this.keys.enter = false;
          break;
      }
    });
  }

  getInput() {
    return { ...this.keys };
  }
}
