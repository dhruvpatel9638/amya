import React, { useEffect, useRef } from 'react';

/**
 * PinkFlowCanvas — Real-time fluid pink wave & particle flow that tracks mouse movement
 * within Hero, Footer, or any section.
 * Features:
 * - Fluid pink streams (#fc4778) trailing the cursor with velocity physics
 * - Halftone dot illumination & smooth fluid decay
 * - Zero lag, optimized for 60 FPS
 */
export default function PinkFlowCanvas({ className = '', opacity = 0.85, isDark = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let isDestroyed = false;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const particles = [];
    const mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      speed: 0,
    };

    const resize = () => {
      const parent = canvas.parentElement || document.body;
      const rect = parent.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (
        clientX >= -50 &&
        clientX <= width + 50 &&
        clientY >= -50 &&
        clientY <= height + 50
      ) {
        const dx = clientX - (mouse.x < 0 ? clientX : mouse.x);
        const dy = clientY - (mouse.y < 0 ? clientY : mouse.y);
        const speed = Math.sqrt(dx * dx + dy * dy);

        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
        mouse.x = clientX;
        mouse.y = clientY;
        mouse.vx = dx;
        mouse.vy = dy;
        mouse.speed = speed;

        // Spawn fluid pink particles along the cursor path
        const count = Math.min(Math.max(Math.floor(speed / 2.5), 2), 12);
        for (let i = 0; i < count; i++) {
          const t = i / count;
          const px = mouse.prevX + dx * t + (Math.random() - 0.5) * 16;
          const py = mouse.prevY + dy * t + (Math.random() - 0.5) * 16;

          particles.push({
            x: px,
            y: py,
            vx: dx * 0.25 + (Math.random() - 0.5) * 2.5,
            vy: dy * 0.25 + (Math.random() - 0.5) * 2.5,
            radius: Math.random() * 45 + 25 + speed * 0.6,
            alpha: 0.55 + Math.random() * 0.25,
            decay: 0.016 + Math.random() * 0.012,
            hueShift: Math.random() > 0.6 ? '#68A19F' : '#3F7E7C',
          });
        }
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
        mouse.speed = 0;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.speed = 0;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      if (isDestroyed) return;

      ctx.clearRect(0, 0, width, height);

      // Render fluid teal particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.alpha -= p.decay;
        p.radius *= 0.985;

        if (p.alpha <= 0.005 || p.radius <= 2) {
          particles.splice(i, 1);
          continue;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        if (p.hueShift === '#68A19F') {
          grad.addColorStop(0, `rgba(82, 143, 141, ${p.alpha * 0.95})`);
          grad.addColorStop(0.5, `rgba(63, 126, 124, ${p.alpha * 0.55})`);
          grad.addColorStop(1, 'rgba(63, 126, 124, 0)');
        } else {
          grad.addColorStop(0, `rgba(31, 78, 78, ${p.alpha * 1.0})`);
          grad.addColorStop(0.4, `rgba(63, 126, 124, ${p.alpha * 0.6})`);
          grad.addColorStop(1, 'rgba(63, 126, 124, 0)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-10 ${className}`}
      style={{
        width: '100%',
        height: '100%',
        opacity,
        mixBlendMode: isDark ? 'screen' : 'multiply',
      }}
      aria-hidden="true"
    />
  );
}
