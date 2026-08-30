import React, { useEffect, useRef } from 'react';

/**
 * HeroFluidText — 100% faithful recreation of incredibles.dev Hero effect:
 * 1. Halftone pink dot dispersion cloud (#fc4778) trailing mouse movements
 * 2. Vibrant RGB Chromatic Aberration (Electric Cyan & Neon Pink split) on headline text
 * 3. Fluid velocity text distortion & ripple
 * 4. Ultra-clean responsive mobile typography and zero clutter layout
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

      const isMobile = width < 768;

      if (isMobile) {
        // --- MOBILE HERO TEXT LAYOUT (Clean, balanced, zero overflow) ---
        // 1. Tag
        textCtx.font = '500 10px "Space Mono", monospace';
        textCtx.fillStyle = '#787878';
        textCtx.textAlign = 'center';
        textCtx.textBaseline = 'middle';
        textCtx.letterSpacing = '0.06em';
        const tagY = height * 0.20;
        textCtx.fillText('WEB APPS  •  MERN  •  AI AUTOMATION', width / 2, tagY);

        // 2. Headline: 3 clean balanced lines
        const mFontSize = Math.min(Math.max(width * 0.088, 30), 38);
        textCtx.font = `600 ${mFontSize}px "Space Grotesk", "DM Serif Display", sans-serif`;
        textCtx.fillStyle = '#2b2b2b';
        textCtx.textAlign = 'center';
        textCtx.textBaseline = 'middle';
        textCtx.letterSpacing = '-0.04em';

        const line1Y = height * 0.32;
        const line2Y = line1Y + mFontSize * 1.05;
        const line3Y = line2Y + mFontSize * 1.05;

        textCtx.fillText('Creative Web Apps', width / 2, line1Y);

        textCtx.font = `italic 400 ${mFontSize}px "DM Serif Display", serif`;
        textCtx.fillText('That Run Without', width / 2, line2Y);
        textCtx.fillText('Employees.', width / 2, line3Y);

        // 3. Subtitle
        const subFontSize = 13;
        textCtx.font = `300 ${subFontSize}px "DM Sans", sans-serif`;
        textCtx.fillStyle = '#656565';
        textCtx.letterSpacing = '0';
        const subY = line3Y + mFontSize * 0.85;
        textCtx.fillText('We build creative UI & web applications that run', width / 2, subY);
        textCtx.fillText('your operations 24/7 without extra staff.', width / 2, subY + subFontSize * 1.45);
      } else {
        // --- DESKTOP HERO TEXT LAYOUT ---
        textCtx.font = '500 11px "Space Mono", monospace';
        textCtx.fillStyle = '#656565';
        textCtx.textAlign = 'center';
        textCtx.textBaseline = 'middle';
        textCtx.letterSpacing = '0.08em';

        const tagY = height * 0.28;
        const tagText = 'CREATIVE UI & MOTION   •   FULL-STACK WEB APPS   •   AUTONOMOUS AI SYSTEMS';
        textCtx.fillText(tagText, width / 2, tagY);

        // Massive display headline text
        const fontSize = Math.min(Math.max(width * 0.068, 48), 104);
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
      }
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

        if (speed > 0.5) {
          const count = Math.min(Math.floor(speed / 2.0) + 1, 7);
          for (let i = 0; i < count; i++) {
            fluidNodes.push({
              x: mouse.prevX + dx * (i / count) + (Math.random() - 0.5) * 14,
              y: mouse.prevY + dy * (i / count) + (Math.random() - 0.5) * 14,
              vx: dx * 0.45 + (Math.random() - 0.5) * 3,
              vy: dy * 0.45 + (Math.random() - 0.5) * 3,
              radius: Math.random() * 65 + 55 + speed * 1.1,
              alpha: 1.0,
              decay: 0.013 + Math.random() * 0.009,
            });
          }
        }
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handleMouseMove(e.touches[0]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Main 60 FPS Render Loop
    const render = () => {
      if (isDestroyed) return;

      ctx.clearRect(0, 0, width * dpr, height * dpr);
      ctx.save();
      ctx.scale(dpr, dpr);

      // 1. Draw Halftone Pink Dot Matrix in active mouse fluid areas (deeper, richer dark pink)
      const dotSpacing = 20;
      for (let i = fluidNodes.length - 1; i >= 0; i--) {
        const node = fluidNodes[i];
        node.x += node.vx * 0.35;
        node.y += node.vy * 0.35;
        node.vx *= 0.92;
        node.vy *= 0.92;
        node.alpha -= node.decay;

        if (node.alpha <= 0) {
          fluidNodes.splice(i, 1);
          continue;
        }

        const startX = Math.floor((node.x - node.radius) / dotSpacing) * dotSpacing;
        const endX = Math.ceil((node.x + node.radius) / dotSpacing) * dotSpacing;
        const startY = Math.floor((node.y - node.radius) / dotSpacing) * dotSpacing;
        const endY = Math.ceil((node.y + node.radius) / dotSpacing) * dotSpacing;

        for (let gx = startX; gx <= endX; gx += dotSpacing) {
          for (let gy = startY; gy <= endY; gy += dotSpacing) {
            const dist = Math.hypot(gx - node.x, gy - node.y);
            if (dist < node.radius) {
              const intensity = Math.pow(1 - dist / node.radius, 1.2) * node.alpha;
              if (intensity > 0.03) {
                const dotSize = Math.max(1.8, intensity * 4.8);
                // Deeper, punchier dark pink / rich magenta
                ctx.fillStyle = `rgba(220, 0, 75, ${Math.min(intensity * 1.45, 1.0)})`;
                ctx.beginPath();
                ctx.arc(gx, gy, dotSize, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        }
      }

      // Calculate localized RGB chromatic aberration offset
      let dispX = 0;
      let dispY = 0;
      let influence = 0;

      for (let i = 0; i < fluidNodes.length; i++) {
        const node = fluidNodes[i];
        const dist = Math.hypot(width / 2 - node.x, height * 0.40 - node.y);
        if (dist < node.radius * 2.5) {
          const inf = (1 - dist / (node.radius * 2.5)) * node.alpha;
          dispX += node.vx * inf * 0.75;
          dispY += node.vy * inf * 0.75;
          influence = Math.max(influence, inf);
        }
      }

      const maxDisp = 24;
      dispX = Math.max(-maxDisp, Math.min(maxDisp, dispX));
      dispY = Math.max(-maxDisp, Math.min(maxDisp, dispY));

      // 2. Draw Electric Cyan Layer (Shifted left/top)
      if (influence > 0.04 || Math.abs(dispX) > 0.4) {
        ctx.save();
        ctx.drawImage(
          textCanvas,
          0,
          0,
          width * dpr,
          height * dpr,
          -dispX * 1.35,
          -dispY * 1.35,
          width,
          height
        );
        ctx.fillStyle = `rgba(0, 240, 255, ${Math.min(influence * 0.9, 0.85)})`;
        ctx.globalCompositeOperation = 'source-in';
        ctx.fillRect(0, 0, width, height);
        ctx.restore();

        // 3. Draw Hot Neon Pink/Magenta Layer (Shifted right/bottom)
        ctx.save();
        ctx.drawImage(
          textCanvas,
          0,
          0,
          width * dpr,
          height * dpr,
          dispX * 1.45,
          dispY * 1.45,
          width,
          height
        );
        ctx.fillStyle = `rgba(252, 71, 120, ${Math.min(influence * 0.95, 0.9)})`;
        ctx.globalCompositeOperation = 'source-in';
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      // 4. Draw Main Dark Headline Text with transparent blending
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(
        textCanvas,
        0,
        0,
        width * dpr,
        height * dpr,
        0,
        0,
        width,
        height
      );
      ctx.restore();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex flex-col justify-between overflow-hidden select-none"
    >
      {/* 20px Interactive Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none z-0 dot-grid opacity-75"
        aria-hidden="true"
      />

      {/* Main Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Decorative pink stepped squares — visible on desktop only (hidden on mobile for clean luxury look) */}
      <div className="hidden md:block absolute top-24 left-0 z-20 pointer-events-none select-none">
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

      <div className="hidden md:block absolute bottom-0 right-0 z-20 pointer-events-none select-none">
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
      <div className="h-20 md:h-24 pointer-events-none" />

      {/* Interactive Action Buttons (Centered, touch-friendly & responsive) */}
      <div className="relative z-30 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mt-auto mb-10 md:mb-16 px-6 pointer-events-auto w-full max-w-sm sm:max-w-none mx-auto">
        <button
          onClick={() => onNavigate('contact')}
          className="w-full sm:w-auto font-mono text-[0.6875rem] md:text-xs uppercase tracking-wider px-7 py-3.5 md:px-8 md:py-4 rounded-full bg-[#2b2b2b] text-white hover:bg-[#fc4778] transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          style={{ fontFamily: 'Space Mono, monospace' }}
        >
          BOOK FREE CONSULTATION
        </button>
        <button
          onClick={() => onNavigate('portfolio')}
          className="w-full sm:w-auto font-mono text-[0.6875rem] md:text-xs uppercase tracking-wider px-7 py-3.5 md:px-8 md:py-4 rounded-full border border-black/20 bg-white/80 text-[#2b2b2b] hover:bg-[#2b2b2b] hover:text-white transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer"
          style={{ fontFamily: 'Space Mono, monospace' }}
        >
          EXPLORE WORKS
        </button>
      </div>

      {/* Bottom Bar — Desktop ticker */}
      <div
        className="hidden md:block relative z-20 border-t border-black/[0.08] py-4 bg-[#f1f1f1]/80 backdrop-blur-sm"
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
