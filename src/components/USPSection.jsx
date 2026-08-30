import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroFluidText from './HeroFluidText';

gsap.registerPlugin(ScrollTrigger);

// High-fidelity topic-specific illustrations matching each card heading (fitted to dotted bg)
function CardIllustration({ type }) {
  if (type === 'cost') {
    // Card 1: Zero Employee Overhead — Autonomous 24/7 Operations Hub
    return (
      <div className="relative w-full h-[175px] md:h-[215px] rounded-2xl overflow-hidden dot-grid bg-[#eaeaea] flex items-center justify-center p-2">
        <svg width="100%" height="100%" viewBox="0 0 340 200" fill="none" preserveAspectRatio="xMidYMid meet">
          {/* Background Card Base */}
          <rect x="10" y="10" width="320" height="180" rx="14" fill="#ffffff" stroke="#dedede" strokeWidth="1.5" />
          
          {/* Top Status Bar */}
          <rect x="10" y="10" width="320" height="36" rx="14" fill="#f8f8f8" />
          <circle cx="28" cy="28" r="4.5" fill="#fc4778" />
          <circle cx="42" cy="28" r="4.5" fill="#fd8aa9" />
          <circle cx="56" cy="28" r="4.5" fill="#dedede" />
          <text x="75" y="32" fill="#757575" fontFamily="Space Mono, monospace" fontSize="9.5" fontWeight="600">SYSTEM: 100% AUTONOMOUS</text>
          <rect x="245" y="18" width="72" height="20" rx="10" fill="#fc4778" />
          <text x="281" y="31" fill="#ffffff" fontFamily="Space Mono, monospace" fontSize="8.5" fontWeight="700" textAnchor="middle">24/7 LIVE</text>

          {/* Central AI Processor Mechanism */}
          <rect x="25" y="58" width="115" height="118" rx="12" fill="#2b2b2b" />
          <circle cx="82" cy="104" r="22" fill="#fc4778" opacity="0.2" />
          <circle cx="82" cy="104" r="14" fill="#fc4778" />
          <text x="82" y="109" fill="#ffffff" fontFamily="Space Grotesk, sans-serif" fontSize="13" fontWeight="700" textAnchor="middle">AI</text>
          <text x="82" y="148" fill="#dedede" fontFamily="Space Mono, monospace" fontSize="8.5" textAnchor="middle">0 EMPLOYEES</text>

          {/* Connected Automated Tasks */}
          <path d="M 140 88 L 158 88" stroke="#fc4778" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M 140 144 L 158 144" stroke="#fc4778" strokeWidth="2" strokeDasharray="3 3" />

          {/* Task 1: Auto Sales */}
          <rect x="158" y="62" width="158" height="52" rx="10" fill="#f8f8f8" stroke="#dedede" strokeWidth="1" />
          <circle cx="178" cy="88" r="7" fill="#fc4778" opacity="0.2" />
          <circle cx="178" cy="88" r="4" fill="#fc4778" />
          <text x="194" y="82" fill="#2b2b2b" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="600">Auto Inquiries</text>
          <text x="194" y="98" fill="#8e8e8e" fontFamily="Space Mono, monospace" fontSize="8">RESOLVED (100%)</text>

          {/* Task 2: Auto Booking */}
          <rect x="158" y="120" width="158" height="52" rx="10" fill="#f8f8f8" stroke="#dedede" strokeWidth="1" />
          <circle cx="178" cy="146" r="7" fill="#22c55e" opacity="0.2" />
          <circle cx="178" cy="146" r="4" fill="#22c55e" />
          <text x="194" y="140" fill="#2b2b2b" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="600">Calendar & CRM</text>
          <text x="194" y="156" fill="#8e8e8e" fontFamily="Space Mono, monospace" fontSize="8">AUTO-SYNCED</text>
        </svg>
      </div>
    );
  }

  if (type === 'automation') {
    // Card 2: AI Business Automation — WhatsApp & Smart Lead Pipeline
    return (
      <div className="relative w-full h-[175px] md:h-[215px] rounded-2xl overflow-hidden dot-grid bg-[#eaeaea] flex items-center justify-center p-2">
        <svg width="100%" height="100%" viewBox="0 0 340 200" fill="none" preserveAspectRatio="xMidYMid meet">
          {/* Main Container */}
          <rect x="10" y="10" width="320" height="180" rx="14" fill="#ffffff" stroke="#dedede" strokeWidth="1.5" />

          {/* Pipeline Step 1: New Lead */}
          <rect x="22" y="26" width="86" height="148" rx="10" fill="#f8f8f8" stroke="#dedede" strokeWidth="1" />
          <rect x="30" y="38" width="70" height="20" rx="10" fill="#2b2b2b" />
          <text x="65" y="51" fill="#ffffff" fontFamily="Space Mono, monospace" fontSize="8.5" fontWeight="700" textAnchor="middle">INCOMING</text>
          <circle cx="65" cy="94" r="16" fill="#fc4778" opacity="0.15" />
          <circle cx="65" cy="94" r="9" fill="#fc4778" />
          <text x="65" y="132" fill="#2b2b2b" fontFamily="DM Sans, sans-serif" fontSize="10" fontWeight="600" textAnchor="middle">New Lead</text>
          <text x="65" y="148" fill="#8e8e8e" fontFamily="Space Mono, monospace" fontSize="7.5" textAnchor="middle">WHATSAPP/WEB</text>

          {/* Connector Arrow 1 */}
          <path d="M 108 94 L 122 94" stroke="#fc4778" strokeWidth="2" strokeDasharray="3 3" />

          {/* Pipeline Step 2: AI Agent Brain */}
          <rect x="122" y="20" width="96" height="160" rx="12" fill="#2b2b2b" />
          <rect x="132" y="32" width="76" height="20" rx="10" fill="#fc4778" />
          <text x="170" y="45" fill="#ffffff" fontFamily="Space Mono, monospace" fontSize="8.5" fontWeight="700" textAnchor="middle">AI AGENT</text>
          <rect x="136" y="68" width="68" height="5" rx="2.5" fill="rgba(255,255,255,0.3)" />
          <rect x="136" y="78" width="52" height="5" rx="2.5" fill="#fc4778" />
          <rect x="136" y="88" width="60" height="5" rx="2.5" fill="rgba(255,255,255,0.3)" />
          <text x="170" y="122" fill="#fc4778" fontFamily="Space Mono, monospace" fontSize="10" fontWeight="700" textAnchor="middle">&lt;QUALIFY&gt;</text>
          <text x="170" y="145" fill="#dedede" fontFamily="DM Sans, sans-serif" fontSize="9" textAnchor="middle">Instant 1s Reply</text>
          <text x="170" y="160" fill="#a2a2a2" fontFamily="Space Mono, monospace" fontSize="7" textAnchor="middle">24/7 ACTIVE</text>

          {/* Connector Arrow 2 */}
          <path d="M 218 94 L 232 94" stroke="#fc4778" strokeWidth="2" strokeDasharray="3 3" />

          {/* Pipeline Step 3: CRM Deal Closed */}
          <rect x="232" y="26" width="86" height="148" rx="10" fill="#f8f8f8" stroke="#dedede" strokeWidth="1" />
          <rect x="240" y="38" width="70" height="20" rx="10" fill="#e8f8f0" stroke="#22c55e" strokeWidth="1" />
          <text x="275" y="51" fill="#16a34a" fontFamily="Space Mono, monospace" fontSize="8.5" fontWeight="700" textAnchor="middle">CLOSED</text>
          <circle cx="275" cy="94" r="15" fill="#22c55e" opacity="0.15" />
          <path d="M 269 94 L 274 99 L 282 89" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="275" y="132" fill="#2b2b2b" fontFamily="DM Sans, sans-serif" fontSize="10" fontWeight="600" textAnchor="middle">CRM Synced</text>
          <text x="275" y="148" fill="#8e8e8e" fontFamily="Space Mono, monospace" fontSize="7.5" textAnchor="middle">DEAL CREATED</text>
        </svg>
      </div>
    );
  }

  if (type === 'followup') {
    // Card 3: Auto Follow-Up Systems — Multi-stage nurture timeline
    return (
      <div className="relative w-full h-[175px] md:h-[215px] rounded-2xl overflow-hidden dot-grid bg-[#eaeaea] flex items-center justify-center p-2">
        <svg width="100%" height="100%" viewBox="0 0 340 200" fill="none" preserveAspectRatio="xMidYMid meet">
          {/* Main Card */}
          <rect x="10" y="10" width="320" height="180" rx="14" fill="#ffffff" stroke="#dedede" strokeWidth="1.5" />

          {/* Vertical Timeline Axis */}
          <line x1="38" y1="36" x2="38" y2="164" stroke="#fc4778" strokeWidth="2" strokeDasharray="3 3" />

          {/* Stage 1: Day 0 */}
          <circle cx="38" cy="46" r="9" fill="#fc4778" />
          <circle cx="38" cy="46" r="4.5" fill="#ffffff" />
          <rect x="54" y="24" width="264" height="44" rx="8" fill="#f8f8f8" stroke="#dedede" strokeWidth="1" />
          <text x="66" y="44" fill="#2b2b2b" fontFamily="DM Sans, sans-serif" fontSize="10.5" fontWeight="600">Day 0: WhatsApp Welcome & Intro</text>
          <text x="66" y="58" fill="#8e8e8e" fontFamily="Space Mono, monospace" fontSize="7.5">TRIGGERED INSTANTLY</text>
          <rect x="250" y="34" width="58" height="20" rx="10" fill="#fc4778" />
          <text x="279" y="47" fill="#ffffff" fontFamily="Space Mono, monospace" fontSize="8" fontWeight="700" textAnchor="middle">SENT 100%</text>

          {/* Stage 2: Day 2 */}
          <circle cx="38" cy="100" r="9" fill="#fc4778" />
          <circle cx="38" cy="100" r="4.5" fill="#ffffff" />
          <rect x="54" y="78" width="264" height="44" rx="8" fill="#f8f8f8" stroke="#dedede" strokeWidth="1" />
          <text x="66" y="98" fill="#2b2b2b" fontFamily="DM Sans, sans-serif" fontSize="10.5" fontWeight="600">Day 2: Value Proposal & Demo Link</text>
          <text x="66" y="112" fill="#8e8e8e" fontFamily="Space Mono, monospace" fontSize="7.5">CUSTOMIZED AI COPY</text>
          <rect x="250" y="88" width="58" height="20" rx="10" fill="#2b2b2b" />
          <text x="279" y="101" fill="#ffffff" fontFamily="Space Mono, monospace" fontSize="8" fontWeight="700" textAnchor="middle">AUTOMATED</text>

          {/* Stage 3: Day 5 */}
          <circle cx="38" cy="154" r="9" fill="#16a34a" />
          <circle cx="38" cy="154" r="4.5" fill="#ffffff" />
          <rect x="54" y="132" width="264" height="44" rx="8" fill="#f8f8f8" stroke="#dedede" strokeWidth="1" />
          <text x="66" y="152" fill="#2b2b2b" fontFamily="DM Sans, sans-serif" fontSize="10.5" fontWeight="600">Day 5: Meeting Booked into Calendar</text>
          <text x="66" y="166" fill="#16a34a" fontFamily="Space Mono, monospace" fontSize="7.5">ZERO HUMAN EFFORT</text>
          <rect x="246" y="142" width="62" height="20" rx="10" fill="#16a34a" />
          <text x="277" y="155" fill="#ffffff" fontFamily="Space Mono, monospace" fontSize="8" fontWeight="700" textAnchor="middle">CONVERTED</text>
        </svg>
      </div>
    );
  }

  // Card 4: Full-Stack MERN & Cloud — Code IDE & Server Telemetry
  return (
    <div className="relative w-full h-[175px] md:h-[215px] rounded-2xl overflow-hidden dot-grid bg-[#eaeaea] flex items-center justify-center p-2">
      <svg width="100%" height="100%" viewBox="0 0 340 200" fill="none" preserveAspectRatio="xMidYMid meet">
        {/* Terminal Window Base */}
        <rect x="10" y="10" width="320" height="180" rx="14" fill="#2b2b2b" stroke="#3a3a3a" strokeWidth="1.5" />
        
        {/* Terminal Header */}
        <rect x="10" y="10" width="320" height="34" rx="14" fill="#1f1f1f" />
        <circle cx="28" cy="27" r="4.5" fill="#fc4778" />
        <circle cx="42" cy="27" r="4.5" fill="#f59e0b" />
        <circle cx="56" cy="27" r="4.5" fill="#10b981" />
        <text x="75" y="31" fill="#a2a2a2" fontFamily="Space Mono, monospace" fontSize="9">stack: MERN + Next.js + Cloud</text>

        {/* Code Content */}
        <text x="24" y="64" fill="#fc4778" fontFamily="Space Mono, monospace" fontSize="9.5" fontWeight="700">&gt; npm run deploy:cloud --prod</text>
        
        {/* Cloud Stack Modules */}
        <rect x="24" y="76" width="88" height="30" rx="6" fill="#383838" />
        <text x="68" y="95" fill="#ffffff" fontFamily="Space Mono, monospace" fontSize="8.5" fontWeight="600" textAnchor="middle">React / Next</text>

        <rect x="120" y="76" width="98" height="30" rx="6" fill="#383838" />
        <text x="169" y="95" fill="#ffffff" fontFamily="Space Mono, monospace" fontSize="8.5" fontWeight="600" textAnchor="middle">Node + Express</text>

        <rect x="226" y="76" width="82" height="30" rx="6" fill="#383838" />
        <text x="267" y="95" fill="#ffffff" fontFamily="Space Mono, monospace" fontSize="8.5" fontWeight="600" textAnchor="middle">MongoDB</text>

        {/* Cloud Server Health Status */}
        <rect x="24" y="118" width="284" height="48" rx="8" fill="#1f1f1f" stroke="#444" strokeWidth="1" />
        <circle cx="44" cy="142" r="5" fill="#10b981" />
        <text x="58" y="137" fill="#ffffff" fontFamily="Space Grotesk, sans-serif" fontSize="10.5" fontWeight="600">AWS / Vercel Cloud Live</text>
        <text x="58" y="152" fill="#10b981" fontFamily="Space Mono, monospace" fontSize="8.5">STATUS: 99.99% UPTIME · FAST &lt;100ms</text>
        <rect x="240" y="128" width="58" height="24" rx="6" fill="#fc4778" />
        <text x="269" y="144" fill="#ffffff" fontFamily="Space Mono, monospace" fontSize="8.5" fontWeight="700" textAnchor="middle">SCALED</text>
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
            What we build<br />
            for growth.
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
