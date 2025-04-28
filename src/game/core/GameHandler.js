//import Player from "../entities/Player";
import HomeScene from "../scenes/HomeScene";
import AboutScene from "../scenes/AboutScene";
import GameScene from "../scenes/GameScene";

export default class GameHandler {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.scenes = {
      home: new HomeScene(canvas, ctx),
      about: new AboutScene(canvas, ctx),
      game: new GameScene(canvas, ctx),
    };
    this.currentScene = null;
    this.lastTime = 0;
  }

  changeScene(sceneName) {
    if (this.scenes[sceneName]) {
      this.currentScene = this.scenes[sceneName];
      this.currentScene.init();
    }
  }

  update() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    if (this.currentScene) {
      this.currentScene.update(deltaTime);
    }
  }

  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.currentScene) {
      this.currentScene.render();
    }
  }
}
