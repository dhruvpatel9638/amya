import React, { useEffect, useRef } from 'react';

/**
 * InteractiveDotGrid — Replaces static dot-grid with a dynamic,
 * interactive dot-matrix physics simulation where dots ripple, illuminate
 * in pink (#fc4778), and reveal subtle stepped grid tiles on mouse motion.
 */
export default function InteractiveDotGrid({ className = '', spacing = 26, isDark = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let isDestroyed = false;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Grid dots storage
    let dots = [];
    let tiles = []; // active pink square grid tiles
    let ripples = []; // click or fast-move waves

    const mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      speed: 0,
      radius: 140,
    };

    const initGrid = () => {
      const parent = canvas.parentElement || document.body;
      const rect = parent.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      dots = [];
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            originX: c * spacing,
            originY: r * spacing,
            x: c * spacing,
            y: r * spacing,
            vx: 0,
            vy: 0,
            baseRadius: 1.25,
            currentRadius: 1.25,
            pinkAlpha: 0,
            targetRadius: 1.25,
          });
        }
      }
    };

    initGrid();

    const handleResize = () => {
      initGrid();
    };

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

        // If moving, spawn a grid-aligned stepped pink tile
        if (speed > 2 && Math.random() > 0.45) {
          const col = Math.round(clientX / spacing) * spacing;
          const row = Math.round(clientY / spacing) * spacing;

          // Avoid duplicate tile at same position
          if (!tiles.some((t) => t.x === col && t.y === row && t.alpha > 0.3)) {
            const tileSize = spacing * (Math.random() > 0.7 ? 2 : 1);
            tiles.push({
              x: col - tileSize / 2,
              y: row - tileSize / 2,
              size: tileSize,
              alpha: Math.min(0.35, 0.15 + speed * 0.01),
              decay: 0.012 + Math.random() * 0.008,
              color: Math.random() > 0.5 ? '#3F7E7C' : '#68A19F',
            });
          }
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

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      ripples.push({
        x: cx,
        y: cy,
        radius: 0,
        maxRadius: 280,
        speed: 8,
        alpha: 0.5,
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    // Render loop
    const render = () => {
      if (isDestroyed) return;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw active stepped teal square tiles (aligned with dot grid)
      for (let i = tiles.length - 1; i >= 0; i--) {
        const t = tiles[i];
        t.alpha -= t.decay;

        if (t.alpha <= 0.005) {
          tiles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = t.color === '#3F7E7C'
          ? `rgba(63, 126, 124, ${t.alpha})`
          : `rgba(104, 161, 159, ${t.alpha})`;
        
        ctx.fillRect(t.x, t.y, t.size, t.size);

        // Subtle crisp border
        ctx.strokeStyle = `rgba(63, 126, 124, ${t.alpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(t.x, t.y, t.size, t.size);
      }

      // 2. Process Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha = Math.max(0, 0.5 * (1 - r.radius / r.maxRadius));

        if (r.radius >= r.maxRadius || r.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }
      }

      // 3. Update and draw grid dots
      const defaultDotColor = isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(43, 43, 43, 0.18)';

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        // Distance to cursor
        const dx = mouse.x - d.originX;
        const dy = mouse.y - d.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Ripple interaction
        let rippleEffect = 0;
        for (let j = 0; j < ripples.length; j++) {
          const r = ripples[j];
          const rDist = Math.hypot(r.x - d.originX, r.y - d.originY);
          const diff = Math.abs(rDist - r.radius);
          if (diff < 35) {
            rippleEffect += (1 - diff / 35) * r.alpha;
          }
        }

        // Mouse proximity physics
        if (dist < mouse.radius && mouse.x >= 0) {
          const factor = 1 - dist / mouse.radius;
          const pushForce = factor * factor * 14;
          const angle = Math.atan2(dy, dx);

          // Displace dot away from cursor
          const targetX = d.originX - Math.cos(angle) * pushForce;
          const targetY = d.originY - Math.sin(angle) * pushForce;

          d.vx += (targetX - d.x) * 0.2;
          d.vy += (targetY - d.y) * 0.2;

          // Illuminate in pink
          d.pinkAlpha = Math.max(d.pinkAlpha, factor * 0.95);
          d.targetRadius = d.baseRadius + factor * 2.8;
        } else if (rippleEffect > 0) {
          d.pinkAlpha = Math.max(d.pinkAlpha, rippleEffect * 0.8);
          d.targetRadius = d.baseRadius + rippleEffect * 2.2;
        } else {
          // Spring back to origin
          d.vx += (d.originX - d.x) * 0.12;
          d.vy += (d.originY - d.y) * 0.12;

          d.pinkAlpha *= 0.92;
          d.targetRadius = d.baseRadius;
        }

        // Apply friction
        d.vx *= 0.78;
        d.vy *= 0.78;
        d.x += d.vx;
        d.y += d.vy;

        // Smooth radius transition
        d.currentRadius += (d.targetRadius - d.currentRadius) * 0.15;

        // Draw the dot
        ctx.beginPath();
        ctx.arc(d.x, d.y, Math.max(0.5, d.currentRadius), 0, Math.PI * 2);

        if (d.pinkAlpha > 0.03) {
          // Teal illuminated dot with gentle glow
          ctx.fillStyle = `rgba(63, 126, 124, ${0.18 + d.pinkAlpha * 0.82})`;
          ctx.fill();

          if (d.pinkAlpha > 0.35) {
            // Subtle outer glow ring
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.currentRadius * 1.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(82, 143, 141, ${d.pinkAlpha * 0.22})`;
            ctx.fill();
          }
        } else {
          // Normal clean background dot
          ctx.fillStyle = defaultDotColor;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, [spacing, isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{
        width: '100%',
        height: '100%',
      }}
      aria-hidden="true"
    />
  );
}
