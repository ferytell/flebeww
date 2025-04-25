import React, { useEffect, useRef } from "react";
import "./menu.css";

function Menu() {
  const canvasRef = useRef(null);
  const particleArray = useRef([]);
  const animationFrameId = useRef(null);
  const mouse = useRef({ x: null, y: null, clicked: false });
  const menuItems = useRef([
    {
      text: "Home",
      x: 0,
      y: 0,
      width: 100,
      height: 40,
      active: false,
      action: () => console.log("Home clicked"),
    },
    {
      text: "About",
      x: 0,
      y: 0,
      width: 100,
      height: 40,
      active: false,
      action: () => console.log("About clicked"),
    },
    {
      text: "Game",
      x: 0,
      y: 0,
      width: 100,
      height: 40,
      active: false,
      action: () => console.log("Game clicked"),
    },
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set initial canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 40 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      draw() {
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function init() {
      for (let i = 0; i < 50; i++) {
        particleArray.current.push(new Particle());
      }

      // Position menu items
      const centerX = canvas.width / 2;
      const menuWidth = 100;
      const menuSpacing = 60;

      menuItems.current.forEach((item, index) => {
        item.x = centerX - menuWidth / 2;
        item.y = 150 + index * menuSpacing;
        item.width = menuWidth;
        item.height = 40;
      });
    }

    function drawMenu() {
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      menuItems.current.forEach((item) => {
        // Draw button background
        ctx.fillStyle = item.active
          ? "rgba(100, 100, 255, 0.8)"
          : "rgba(0, 0, 100, 0.5)";
        ctx.beginPath();
        ctx.roundRect(item.x, item.y, item.width, item.height, 10);
        ctx.fill();

        // Draw button text
        ctx.fillStyle = "white";
        ctx.fillText(
          item.text,
          item.x + item.width / 2,
          item.y + item.height / 2
        );
      });
    }

    function handleParticles() {
      particleArray.current.forEach((particle) => {
        particle.update();
        particle.draw();
      });
    }

    function checkMenuHover() {
      menuItems.current.forEach((item) => {
        item.active =
          mouse.current.x > item.x &&
          mouse.current.x < item.x + item.width &&
          mouse.current.y > item.y &&
          mouse.current.y < item.y + item.height;
      });
    }

    function handleMenuClick() {
      if (!mouse.current.clicked) return;

      const clickedItem = menuItems.current.find(
        (item) =>
          mouse.current.x > item.x &&
          mouse.current.x < item.x + item.width &&
          mouse.current.y > item.y &&
          mouse.current.y < item.y + item.height
      );

      if (clickedItem) {
        clickedItem.action();
      }

      mouse.current.clicked = false;
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      drawMenu();
      checkMenuHover();
      handleMenuClick();
      animationFrameId.current = requestAnimationFrame(animate);
    }

    // Event handlers
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init(); // Reposition menu items on resize
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = event.clientX - rect.left;
      mouse.current.y = event.clientY - rect.top;
    };

    const handleClick = (event) => {
      mouse.current.clicked = true;
    };

    // Initialize and start animation
    init();
    animate();

    // Add event listeners
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="App">
      <main>
        <canvas
          ref={canvasRef}
          id="canvas1"
          style={{
            display: "block",
            background: "linear-gradient(to bottom, #1a2a6c, #b21f1f, #fdbb2d)",
          }}
        ></canvas>
      </main>
    </div>
  );
}

export default Menu;
