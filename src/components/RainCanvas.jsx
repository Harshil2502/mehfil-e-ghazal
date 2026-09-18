import React, { useEffect, useRef } from 'react';

export default function RainCanvas({ isActive }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId = null;
    let drops = [];
    let splashes = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    class Drop {
      constructor() { this.reset(true); }
      reset(randomY) {
        this.x = Math.random() * (canvas.width + 200) - 100;
        this.y = randomY ? Math.random() * canvas.height : -30;
        this.z = Math.random() * 0.8 + 0.2;
        this.speed = (18 + Math.random() * 12) * this.z;
        this.len = (15 + Math.random() * 18) * this.z;
        this.wind = -2.2 * this.z;
        this.alpha = 0.2 + this.z * 0.4;
      }
      update() {
        this.x += this.wind;
        this.y += this.speed;
        if (this.y > canvas.height - 20) {
          if (Math.random() < 0.3 && splashes.length < 80) {
            splashes.push(new Splash(this.x, canvas.height - 10, this.z));
          }
          this.reset(false);
        }
      }
      draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.wind * 1.5, this.y + this.len);
        ctx.strokeStyle = `rgba(200, 225, 255, ${this.alpha})`;
        ctx.lineWidth = 1 + this.z;
        ctx.stroke();
      }
    }

    class Splash {
      constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.vx = (Math.random() - 0.5) * 3 * z;
        this.vy = -(1.5 + Math.random() * 2.5) * z;
        this.gravity = 0.2;
        this.life = 1;
        this.decay = 0.08 + Math.random() * 0.05;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.life -= this.decay;
      }
      draw() {
        if (this.life <= 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.4 * this.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 230, 255, ${this.life * 0.5})`;
        ctx.fill();
      }
    }

    const count = Math.min(260, Math.floor(window.innerWidth * 0.22));
    drops = Array.from({ length: count }, () => new Drop());

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.length; i++) {
        drops[i].update();
        drops[i].draw();
      }
      for (let i = splashes.length - 1; i >= 0; i--) {
        splashes[i].update();
        splashes[i].draw();
        if (splashes[i].life <= 0) splashes.splice(i, 1);
      }
      animId = requestAnimationFrame(render);
    };

    if (isActive) {
      render();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-screen h-screen pointer-events-none z-10 transition-opacity duration-700 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
