import React, { useEffect, useRef } from 'react';

/**
 * PinkBlob — Ultra-smooth, 60/120 FPS GPU-accelerated pink fluid flow
 * that dynamically trails the mouse cursor with velocity physics & inertia.
 */
export default function PinkBlob() {
  const blobRef = useRef(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    // Check if device is touch or mobile view (< 1024px)
    const isMobile =
      window.innerWidth < 1024 ||
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;
    if (isMobile) {
      blob.style.display = 'none';
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let prevX = mouseX;
    let prevY = mouseY;
    let isVisible = false;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        blob.style.opacity = '1';
      }
    };

    const onMouseEnter = () => {
      isVisible = true;
      blob.style.opacity = '1';
    };

    const onMouseLeave = () => {
      isVisible = false;
      blob.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // 60/120 FPS Physics Interpolation Loop
    const update = () => {
      // Butter-smooth spring lerp factor
      currentX += (mouseX - currentX) * 0.16;
      currentY += (mouseY - currentY) * 0.16;

      const vx = currentX - prevX;
      const vy = currentY - prevY;
      const speed = Math.min(Math.hypot(vx, vy), 35);

      prevX = currentX;
      prevY = currentY;

      // Dynamic velocity scale & stretch
      const scaleX = 1 + Math.min(speed * 0.012, 0.35);
      const scaleY = 1 - Math.min(speed * 0.006, 0.2);
      const angle = Math.atan2(vy, vx);

      blob.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${angle}rad) scale(${scaleX}, ${scaleY})`;

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '320px',
        height: '320px',
        background: 'radial-gradient(circle, rgba(31, 78, 78, 0.65) 0%, rgba(63, 126, 124, 0.4) 35%, rgba(104, 161, 159, 0.15) 60%, transparent 75%)',
        filter: 'blur(55px)',
        pointerEvents: 'none',
        zIndex: 9998,
        opacity: 0,
        transition: 'opacity 0.35s ease',
        willChange: 'transform',
      }}
    />
  );
}
