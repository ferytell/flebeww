import React, { useEffect, useRef } from "react";
import "./menu.css";

function Menu() {
  const canvasRef = useRef(null);
  const particleArray = useRef([]);
  const animationFrameId = useRef(null);
  const mouse = useRef({ x: null, y: null });

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
      }
      draw() {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function init() {
      for (let i = 0; i < 100; i++) {
        particleArray.current.push(new Particle());
      }
    }

    function handleParticles() {
      for (let i = 0; i < particleArray.current.length; i++) {
        particleArray.current[i].update();
        particleArray.current[i].draw();
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      animationFrameId.current = requestAnimationFrame(animate);
    }

    // Event handlers
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (event) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    };

    const handleClick = (event) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
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
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="App">
      <div className="body">testing jee</div>
      <div>
        <div id="main-page">this is main </div>

        <div id="sidehover" className="sidehover">
          <button className="openbtn">&#9776; Profile</button>
        </div>
        <div id="root">
          <nav id="main-nav" className="sidebar">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/game">Game</a>
          </nav>
          <div id="main-page"> </div>
        </div>
      </div>

      <div className="hear">
        <h1>Bubble</h1>
      </div>
      <main>
        <canvas ref={canvasRef} id="canvas1"></canvas>
      </main>
    </div>
  );
}

export default Menu;
