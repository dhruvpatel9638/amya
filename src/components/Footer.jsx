import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Globe, Mail, ArrowUpRight, Linkedin } from 'lucide-react';
import PinkFlowCanvas from './PinkFlowCanvas';
import amyaLogo from '../assets/logo.png';

// Pink 3D chevron / layered geometric staircase matching frames 00:40 - 00:48
function PinkChevronStaircase() {
  const count = 10;
  const colors = [
    '#1F4E4E', '#265856', '#2F6765', '#3F7E7C', '#4F8F8D',
    '#68A19F', '#84B7B5', '#A5CDCB', '#CAE4E3', '#EAF5F4'
  ];

  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[340px] md:max-w-[480px] h-[320px] md:h-[420px] pointer-events-none select-none z-0 overflow-hidden opacity-90">
      <svg width="100%" height="100%" viewBox="0 0 400 350" preserveAspectRatio="xMidYMid meet">
        {/* Left branch going down-right */}
        {Array.from({ length: count }).map((_, i) => (
          <rect
            key={`l-${i}`}
            x={40 + i * 16}
            y={20 + i * 24}
            width={70}
            height={70}
            fill={colors[i]}
            opacity={1 - i * 0.08}
          />
        ))}

        {/* Right branch going down-left */}
        {Array.from({ length: count }).map((_, i) => (
          <rect
            key={`r-${i}`}
            x={290 - i * 16}
            y={20 + i * 24}
            width={70}
            height={70}
            fill={colors[i]}
            opacity={1 - i * 0.08}
          />
        ))}
      </svg>
    </div>
  );
}

export default function Footer({ onNavigate }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-[#f1f1f1] dot-grid overflow-hidden m-2 sm:m-4 md:m-8 rounded-2xl md:rounded-3xl border border-[#dedede]/60">
      {/* Interactive Pink Flow Canvas */}
      <PinkFlowCanvas opacity={0.75} />

      {/* 3D Geometric Pink Chevron Staircase */}
      <PinkChevronStaircase />

      {/* Main CTA area */}
      <div
        className="relative z-10 flex flex-col items-start justify-center"
        style={{ minHeight: '65vh', padding: 'clamp(6rem, 15vh, 12rem) clamp(1.25rem, 5vw, 4rem) 3.5rem' }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>

          {/* Brand Logo (Placed in Footer only) */}
          <div className="mb-6 sm:mb-8">
            <img
              src={amyaLogo}
              alt="Amya Growth Logo"
              className="h-11 sm:h-13 md:h-16 w-auto object-contain select-none"
            />
          </div>

          {/* Tag */}
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.75rem',
              color: '#a2a2a2',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1.25rem',
              letterSpacing: '0.05em',
            }}
          >
            LET'S WORK TOGETHER • AMYA GROWTH
          </span>

          {/* Big CTA headline matching frame 00:41 */}
          <h2
            style={{
              fontFamily: 'Space Grotesk, DM Serif Display, serif',
              fontSize: 'clamp(2.2rem, 6.5vw, 6.2rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: '#2b2b2b',
              marginBottom: '1.5rem',
              maxWidth: '16ch',
              fontWeight: 600,
            }}
          >
            Build your next<br />
            project with <em style={{ fontStyle: 'italic', fontFamily: 'DM Serif Display, serif', fontWeight: 400 }}>us.</em>
          </h2>

          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(0.95rem, 1.4vw, 1.25rem)',
              fontWeight: 300,
              color: '#656565',
              maxWidth: '36rem',
              lineHeight: 1.55,
              marginBottom: '2.25rem',
            }}
          >
            Delivering enterprise-grade full-stack web applications and autonomous AI business automation engineered to scale your operations without extra staff.
          </p>

          {/* CTA Buttons — Full width on mobile matching frame 00:40 */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto font-mono text-xs uppercase tracking-wider px-9 py-4 rounded-full bg-[#2b2b2b] text-white hover:bg-[#3F7E7C] transition-all duration-200 shadow-md flex items-center justify-center cursor-pointer"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              START A CONVERSATION
            </button>
            <a
              href="https://instagram.com/amya.growth"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto font-mono text-xs uppercase tracking-wider px-8 py-4 rounded-full border border-black/20 bg-white/80 text-[#2b2b2b] hover:bg-[#2b2b2b] hover:text-white transition-all duration-200 shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              <Instagram className="w-4 h-4 text-[#3F7E7C]" />
              INSTAGRAM @AMYA.GROWTH
            </a>
          </div>

          {/* Email row */}
          <div className="mt-14 pt-8 border-t border-[#dedede] flex flex-wrap items-center justify-between gap-6">
            <div>
              <span
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.65rem',
                  color: '#a2a2a2',
                  textTransform: 'uppercase',
                  display: 'block',
                }}
              >
                DIRECT INQUIRIES
              </span>
              <a
                href="mailto:hello@amyagrowth.com"
                className="hover:text-[#3F7E7C] transition-colors"
                style={{
                  fontFamily: 'Space Grotesk, DM Sans, sans-serif',
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  color: '#2b2b2b',
                }}
              >
                hello@amyagrowth.com
              </a>
            </div>

            <div className="hidden sm:block">
              <img
                src={amyaLogo}
                alt="Amya Growth"
                className="h-8 md:h-9 w-auto object-contain opacity-85 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="relative z-10 border-t border-[#dedede]"
        style={{ padding: '1.5rem clamp(1rem, 4vw, 3rem)' }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {/* Left: Copyright */}
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.75rem',
              color: '#a2a2a2',
            }}
          >
            © {new Date().getFullYear()} AMYA GROWTH — IT AGENCY. ALL RIGHTS RESERVED.
          </span>

          {/* Center: Quick links */}
          <div className="flex items-center gap-6">
            {[
              { id: 'hero', label: 'TOP' },
              { id: 'portfolio', label: 'WORKS' },
              { id: 'about', label: 'ABOUT' },
              { id: 'contact', label: 'PRICING' },
            ].map(item => (
              <button
                key={item.id}
                onClick={item.id === 'hero' ? scrollToTop : () => onNavigate(item.id)}
                className="bg-transparent border-none cursor-pointer hover:text-[#3F7E7C] transition-colors"
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.75rem',
                  color: '#656565',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right: Scroll to top */}
          <button
            onClick={scrollToTop}
            className="bg-transparent border-none cursor-pointer flex items-center gap-2 hover:text-[#3F7E7C] transition-colors"
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.75rem',
              color: '#2b2b2b',
            }}
          >
            <span>BACK TO TOP</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
