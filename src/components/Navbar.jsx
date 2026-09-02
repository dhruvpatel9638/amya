import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ activeSection, setActiveSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Top-left logo + top-right nav */}
      <div className="flex items-center justify-between px-4 py-4 md:px-12 md:py-8 pointer-events-auto">
        
        {/* Left: Brand Logo */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer p-0 group"
          aria-label="Amya Growth Home"
        >
          <div
            className="w-9 h-9 md:w-10 md:h-10 bg-[#2b2b2b] text-white flex items-center justify-center rounded-lg font-bold text-sm tracking-tighter group-hover:bg-[#3F7E7C] transition-colors"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            /
          </div>
          <span
            className="hidden sm:inline-block font-mono text-sm font-semibold tracking-tight text-[#2b2b2b] group-hover:text-[#3F7E7C] transition-colors"
            style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', letterSpacing: '-0.02em' }}
          >
            Amya Growth
          </span>
        </button>

        {/* Right: Nav links + CTA */}
        <nav className="flex items-center gap-3 md:gap-6">
          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
            <li>
              <button
                onClick={() => handleNavClick('portfolio')}
                className="t-mono text-[#2b2b2b] hover:text-[#3F7E7C] transition-colors bg-transparent border-none cursor-pointer font-mono"
                style={{ fontSize: '0.75rem', fontFamily: 'Space Mono, monospace' }}
              >
                WORKS
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('about')}
                className="t-mono text-[#2b2b2b] hover:text-[#3F7E7C] transition-colors bg-transparent border-none cursor-pointer font-mono"
                style={{ fontSize: '0.75rem', fontFamily: 'Space Mono, monospace' }}
              >
                ABOUT
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('contact')}
                className="t-mono text-[#2b2b2b] hover:text-[#3F7E7C] transition-colors bg-transparent border-none cursor-pointer font-mono"
                style={{ fontSize: '0.75rem', fontFamily: 'Space Mono, monospace' }}
              >
                SERVICES
              </button>
            </li>
          </ul>

          {/* CTA Button — matches mobile screenshot */}
          <button
            onClick={() => handleNavClick('contact')}
            className="font-mono text-[0.6875rem] md:text-xs uppercase tracking-wider px-4 py-2.5 md:px-6 md:py-3 rounded-lg bg-[#2b2b2b] text-white hover:bg-[#3F7E7C] transition-colors shadow-sm cursor-pointer"
            style={{ fontFamily: 'Space Mono, monospace' }}
          >
            START A CONVERSATION
          </button>
        </nav>
      </div>
    </header>
  );
}
