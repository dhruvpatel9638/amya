import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'HERO' },
  { id: 'portfolio', label: 'WORKS' },
  { id: 'about', label: 'ABOUT' },
  { id: 'pricing', label: 'PRICING' },
  { id: 'contact', label: 'CONTACT' },
];

export default function CreativeScrollbar({ activeSection, onNavigate }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [sectionPositions, setSectionPositions] = useState({
    hero: 0.05,
    portfolio: 0.28,
    about: 0.58,
    pricing: 0.78,
    contact: 0.95,
  });

  const railRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Recalculate section positions dynamically based on real document heights
  useEffect(() => {
    const calculatePositions = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const newPositions = {};
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          newPositions[sec.id] = Math.min(Math.max(top / docHeight, 0.02), 0.98);
        }
      });
      if (Object.keys(newPositions).length > 0) {
        setSectionPositions((prev) => ({ ...prev, ...newPositions }));
      }
    };

    calculatePositions();
    window.addEventListener('resize', calculatePositions);
    return () => window.removeEventListener('resize', calculatePositions);
  }, []);

  // Track window scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
      setScrollProgress(progress);

      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1800);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Scrub handler for click and drag along the full height
  const handleScrub = (clientY) => {
    if (!railRef.current) return;
    const rect = railRef.current.getBoundingClientRect();
    const offsetY = Math.max(0, Math.min(clientY - rect.top, rect.height));
    const progress = offsetY / rect.height;

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = progress * docHeight;

    if (window.lenis) {
      window.lenis.scrollTo(targetScroll, { immediate: false, duration: 0.5 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    handleScrub(e.clientY);

    const onMouseMove = (moveEvent) => {
      handleScrub(moveEvent.clientY);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    setIsDragging(true);
    handleScrub(e.touches[0].clientY);

    const onTouchMove = (moveEvent) => {
      if (moveEvent.cancelable) moveEvent.preventDefault();
      handleScrub(moveEvent.touches[0].clientY);
    };

    const onTouchEnd = () => {
      setIsDragging(false);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };

    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
  };

  const percentage = Math.round(scrollProgress * 100);
  const showBadge = isHovered || isDragging || isScrolling;

  return (
    <div
      ref={railRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      aria-label="Main Creative Scrollbar"
      className="fixed right-0 top-0 bottom-0 z-50 w-4 sm:w-6 hover:w-9 select-none cursor-pointer flex justify-end transition-all duration-300 pointer-events-auto group"
      style={{ touchAction: 'none' }}
    >
      {/* Background track rail with subtle glassmorphic backdrop on hover */}
      <div className="absolute inset-0 bg-transparent group-hover:bg-[#f1f1f1]/80 group-hover:backdrop-blur-sm group-hover:border-l group-hover:border-[#dedede]/60 transition-all duration-300 pointer-events-none" />

      {/* Vertical Track Center Baseline */}
      <div className="absolute right-1.5 sm:right-2 top-0 bottom-0 w-[1.5px] bg-[#dedede] group-hover:bg-[#cfcfcf] transition-colors pointer-events-none" />

      {/* Active Glowing Gradient Progress Rail (fills from top to current scroll) */}
      <div
        className="absolute right-1.5 sm:right-2 top-0 w-[2.5px] bg-gradient-to-b from-[#3F7E7C] via-[#5fa2a0] to-[#3F7E7C] rounded-full pointer-events-none transition-all duration-75"
        style={{ height: `${scrollProgress * 100}%` }}
      />

      {/* Section Tick Marks along the full-height rail */}
      {sections.map((sec) => {
        const topRatio = sectionPositions[sec.id] || 0;
        const isActive = activeSection === sec.id;

        return (
          <div
            key={sec.id}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(sec.id);
            }}
            style={{ top: `${topRatio * 100}%` }}
            className="absolute right-0 -translate-y-1/2 flex items-center justify-end z-20 group/tick cursor-pointer py-1.5 pr-0.5"
            title={`Jump to ${sec.label}`}
          >
            {/* Hover Tooltip for Section */}
            <div
              className={`hidden group-hover/tick:flex mr-2.5 px-2 py-0.5 rounded-full bg-[#2b2b2b] text-white font-mono text-[9px] uppercase tracking-wider shadow-lg whitespace-nowrap border border-white/10 pointer-events-none transition-all ${
                isActive ? 'border-[#3F7E7C] text-[#3F7E7C]' : ''
              }`}
            >
              {sec.label}
            </div>

            {/* Tick indicator marker */}
            <div
              className={`transition-all duration-300 rounded-full ${
                isActive
                  ? 'w-3 sm:w-3.5 h-[2px] bg-[#3F7E7C] shadow-sm'
                  : 'w-1.5 sm:w-2 h-[1px] bg-[#999999] group-hover/tick:w-3 group-hover/tick:bg-[#3F7E7C]'
              }`}
            />
          </div>
        );
      })}

      {/* Creative Main Scrollbar Thumb (Draggable Pill with Dual Accent) */}
      <div
        className="absolute right-0.5 sm:right-1 -translate-y-1/2 z-30 flex items-center justify-end pointer-events-none transition-all duration-100 will-change-transform"
        style={{
          top: `calc(${scrollProgress * 100}%)`,
        }}
      >
        {/* Floating Live Section & Percentage Badge */}
        <AnimatePresence>
          {showBadge && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.85 }}
              animate={{ opacity: 1, x: -10, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.85 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2b2b2b]/95 text-white shadow-xl backdrop-blur-md border border-white/10 pointer-events-none whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3F7E7C] animate-pulse" />
              <span
                style={{ fontFamily: 'Space Mono, monospace' }}
                className="text-[9px] font-bold text-[#3F7E7C] uppercase tracking-wider"
              >
                {activeSection ? activeSection.toUpperCase() : 'AMYA'}
              </span>
              <span className="text-white/30 text-[8px] font-mono">/</span>
              <span style={{ fontFamily: 'Space Mono, monospace' }} className="text-[9px] text-white/90">
                {percentage}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Creative Thumb Capsule */}
        <div
          className={`rounded-full transition-all duration-200 flex flex-col items-center justify-center shadow-md cursor-grab active:cursor-grabbing ${
            isDragging
              ? 'w-3 sm:w-3.5 h-14 sm:h-16 bg-[#3F7E7C] ring-4 ring-[#3F7E7C]/25'
              : 'w-2 sm:w-2.5 group-hover:w-3 h-10 sm:h-12 bg-[#2b2b2b] group-hover:bg-[#3F7E7C]'
          }`}
        >
          {/* Subtle Grip Dot / Line inside thumb */}
          <div className="w-1 h-3 rounded-full bg-white/70" />
        </div>
      </div>
    </div>
  );
}
