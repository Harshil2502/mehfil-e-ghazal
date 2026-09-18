import React, { useEffect, useRef } from 'react';

export default function ParticleCanvas({ isEnabled }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isEnabled) return;
    const ctx = canvas.getContext('2d');
    let animId = null;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    class Particle {
      constructor() { this.reset(true); }
      reset(randomY) {
        this.x = Math.random() * canvas.width;
        this.y = randomY ? Math.random() * canvas.height : canvas.height + 20;
        this.radius = 1 + Math.random() * 2;
        this.vy = -(0.25 + Math.random() * 0.5);
        this.vx = (Math.random() - 0.5) * 0.4;
        this.alpha = 0.2 + Math.random() * 0.6;
        this.fadeSpeed = 0.003 + Math.random() * 0.005;
        this.fadingIn = true;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.fadingIn) {
          this.alpha += this.fadeSpeed;
          if (this.alpha >= 0.8) this.fadingIn = false;
        } else {
          this.alpha -= this.fadeSpeed;
          if (this.alpha <= 0.1) this.fadingIn = true;
        }
        if (this.y < -30 || this.x < -30 || this.x > canvas.width + 30) {
          this.reset(false);
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 191, 36, ${this.alpha})`;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 8;
        ctx.fill();
      }
    }

    const count = Math.min(65, Math.floor(window.innerWidth * 0.05));
    const particles = Array.from({ length: count }, () => new Particle());

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-[4] opacity-75"
    />
  );
}
