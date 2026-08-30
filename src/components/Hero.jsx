import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroFluidText from './HeroFluidText';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onNavigate }) {
  const containerRef = useRef(null);
  const shutterRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Upward shutter opening animation on scroll
      gsap.to(shutterRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1000',
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        yPercent: -105,
        scale: 0.98,
        borderRadius: '0 0 3rem 3rem',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.22)',
        ease: 'power2.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id="hero-shutter-container" className="relative w-full z-30 bg-[#f1f1f1]">
      <section
        ref={shutterRef}
        id="hero"
        className="relative w-full min-h-screen bg-[#f1f1f1] overflow-hidden will-change-transform"
        style={{
          borderBottom: '1px solid rgba(43,43,43,0.08)',
        }}
      >
        <HeroFluidText onNavigate={onNavigate} />
      </section>
    </div>
  );
}
