import React, { useEffect, useRef } from 'react';

/**
 * HeroFluidText — 100% faithful recreation of incredibles.dev Hero effect:
 * 1. Halftone pink dot dispersion cloud (#fc4778) trailing mouse movements
 * 2. Vibrant RGB Chromatic Aberration (Electric Cyan & Neon Pink split) on headline text
 * 3. Fluid velocity text distortion & ripple
 */
export default function HeroFluidText({ onNavigate }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let isDestroyed = false;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Off-screen canvas for rendering crisp headline text
    const textCanvas = document.createElement('canvas');
    const textCtx = textCanvas.getContext('2d');

    // Fluid particles / velocity nodes
    const fluidNodes = [];
    const mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      speed: 0,
    };

    // Draw the static headline text on the offscreen canvas
    const renderTextToCanvas = () => {
      textCanvas.width = width * dpr;
      textCanvas.height = height * dpr;
      textCtx.scale(dpr, dpr);
      textCtx.clearRect(0, 0, width, height);

      // Category tags above headline
      textCtx.font = '500 11px "Space Mono", monospace';
      textCtx.fillStyle = '#656565';
      textCtx.textAlign = 'center';
      textCtx.textBaseline = 'middle';
      textCtx.letterSpacing = '0.08em';

      const tagY = height * 0.28;
      const tagText = 'CREATIVE UI & MOTION   •   FULL-STACK WEB APPS   •   AUTONOMOUS AI SYSTEMS';
      textCtx.fillText(tagText, width / 2, tagY);

      // Massive display headline text
      const fontSize = Math.min(Math.max(width * 0.068, 42), 104);
      textCtx.font = `600 ${fontSize}px "Space Grotesk", "DM Serif Display", sans-serif`;
      textCtx.fillStyle = '#2b2b2b';
      textCtx.textAlign = 'center';
      textCtx.textBaseline = 'middle';
      textCtx.letterSpacing = '-0.04em';

      const line1Y = height * 0.40;
      const line2Y = line1Y + fontSize * 0.95;

      textCtx.fillText('Creative Web Apps', width / 2, line1Y);

      // Italic "That Run Without Employees."
      textCtx.font = `italic 400 ${fontSize}px "DM Serif Display", serif`;
      textCtx.fillText('That Run Without Employees.', width / 2, line2Y);

      // Subtitle below headline
      const subFontSize = Math.min(Math.max(width * 0.015, 14), 18);
      textCtx.font = `300 ${subFontSize}px "DM Sans", sans-serif`;
      textCtx.fillStyle = '#656565';
      textCtx.letterSpacing = '0';
      const subY = line2Y + fontSize * 0.75;
      const subText1 = 'We build high-converting creative UI, full-stack web applications, and autonomous AI automation';
      const subText2 = 'that handle sales, follow-ups, and operations 24/7 — scaling your business without extra staff.';
      textCtx.fillText(subText1, width / 2, subY);
      textCtx.fillText(subText2, width / 2, subY + subFontSize * 1.5);
    };

    const handleResize = () => {
      const parent = containerRef.current || document.body;
      const rect = parent.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      renderTextToCanvas();
    };

    handleResize();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (
        clientX >= 0 &&
        clientX <= width &&
        clientY >= 0 &&
        clientY <= height
      ) {
        const dx = clientX - (mouse.x < 0 ? clientX : mouse.x);
        const dy = clientY - (mouse.y < 0 ? clientY : mouse.y);
        const speed = Math.min(Math.sqrt(dx * dx + dy * dy), 70);

        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
        mouse.x = clientX;
        mouse.y = clientY;
        mouse.vx = dx;
        mouse.vy = dy;
        mouse.speed = speed;

        if (speed > 1) {
          const count = Math.min(Math.floor(speed / 2.5) + 1, 6);
          for (let i = 0; i < count; i++) {
            fluidNodes.push({
              x: mouse.prevX + dx * (i / count) + (Math.random() - 0.5) * 16,
              y: mouse.prevY + dy * (i / count) + (Math.random() - 0.5) * 16,
              vx: dx * 0.45 + (Math.random() - 0.5) * 3,
              vy: dy * 0.45 + (Math.random() - 0.5) * 3,
              radius: Math.random() * 55 + 45 + speed * 0.9,
              alpha: 1.0,
              decay: 0.018 + Math.random() * 0.012,
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

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const render = () => {
      if (isDestroyed) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // 1. Draw subtle background dot grid
      const gridSpacing = 20;
      const cols = Math.ceil(width / gridSpacing) + 1;
      const rows = Math.ceil(height / gridSpacing) + 1;

      ctx.fillStyle = 'rgba(43, 43, 43, 0.12)';
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const gx = c * gridSpacing;
          const gy = r * gridSpacing;
          ctx.beginPath();
          ctx.arc(gx, gy, 1.0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Update fluid nodes
      for (let i = fluidNodes.length - 1; i >= 0; i--) {
        const node = fluidNodes[i];
        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.93;
        node.vy *= 0.93;
        node.alpha -= node.decay;
        node.radius *= 0.988;

        if (node.alpha <= 0.01 || node.radius <= 4) {
          fluidNodes.splice(i, 1);
        }
      }

      // 2. Draw Pink Halftone Dot Cloud (exact match to incredibles.dev)
      if (fluidNodes.length > 0) {
        const dotSpacing = 8;
        const startCol = 0;
        const endCol = Math.ceil(width / dotSpacing);
        const startRow = 0;
        const endRow = Math.ceil(height / dotSpacing);

        for (let r = startRow; r < endRow; r++) {
          const py = r * dotSpacing;
          for (let c = startCol; c < endCol; c++) {
            const px = c * dotSpacing;

            let intensity = 0;
            for (let k = 0; k < fluidNodes.length; k++) {
              const node = fluidNodes[k];
              const dx = px - node.x;
              const dy = py - node.y;
              const distSq = dx * dx + dy * dy;
              const radSq = node.radius * node.radius;

              if (distSq < radSq) {
                const f = 1 - Math.sqrt(distSq) / node.radius;
                intensity += f * f * node.alpha;
              }
            }

            if (intensity > 0.07) {
              const dotAlpha = Math.min(1, intensity * 0.95);
              const dotSize = Math.min(3.4, 0.8 + intensity * 2.6);

              // Draw crisp pink dot
              ctx.beginPath();
              ctx.arc(px, py, dotSize, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(252, 71, 120, ${dotAlpha})`;
              ctx.fill();
            }
          }
        }
      }

      // 3. Draw Headline with Electric Cyan & Neon Pink Chromatic Aberration
      let maxVelocity = 0;
      let avgVx = 0;
      let avgVy = 0;

      for (let i = 0; i < fluidNodes.length; i++) {
        const node = fluidNodes[i];
        if (node.y >= height * 0.20 && node.y <= height * 0.70) {
          const spd = Math.hypot(node.vx, node.vy) * node.alpha;
          if (spd > maxVelocity) {
            maxVelocity = spd;
            avgVx = node.vx * node.alpha;
            avgVy = node.vy * node.alpha;
          }
        }
      }

      const aberrationDist = Math.min(Math.max(maxVelocity * 2.2, 0), 16);

      if (aberrationDist > 0.3) {
        const angle = Math.atan2(avgVy, avgVx);
        const shiftX = Math.cos(angle) * aberrationDist;
        const shiftY = Math.sin(angle) * aberrationDist;

        // A. Electric Cyan Layer (Shifted Left / Opposite direction)
        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.translate(-shiftX * 1.0, -shiftY * 1.0);
        ctx.drawImage(textCanvas, 0, 0, width, height);

        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = `rgba(0, 240, 255, ${Math.min(0.95, aberrationDist * 0.25)})`;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();

        // B. Neon Pink Layer (Shifted Right / Velocity direction)
        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.translate(shiftX * 1.2, shiftY * 1.2);
        ctx.drawImage(textCanvas, 0, 0, width, height);

        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = `rgba(252, 71, 120, ${Math.min(0.98, aberrationDist * 0.28)})`;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      // C. Crisp Main Text Layer
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(textCanvas, 0, 0, width, height);
      ctx.restore();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Interactive Canvas Rendering Halftone Pink Dots + Cyan/Pink Chromatic Text Distortion */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Decorative pink stepped squares — top-left & bottom-right */}
      <div className="absolute top-24 left-0 z-20 pointer-events-none select-none">
        <div className="relative" style={{ width: 130, height: 130 }}>
          {['#fc4778', '#fd6a90', '#fd8aa9', '#feacc1', '#fecdd6'].map((color, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: 64,
                height: 64,
                backgroundColor: color,
                top: (4 - i) * 14,
                left: i * 14,
                opacity: 1 - i * 0.12,
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-20 pointer-events-none select-none">
        <div className="relative" style={{ width: 130, height: 130 }}>
          {['#fc4778', '#fd6a90', '#fd8aa9', '#feacc1', '#fecdd6'].map((color, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: 64,
                height: 64,
                backgroundColor: color,
                bottom: (4 - i) * 14,
                right: (4 - i) * 14,
                opacity: 1 - i * 0.12,
              }}
            />
          ))}
        </div>
      </div>

      {/* Spacer for navbar */}
      <div className="h-24 pointer-events-none" />

      {/* Interactive Action Buttons (Centered below the headline canvas) */}
      <div className="relative z-30 flex flex-wrap items-center justify-center gap-4 mt-auto mb-16 pointer-events-auto">
        <button
          onClick={() => onNavigate('contact')}
          className="font-mono text-xs uppercase tracking-wider px-8 py-4 rounded-full bg-[#2b2b2b] text-white hover:bg-[#fc4778] transition-all duration-200 shadow-md flex items-center gap-2 cursor-pointer"
          style={{ fontFamily: 'Space Mono, monospace' }}
        >
          BOOK FREE CONSULTATION
        </button>
        <button
          onClick={() => onNavigate('portfolio')}
          className="font-mono text-xs uppercase tracking-wider px-8 py-4 rounded-full border border-black/20 bg-white/80 text-[#2b2b2b] hover:bg-[#2b2b2b] hover:text-white transition-all duration-200 shadow-sm cursor-pointer"
          style={{ fontFamily: 'Space Mono, monospace' }}
        >
          EXPLORE WORKS
        </button>
      </div>

      {/* Bottom Bar — Brand names along the bottom grid */}
      <div
        className="relative z-20 border-t border-black/[0.08] py-4 bg-[#f1f1f1]/80 backdrop-blur-sm"
        style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.08em' }}
      >
        <div className="max-w-[1280px] mx-auto px-8 flex items-center justify-between text-[#a2a2a2] overflow-x-auto whitespace-nowrap gap-6">
          {['•  FULL-STACK MERN', '•  WHATSAPP AI AGENTS', '•  AUTO FOLLOW-UP', '•  LEAD MANAGEMENT', '•  SAAS ADMIN PANELS', '•  CLOUD INTEGRATION'].map((brand, i) => (
            <span key={i} className="hover:text-[#2b2b2b] transition-colors cursor-default select-none">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
