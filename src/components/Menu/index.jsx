import React, { useEffect, useRef, useState } from "react";
import { Particle } from "./Particle";
import { MenuButton } from "./MenuButton";
import { CanvasWindow } from "./CanvasWindow";
import { GameWindow } from "../Game/GameWindow";
import { InputHandler } from "../Game/InputHandler";
import "./styles.css";

const CanvasMenu = () => {
  const canvasRef = useRef(null);
  const particleArray = useRef([]);
  const animationFrameId = useRef(null);
  const mouse = useRef({ x: null, y: null, clicked: false, isDown: false });
  const menuButtons = useRef([]);
  const windows = useRef([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const particlesActive = useRef(true);
  const inputHandler = useRef(new InputHandler());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set initial canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    const initParticles = () => {
      particleArray.current = [];
      for (let i = 0; i < 50; i++) {
        particleArray.current.push(new Particle(canvas));
      }
    };

    // Initialize menu buttons
    const initMenu = () => {
      const centerX = canvas.width / 2;
      const menuWidth = 100;
      //const menuSpacing = 60;

      menuButtons.current = [
        new MenuButton("Home", centerX - menuWidth / 2, 150, () => {
          openWindow(
            "Home",
            "",
            50,
            150,
            canvas.width - 100,
            canvas.height - 300
          );
        }),
        new MenuButton("About", centerX - menuWidth / 2, 210, () => {
          openWindow(
            "About",
            "This is the game that I build I try you know",
            50,
            150,
            canvas.width - 100,
            canvas.height - 300
          );
        }),
        new MenuButton("Game", centerX - menuWidth / 2, 270, () => {
          openWindow(
            new GameWindow(
              20,
              20,
              canvas.width - 40,
              canvas.height - 40,
              () => {
                particlesActive.current = true;
              }
            )
          );
        }),
      ];
    };

    const openWindow = (windowOrTitle, windowContent, x, y, width, height) => {
      particlesActive.current = false;

      let newWindow;

      if (typeof windowOrTitle === "string") {
        // Handle regular window creation
        newWindow = new CanvasWindow(
          windowOrTitle,
          windowContent,
          x,
          y,
          width,
          height,
          () => {
            particlesActive.current = true;
            setActiveWindow(null);
          }
        );
      } else {
        // Handle pre-created window instance (like GameWindow)
        newWindow = windowOrTitle;
        newWindow.setInputHandler(inputHandler.current);
        newWindow.onClose = () => {
          particlesActive.current = true;
          setActiveWindow(null);
        };
      }

      windows.current = [newWindow];
      newWindow.open();
      setActiveWindow(newWindow);
      console.log("Opening window:", newWindow.title);
    };

    // Handle particles animation
    const handleParticles = () => {
      if (!particlesActive.current) return;

      particleArray.current.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });
    };

    // Draw menu buttons
    const drawMenu = () => {
      if (activeWindow) return; // Don't show menu when window is active

      menuButtons.current.forEach((button) => {
        button.draw(ctx);
      });
    };

    // Draw windows
    const drawWindows = () => {
      windows.current.forEach((window) => {
        window.draw(ctx);
      });
    };

    // Check hover state
    const checkHover = () => {
      if (activeWindow) {
        // Only check hover for active window
        return;
      }

      menuButtons.current.forEach((button) => {
        button.active = button.isHovered(mouse.current);
      });
    };

    // Handle clicks
    const handleClicks = () => {
      if (!mouse.current.clicked) return;
      console.log("activeWindow:", activeWindow);
      if (activeWindow === null || activeWindow === "Main Menu") {
        // Handle window interactions
        menuButtons.current.forEach((button) => {
          if (button.isHovered(mouse.current)) {
            button.action();
          }
        });
        // if (activeWindow.isCloseButtonHovered(mouse.current)) {
        //   activeWindow.close();
        //   windows.current = [];
        // } else if (activeWindow.isBackButtonHovered(mouse.current)) {
        //   activeWindow.close();
        //   windows.current = [];
        // }
      } else {
        if (activeWindow.isCloseButtonHovered(mouse.current)) {
          activeWindow.close();
          windows.current = [];
        }
        console.log("here delete");
      }

      mouse.current.clicked = false;
    };

    // Handle window dragging
    const handleDragging = () => {
      if (!mouse.current.isDown || !activeWindow) return;

      if (
        !activeWindow.isDragging &&
        activeWindow.isTitleBarHovered(mouse.current)
      ) {
        activeWindow.startDrag(mouse.current);
      }
      activeWindow.updateDrag(mouse.current);
    };

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      handleParticles();
      drawMenu();

      //drawWindows();
      // Update and draw windows
      windows.current.forEach((window) => {
        if (window.isOpen) {
          if (window.update) window.update(); // Only GameWindow has update
          window.draw(ctx);
        }
      });

      checkHover();
      handleClicks();
      handleDragging();
      console.log("test FPS");
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Event handlers
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (!activeWindow) initMenu(); // Only reposition menu if no window is open
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = event.clientX - rect.left;
      mouse.current.y = event.clientY - rect.top;
      inputHandler.current.mouse.x = mouse.current.x;
      inputHandler.current.mouse.y = mouse.current.y;
    };

    const handleMouseDown = () => {
      mouse.current.isDown = true;
      inputHandler.current.mouse.isDown = true;
    };

    const handleMouseUp = () => {
      mouse.current.isDown = false;
      inputHandler.current.mouse.isDown = false;
      inputHandler.current.mouse.clicked = true;
      if (activeWindow) activeWindow.endDrag();
    };

    const handleClick = () => {
      mouse.current.clicked = true;
    };

    // Initialize and start
    initParticles();
    initMenu();
    animate();

    // Add event listeners
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("click", handleClick);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("click", handleClick);
    };
  }, [activeWindow]);

  return (
    <main className="canvas-container">
      <canvas ref={canvasRef} className="canvas-menu" />
    </main>
  );
};

export default CanvasMenu;
