import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  // Raw mouse position (snaps immediately)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring-delayed position for the trailing ring
  const springX = useSpring(mouseX, { damping: 22, stiffness: 180, mass: 0.4 });
  const springY = useSpring(mouseY, { damping: 22, stiffness: 180, mass: 0.4 });

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [mouseX, mouseY]);

  // Detect hover over interactive elements
  useEffect(() => {
    const targets = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'
    );

    const enter = () => setIsHovering(true);
    const leave = () => setIsHovering(false);

    targets.forEach((el) => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    // Re-bind when DOM changes (e.g. modal opens)
    const observer = new MutationObserver(() => {
      const newTargets = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'
      );
      newTargets.forEach((el) => {
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
      observer.disconnect();
    };
  }, []);

  // Dot size: shrinks on click, stays small
  const dotSize = isClicking ? 6 : 8;

  // Ring size: expands on hover
  const ringSize = isHovering ? 56 : isClicking ? 32 : 40;

  return (
    <>
      {/* Inner dot — snaps to mouse instantly */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: isHovering ? '#fc4778' : '#2b2b2b',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isHidden ? 0 : 1,
          mixBlendMode: 'normal',
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          backgroundColor: isHovering ? '#fc4778' : '#2b2b2b',
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
      />

      {/* Outer ring — follows with spring physics */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: isHovering ? '1.5px solid #fc4778' : '1.5px solid rgba(43,43,43,0.35)',
          backgroundColor: isHovering ? 'rgba(252,71,120,0.08)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: isHidden ? 0 : 1,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          border: isHovering ? '1.5px solid #fc4778' : '1.5px solid rgba(43,43,43,0.35)',
          backgroundColor: isHovering ? 'rgba(252,71,120,0.08)' : 'transparent',
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      />
    </>
  );
}
