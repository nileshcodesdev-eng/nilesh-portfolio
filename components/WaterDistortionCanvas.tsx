"use client";

import React, { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
  color: string;
}

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

export const WaterDistortionCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const ripples: Ripple[] = [];
    const trail: TrailPoint[] = [];
    let mouse = { x: -100, y: -100, prevX: -100, prevY: -100, speed: 0 };
    let animationFrameId: number;
    let lastTime = performance.now();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const addRipple = (x: number, y: number, isClick = false) => {
      const colors = [
        "rgba(241, 48, 36, ",   // Accent Red
        "rgba(6, 182, 212, ",   // Cyan
        "rgba(147, 51, 234, ",  // Violet
        "rgba(56, 189, 248, ",  // Sky Blue
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];

      ripples.push({
        x,
        y,
        radius: 2,
        maxRadius: isClick ? 180 + Math.random() * 120 : 65 + Math.random() * 45,
        alpha: isClick ? 0.7 : 0.28,
        speed: isClick ? 3.5 : 1.8,
        color,
      });

      if (ripples.length > 25) {
        ripples.shift();
      }
    };

    let moveThrottle = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dx = e.clientX - mouse.prevX;
      const dy = e.clientY - mouse.prevY;
      mouse.speed = Math.hypot(dx, dy);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Add fluid trail
      trail.push({
        x: mouse.x,
        y: mouse.y,
        alpha: Math.min(0.35, 0.1 + mouse.speed * 0.01),
        size: Math.min(60, 24 + mouse.speed * 0.8),
      });
      if (trail.length > 20) trail.shift();

      // Trigger ripples on movement if speed is sufficient
      if (now - moveThrottle > 90 && mouse.speed > 8) {
        moveThrottle = now;
        addRipple(mouse.x, mouse.y, false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      addRipple(e.clientX, e.clientY, true);
      // Double concentric wave
      setTimeout(() => addRipple(e.clientX, e.clientY, true), 90);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    // --- Render Loop with Fluid Damping & Caustic Waves ---
    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle fluid mouse trail
      for (let i = 0; i < trail.length; i++) {
        const pt = trail[i];
        pt.alpha *= 0.94;
        pt.size *= 0.98;

        if (pt.alpha > 0.01) {
          const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, pt.size);
          grad.addColorStop(0, `rgba(6, 182, 212, ${pt.alpha * 0.4})`);
          grad.addColorStop(0.5, `rgba(241, 48, 36, ${pt.alpha * 0.2})`);
          grad.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Draw organic water ripples with refractive chromatic double ring
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha *= 0.965;

        if (r.radius >= r.maxRadius || r.alpha <= 0.01) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();

        // Primary Wave
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.lineWidth = Math.max(1, (1 - r.radius / r.maxRadius) * 2.5);
        ctx.strokeStyle = `${r.color}${r.alpha})`;
        ctx.stroke();

        // Secondary Chromatic Aberration Refraction Ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, Math.max(0, r.radius - 4), 0, Math.PI * 2);
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(56, 189, 248, ${r.alpha * 0.5})`;
        ctx.stroke();

        ctx.restore();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-15 opacity-60 mix-blend-screen"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    />
  );
};

export default WaterDistortionCanvas;
