"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  body: string;
  highlight: string;
}

const SPHERE_COLORS = [
  { body: "201, 181, 165", highlight: "255, 248, 238" }, // warm beige → cream
  { body: "142, 165, 163", highlight: "208, 232, 230" }, // sage green → light aqua
  { body: "184, 124, 78",  highlight: "255, 218, 160" }, // warm brown → golden
  { body: "160, 100, 50",  highlight: "255, 200, 120" }, // deeper brown → amber
];

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function makeParticle(): Particle {
      const c = SPHERE_COLORS[Math.floor(Math.random() * SPHERE_COLORS.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3.5 + 2.5,       // 2.5 – 6 px
        speedX: (Math.random() - 0.5) * 0.22,
        speedY: (Math.random() - 0.5) * 0.20,
        opacity: Math.random() * 0.45 + 0.25,  // 0.25 – 0.70
        body: c.body,
        highlight: c.highlight,
      };
    }

    function createParticles(count: number) {
      particles = Array.from({ length: count }, makeParticle);
    }

    function drawSphere(p: Particle) {
      // Offset highlight to top-left for 3D look
      const hx = p.x - p.size * 0.32;
      const hy = p.y - p.size * 0.38;

      const grad = ctx.createRadialGradient(
        hx, hy, p.size * 0.04,
        p.x, p.y, p.size
      );
      grad.addColorStop(0,    `rgba(${p.highlight}, ${Math.min(1, p.opacity * 2.0)})`);
      grad.addColorStop(0.30, `rgba(${p.highlight}, ${p.opacity * 1.0})`);
      grad.addColorStop(0.62, `rgba(${p.body},      ${p.opacity})`);
      grad.addColorStop(1,    `rgba(${p.body},      0)`);

      // Electric outer glow
      ctx.shadowBlur = p.size * 5;
      ctx.shadowColor = `rgba(${p.body}, ${p.opacity * 0.55})`;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.shadowBlur = 0;
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < -p.size)      p.x = width  + p.size;
        if (p.x > width  + p.size) p.x = -p.size;
        if (p.y < -p.size)      p.y = height + p.size;
        if (p.y > height + p.size) p.y = -p.size;

        drawSphere(p);
      }

      animationId = requestAnimationFrame(animate);
    }

    resize();
    createParticles(100);
    animate();

    const handleResize = () => { resize(); createParticles(28); };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" aria-hidden="true" />;
}
