import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroFluidText from './HeroFluidText';

gsap.registerPlugin(ScrollTrigger);

// High-fidelity SVG Illustrations matching incredibles.dev aesthetic
function CardIllustration({ type }) {
  if (type === 'cost') {
    // Stepped savings pyramid
    const count = 9;
    const colors = [
      '#fc4778', '#fd5984', '#fd6b90', '#fd7e9c',
      '#fe90a8', '#fea2b4', '#feb4c0', '#fec7cc', '#fed9d8'
    ];
    return (
      <div className="relative w-full h-[170px] md:h-[210px] rounded-2xl overflow-hidden dot-grid bg-[#eaeaea] flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 340 210" preserveAspectRatio="xMidYMid meet">
          {Array.from({ length: count }).map((_, i) => (
            <rect
              key={i}
              x={35 + i * 26}
              y={12 + i * 14}
              width={70 - i * 3}
              height={70 - i * 3}
              fill={colors[i]}
              opacity={1 - i * 0.05}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (type === 'automation') {
    // Inverted funnel automation
    const layers = [
      { y: 15, w: 260, h: 26, color: '#fc4778' },
      { y: 46, w: 220, h: 24, color: '#fd6a90' },
      { y: 74, w: 180, h: 22, color: '#fd8aa9' },
      { y: 100, w: 140, h: 20, color: '#feacc1' },
      { y: 124, w: 100, h: 18, color: '#fecdd6' },
      { y: 146, w: 60, h: 16, color: '#fedfe5' },
    ];
    return (
      <div className="relative w-full h-[170px] md:h-[210px] rounded-2xl overflow-hidden dot-grid bg-[#eaeaea] flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 340 210" preserveAspectRatio="xMidYMid meet">
          {layers.map((l, i) => (
            <rect
              key={i}
              x={(340 - l.w) / 2}
              y={l.y}
              width={l.w}
              height={l.h}
              fill={l.color}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (type === 'followup') {
    // Multi-channel follow-up bars
    const bars = [
      { x: 25, y: 15, w: 45, h: 175, color: '#fc4778' },
      { x: 80, y: 35, w: 45, h: 155, color: '#fd6a90' },
      { x: 135, y: 55, w: 45, h: 135, color: '#fd8aa9' },
      { x: 190, y: 75, w: 45, h: 115, color: '#feacc1' },
      { x: 245, y: 95, w: 45, h: 95, color: '#fecdd6' },
    ];
    return (
      <div className="relative w-full h-[170px] md:h-[210px] rounded-2xl overflow-hidden dot-grid bg-[#eaeaea] flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 340 210" preserveAspectRatio="xMidYMid meet">
          {bars.map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={b.color} />
          ))}
        </svg>
      </div>
    );
  }

  // Full-Stack / Cloud — rising growth staircase
  const count = 9;
  const colors = [
    '#fed9d8', '#fec7cc', '#feb4c0', '#fea2b4',
    '#fe90a8', '#fd7e9c', '#fd6b90', '#fd5984', '#fc4778'
  ];
  return (
    <div className="relative w-full h-[170px] md:h-[210px] rounded-2xl overflow-hidden dot-grid bg-[#eaeaea] flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 340 210" preserveAspectRatio="xMidYMid meet">
        {Array.from({ length: count }).map((_, i) => (
          <rect
            key={i}
            x={35 + i * 26}
            y={140 - i * 13}
            width={55 + i * 2}
            height={55 + i * 2}
            fill={colors[i]}
          />
        ))}
      </svg>
    </div>
  );
}

const usps = [
  {
    type: 'cost',
    title: 'Zero Employee Overhead',
    desc: 'Self-operating web applications and AI systems that manage client inquiries, follow-ups, and workflows without needing extra team members.',
  },
  {
    type: 'automation',
    title: 'AI Business Automation',
    desc: 'Intelligent WhatsApp AI agents, automated email funnels, and real-time lead management systems.',
  },
  {
    type: 'followup',
    title: 'Auto Follow-Up Systems',
    desc: 'Eliminate lost sales with automated multi-channel follow-up workflows that nurture and close leads 24/7.',
  },
  {
    type: 'cloud',
    title: 'Full-Stack MERN & Cloud',
    desc: 'Custom React, Node, MongoDB, Next.js, and cloud architectures built for startups, legacy, and medium businesses.',
  },
];

export default function USPSection({ onNavigate }) {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const heroShutterRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current;
      const heroShutter = heroShutterRef.current;
      if (!cards || cards.length === 0 || !heroShutter) return;

      // Master ScrollTrigger Timeline: Shutter up + Cards stack
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=3400',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Initial state: cards off-screen below
      gsap.set(cards, {
        yPercent: 120,
        opacity: 0,
        scale: 1,
      });

      // 1. Hero Shutter smoothly pulls UP, revealing the 2nd page directly underneath!
      tl.to(heroShutter, {
        yPercent: -105,
        scale: 0.98,
        borderRadius: '0 0 3rem 3rem',
        boxShadow: '0 30px 70px rgba(0, 0, 0, 0.25)',
        duration: 1.2,
        ease: 'power2.inOut',
      });

      // 2. Card 0 reveals into center
      tl.to(cards[0], {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }, '+=0.2');

      // 3. Card 1 slides UP directly ON TOP of Card 0
      tl.to(cards[0], {
        scale: 0.94,
        duration: 0.8,
        ease: 'power1.inOut',
      }, 'card1');
      tl.to(cards[1], {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }, 'card1');

      // 4. Card 2 slides UP directly ON TOP of Card 1
      tl.to(cards[1], {
        scale: 0.94,
        duration: 0.8,
        ease: 'power1.inOut',
      }, 'card2');
      tl.to(cards[2], {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }, 'card2');

      // 5. Card 3 slides UP directly ON TOP of Card 2
      tl.to(cards[2], {
        scale: 0.94,
        duration: 0.8,
        ease: 'power1.inOut',
      }, 'card3');
      tl.to(cards[3], {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }, 'card3');

      tl.to({}, { duration: 0.4 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative w-full bg-[#f1f1f1]">
      <div
        ref={triggerRef}
        className="relative h-screen w-full overflow-hidden flex items-center justify-center dot-grid px-4"
      >
        {/* Layer 1 (Underneath): 2nd Page Background Headline */}
        <div
          className="absolute inset-0 flex items-center justify-center text-center select-none pointer-events-none z-0 px-4"
          aria-hidden="true"
        >
          <h2
            style={{
              fontFamily: 'Space Grotesk, DM Serif Display, sans-serif',
              fontSize: 'clamp(2.75rem, 8.5vw, 7.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.05em',
              color: '#2b2b2b',
              maxWidth: '9em',
              margin: '0 auto',
            }}
          >
            In every build,<br />
            you can count on.
          </h2>
        </div>

        {/* Layer 1: Stacking Cards Deck */}
        <div className="relative z-10 w-full max-w-[21.5rem] md:max-w-[26rem] h-[400px] md:h-[450px] flex items-center justify-center">
          {usps.map((usp, i) => (
            <div
              key={usp.type}
              ref={(el) => (cardRefs.current[i] = el)}
              className="absolute inset-0 w-full h-full"
              style={{
                zIndex: (i + 1) * 10,
              }}
            >
              <div
                className="w-full h-full bg-[#fafafa] flex flex-col justify-between"
                style={{
                  borderRadius: '1.25rem',
                  padding: '1rem md:1.25rem',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
                  border: '1px solid rgba(43,43,43,0.08)',
                  overflow: 'hidden',
                }}
              >
                {/* Top Illustration Asset */}
                <CardIllustration type={usp.type} />

                {/* Card Content */}
                <div style={{ padding: '1rem 0.5rem 0.5rem' }}>
                  <h3
                    style={{
                      fontFamily: 'Space Grotesk, DM Sans, sans-serif',
                      fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
                      fontWeight: 600,
                      letterSpacing: '-0.025em',
                      color: '#2b2b2b',
                      marginBottom: '0.4rem',
                      lineHeight: 1.15,
                    }}
                  >
                    {usp.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: 300,
                      lineHeight: 1.45,
                      color: '#656565',
                    }}
                  >
                    {usp.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Layer 2 (On Top): Hero Shutter that pulls UP on scroll */}
        <div
          ref={heroShutterRef}
          className="absolute inset-0 w-full h-full z-30 bg-[#f1f1f1] overflow-hidden will-change-transform"
          style={{
            borderBottom: '1px solid rgba(43,43,43,0.08)',
          }}
        >
          <HeroFluidText onNavigate={onNavigate} />
        </div>
      </div>
    </section>
  );
}
