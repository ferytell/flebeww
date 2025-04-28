import { useEffect, useRef } from "react";
import GameHandler from "../../game/core/GameHandler";
import "./GameCanvas.css";

const GameCanvas = ({ currentScene }) => {
  const canvasRef = useRef(null);
  const gameHandlerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Initialize game handler if not exists
    if (!gameHandlerRef.current) {
      gameHandlerRef.current = new GameHandler(canvas, ctx);
    }

    // Handle scene changes
    gameHandlerRef.current.changeScene(currentScene);

    // Game loop
    let animationFrameId;
    const gameLoop = () => {
      gameHandlerRef.current.update();
      gameHandlerRef.current.render();
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentScene]);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default GameCanvas;
