import { useEffect, useRef } from 'react';

/**
 * PinkBlob — CSS-only radial gradient blur blob that tracks mouse cursor.
 * Pure CSS transition, no canvas, no library.
 * Matches incredibles.dev ambient pink cursor glow.
 */
export default function PinkBlob() {
  const blobRef = useRef(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    const handleMouseMove = (e) => {
      blob.style.left = e.clientX + 'px';
      blob.style.top = e.clientY + 'px';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={blobRef}
      aria-hidden="true"
      style={{
        width: '340px',
        height: '340px',
        background: 'radial-gradient(circle, rgba(220, 0, 75, 0.45), transparent 70%)',
        filter: 'blur(62px)',
        position: 'fixed',
        top: '50%',
        left: '50%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        transition: 'left 0.12s ease, top 0.12s ease',
        zIndex: 9999,
        mixBlendMode: 'multiply',
      }}
    />
  );
}
