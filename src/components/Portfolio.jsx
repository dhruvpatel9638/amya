import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, CheckCircle } from 'lucide-react';
import PinkFlowCanvas from './PinkFlowCanvas';

// ======= REAL CLIENT WORKS (with thumbnails) =======
const realWorks = [
  {
    id: 'w1',
    title: 'Premium Resort UI',
    desc: 'Modern UI for a luxury resort brand — nature-inspired design with smooth animations and an elegant booking experience.',
    tag: 'HOSPITALITY WEB',
    thumb: '/resort-thumbnail.png',
    url: 'https://sunrise-modhera.vercel.app/',
    region: 'IN',
    weeks: '4 wks',
  },
  {
    id: 'w2',
    title: 'Logistic Business Motion UI',
    desc: 'Premium transport website for AH Transport — a modern motion UI platform built for B2B logistics with real-time fleet tracking.',
    tag: 'LOGISTICS MOTION UI',
    thumb: '/media_1787573325188.png',
    url: 'https://ahtransport.vercel.app',
    region: 'IN',
    weeks: '3 wks',
  },
  {
    id: 'w3',
    title: 'Modern Real Estate UI',
    desc: 'Eye-catching real estate platform with cinematic hero, property listings, and high-conversion design for luxury clients.',
    tag: 'REAL ESTATE UI',
    thumb: '/real-estate-thumbnail.png',
    url: 'https://real-estate-silk-five.vercel.app/',
    region: 'UAE',
    weeks: '5 wks',
  },
];

// ======= REAL PROJECT DATA (preserved from original) =======
const projects = [
  {
    id: 1,
    title: 'Aura AI Analytics Platform',
    category: 'AI & Web Apps',
    tag: 'AI DASHBOARD',
    client: 'Aura Systems Inc.',
    desc: 'Real-time financial telemetry dashboard with predictive machine learning insights, custom charts, and dark glassmorphic interface.',
    metric: '+340% User Engagement',
    tech: ['React', 'Framer Motion', 'Python AI', 'Tailwind'],
    details: {
      challenge: 'Aura required a real-time web telemetry platform capable of displaying millions of high-frequency data points without frame drops.',
      solution: 'We engineered a WebGL accelerated frontend dashboard integrated with WebSocket streaming and high-contrast dark theme visual hierarchy.',
      deliverables: ['UI/UX Architecture', 'Interactive WebApp', 'Real-time Data Visuals', 'Design System'],
    },
  },
  {
    id: 2,
    title: 'Veloce Hypercar Digital Showroom',
    category: 'Web Systems',
    tag: '3D EXPERIENCE',
    client: 'Veloce Automotive',
    desc: 'Immersive WebGL 3D configurator allowing buyers to customize carbon body panels, leather trims, and preview custom vehicle sound profiles.',
    metric: '3.8x Conversion Rate',
    tech: ['Three.js', 'React', 'WebGL', 'Tailwind'],
    details: {
      challenge: 'Creating a seamless luxury shopping experience with 60FPS 3D rendering directly in browser environments across mobile and desktop.',
      solution: 'Built custom low-poly Three.js shaders and progressive texture loading pipelines with interactive camera movements.',
      deliverables: ['3D Web Configurator', 'Sound Synthesizer', 'Checkout Pipeline'],
    },
  },
  {
    id: 3,
    title: 'Krypton Quantum Pay App',
    category: 'AI & Mobile',
    tag: 'FINTECH APP',
    client: 'Krypton Labs',
    desc: 'Next-generation cross-border crypto settlement wallet featuring biometrics, instant cross-chain swaps, and zero-fee architecture.',
    metric: '$50M+ Monthly Volume',
    tech: ['React Native', 'Node.js', 'Web3', 'Tailwind'],
    details: {
      challenge: 'Simplifying complex blockchain cryptographic transactions into an intuitive tap-to-pay interface for non-technical users.',
      solution: 'Designed biometric account abstraction flows with clean feedback animations and instant push notifications.',
      deliverables: ['iOS & Android Apps', 'Design Token Suite', 'Security Audit Visuals'],
    },
  },
  {
    id: 4,
    title: 'Solstice Luxury Brand System',
    category: 'Branding',
    tag: 'BRAND IDENTITY',
    client: 'Solstice Maison',
    desc: 'Complete brand repositioning, bespoke typography suite, physical packaging design, and high-conversion e-commerce web platform.',
    metric: 'Featured in Vogue Tech',
    tech: ['Brand Strategy', 'Typography', 'Next.js', 'Motion'],
    details: {
      challenge: 'Positioning a legacy luxury apparel house to capture modern digital-native luxury consumers.',
      solution: 'Crafted a sleek minimalist brand identity paired with fluid layout animations and micro-interactions.',
      deliverables: ['Brand Guidelines', 'Typography Specs', 'E-Commerce Storefront'],
    },
  },
  {
    id: 5,
    title: 'Nexus Cloud DevOps Control',
    category: 'Web Systems',
    tag: 'SAAS PLATFORM',
    client: 'Nexus Cloud Tech',
    desc: 'Comprehensive multi-cloud server monitoring application with automated disaster recovery triggers and custom alert policies.',
    metric: '99.99% Operational Uptime',
    tech: ['React', 'TypeScript', 'GraphQL', 'Tailwind'],
    details: {
      challenge: 'Synthesizing complex multi-region AWS and Azure infrastructure statuses into single-screen operational dashboards.',
      solution: 'Developed modular widget-based dashboard layouts with drag-and-drop customization and dark mode support.',
      deliverables: ['SaaS Product Design', 'Frontend Engine', 'Widget Library'],
    },
  },
  {
    id: 6,
    title: 'Cyberpulse AI Voice Agent',
    category: 'AI & Mobile',
    tag: 'AI VOICE INTERFACE',
    client: 'Cyberpulse Voice',
    desc: 'Conversational AI voice assistant application for automated customer service calls with sub-200ms latency audio feedback.',
    metric: '4.9 Star Store Rating',
    tech: ['Python AI', 'React', 'WebAudio API', 'Framer'],
    details: {
      challenge: 'Building an engaging visual speech waveform interface that reacts in real-time to human voice modulations.',
      solution: 'Created canvas-based audio spectrum visualizers synchronized with real-time AI response streams.',
      deliverables: ['Audio Visualizer UI', 'Voice Agent Console', 'Mobile Web App'],
    },
  },
];

// ======= QUOTE BLOCK (dark card, right side of bento) =======
function QuoteCard() {
  return (
    <div
      className="relative h-full flex flex-col justify-between p-10 text-white overflow-hidden"
      style={{ background: '#2b2b2b', borderRadius: '1.5rem', minHeight: '340px' }}
    >
      {/* Interactive Pink Flow Canvas for Dark Quote Card */}
      <PinkFlowCanvas isDark={true} opacity={0.8} />

      <p
        className="relative z-10"
        style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: 'clamp(1.5rem, 2.5vw, 2.4rem)',
          lineHeight: 1.12,
          letterSpacing: '-0.03em',
          color: '#ffffff',
        }}
      >
        Clean, well-finished work with a true creative eye, always flexible and quick to respond.
      </p>
      <p
        className="relative z-10"
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.75rem',
          color: '#a2a2a2',
          marginTop: '2rem',
        }}
      >
        — Founding Partner @dhruv patel
      </p>
    </div>
  );
}


// ======= HORIZONTAL PROJECT PILL =======
function ProjectPill({ project, onClick }) {
  const regionMap = { 1: 'US', 2: 'EU', 3: 'GLOBAL', 4: 'US', 5: 'UK', 6: 'ASIA' };
  const weekMap = { 1: '6 wks', 2: '10 wks', 3: '12 wks', 4: '8 wks', 5: '14 wks', 6: '6 wks' };

  return (
    <button
      onClick={onClick}
      className="group w-full flex items-center justify-between gap-4 text-left transition-all"
      style={{ padding: '1.25rem 0', borderBottom: '1px solid #dedede' }}
    >
      <span
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.9375rem',
          fontWeight: 400,
          color: '#2b2b2b',
          flex: 1,
          lineHeight: 1.2,
        }}
      >
        {project.desc}
      </span>

      <div className="flex items-center gap-3 flex-shrink-0">
        <span
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.7rem',
            color: '#a2a2a2',
            textTransform: 'uppercase',
          }}
        >
          {regionMap[project.id]}
        </span>
        <span
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.7rem',
            background: '#f1f1f1',
            color: '#656565',
            padding: '3px 8px',
            borderRadius: '9999px',
          }}
        >
          {weekMap[project.id]}
        </span>
        <ArrowUpRight
          className="w-4 h-4 text-[#a2a2a2] group-hover:text-[#fc4778] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
        />
      </div>
    </button>
  );
}

// ======= CASE STUDY MODAL =======
function Modal({ project, onClose, onContact }) {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#2b2b2b]/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ ease: [0.23, 1, 0.32, 1], duration: 0.4 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Modal Header */}
        <div className="p-8 border-b border-[#f1f1f1]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  color: '#fc4778',
                  letterSpacing: 0,
                }}
              >
                {project.tag}
              </span>
              <h3
                style={{
                  fontFamily: 'DM Serif Display, serif',
                  fontSize: '1.875rem',
                  letterSpacing: '-0.03em',
                  color: '#2b2b2b',
                  marginTop: '0.5rem',
                  lineHeight: 1.1,
                }}
              >
                {project.title}
              </h3>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.7rem', color: '#a2a2a2', marginTop: '0.5rem' }}>
                {project.client}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-9 h-9 rounded-full border border-[#dedede] flex items-center justify-center text-[#a2a2a2] hover:text-[#2b2b2b] hover:border-[#2b2b2b] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Metric pill */}
          <div
            className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full"
            style={{ background: '#f1f1f1' }}
          >
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.7rem', color: '#656565', textTransform: 'uppercase' }}>
              Outcome
            </span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: '#2b2b2b' }}>
              {project.metric}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-6">
          <div>
            <h4 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.875rem', color: '#2b2b2b', marginBottom: '0.5rem' }}>
              The Challenge
            </h4>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '0.9375rem', color: '#656565', lineHeight: 1.5 }}>
              {project.details.challenge}
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.875rem', color: '#2b2b2b', marginBottom: '0.5rem' }}>
              Our Solution
            </h4>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '0.9375rem', color: '#656565', lineHeight: 1.5 }}>
              {project.details.solution}
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.875rem', color: '#2b2b2b', marginBottom: '0.75rem' }}>
              Key Deliverables
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.details.deliverables.map((d, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{ background: '#f1f1f1', fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: '#656565' }}
                >
                  <CheckCircle className="w-3 h-3 text-[#fc4778]" />
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div>
            <h4 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.875rem', color: '#2b2b2b', marginBottom: '0.75rem' }}>
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full"
                  style={{
                    background: '#2b2b2b',
                    color: '#fafafa',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 pb-8 flex gap-3">
          <button onClick={onClose} className="btn-outline flex-1">CLOSE</button>
          <button onClick={onContact} className="btn-dark flex-1">REQUEST SIMILAR</button>
        </div>
      </motion.div>
    </div>
  );
}

// ======= MAIN PORTFOLIO COMPONENT =======
export default function Portfolio({ onNavigate }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleContact = () => {
    setSelectedProject(null);
    onNavigate('contact');
  };

  return (
    <section id="portfolio" className="bg-[#f1f1f1] dot-grid" style={{ padding: '5rem 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 3rem)' }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.75rem',
              color: '#a2a2a2',
              textTransform: 'uppercase',
              letterSpacing: 0,
            }}
          >
            Selected Works
          </span>
        </motion.div>

        {/* ===== REAL CLIENT WORKS GRID (with real thumbnails) ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {realWorks.map((work, idx) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, ease: [0.23, 1, 0.32, 1], duration: 0.6 }}
              className="group"
            >
              {/* Thumbnail card */}
              <div
                className="relative overflow-hidden mb-4"
                style={{ borderRadius: '1.25rem', aspectRatio: '16/10', background: '#dedede' }}
              >
                <img
                  src={work.thumb}
                  alt={work.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(43,43,43,0.4)' }}
                >
                  {work.url ? (
                    <a
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#2b2b2b] hover:bg-[#fc4778] hover:text-white transition-colors"
                      style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.7rem', textTransform: 'uppercase', textDecoration: 'none' }}
                      onClick={e => e.stopPropagation()}
                    >
                      VIEW LIVE <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#2b2b2b]"
                      style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.7rem', textTransform: 'uppercase' }}
                    >
                      VIEW PROJECT
                    </span>
                  )}
                </div>
              </div>

              {/* Card info below thumbnail */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        color: '#fc4778',
                      }}
                    >
                      {work.tag}
                    </span>
                    <span style={{ color: '#dedede' }}>·</span>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.65rem', color: '#a2a2a2' }}>{work.region}</span>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.65rem', color: '#a2a2a2' }}>{work.weeks}</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'DM Serif Display, serif',
                      fontSize: '1.25rem',
                      letterSpacing: '-0.03em',
                      color: '#2b2b2b',
                      lineHeight: 1.1,
                      marginBottom: '0.375rem',
                    }}
                  >
                    {work.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: 300,
                      color: '#656565',
                      lineHeight: 1.4,
                    }}
                  >
                    {work.desc}
                  </p>
                </div>

                {work.url && (
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-9 h-9 rounded-full border border-[#dedede] flex items-center justify-center text-[#a2a2a2] hover:text-[#fc4778] hover:border-[#fc4778] transition-colors"
                    onClick={e => e.stopPropagation()}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ===== DIVIDER ===== */}
        <div className="mb-16" style={{ borderTop: '1px solid #dedede' }} />

        {/* Bento Row 1: Large "See for yourself" left + Dark quote card right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          {/* Left — headline + project stack */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-10 flex flex-col justify-between"
            style={{ minHeight: '340px' }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'DM Serif Display, serif',
                  fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.04em',
                  color: '#2b2b2b',
                  marginBottom: '2.5rem',
                }}
              >
                See for<br />yourself.
              </p>
            </div>

            {/* Top 3 project cards inside */}
            <div className="space-y-1">
              {projects.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProject(p)}
                  className="group w-full flex items-center justify-between gap-3 py-3 border-t border-[#f1f1f1] text-left hover:pl-1 transition-all"
                >
                  <div>
                    <span
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#2b2b2b',
                      }}
                    >
                      {p.title}
                    </span>
                    <span
                      className="ml-3"
                      style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '0.65rem',
                        color: '#a2a2a2',
                        textTransform: 'uppercase',
                      }}
                    >
                      {p.tag}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#a2a2a2] group-hover:text-[#fc4778] flex-shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right — Dark quote card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            <QuoteCard />
          </motion.div>
        </div>

        {/* Bento Row 2: "Latest Delivery" + Project pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Latest Delivery box */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#2b2b2b] rounded-3xl p-8 flex flex-col justify-between"
            style={{ minHeight: '260px' }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 500,
                  fontSize: '1.125rem',
                  color: '#ffffff',
                  marginBottom: '0.5rem',
                }}
              >
                Latest Delivery
              </p>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.875rem',
                  color: '#a2a2a2',
                  fontWeight: 300,
                  lineHeight: 1.4,
                }}
              >
                New projects typically start within 2 weeks.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="btn-outline mt-6"
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}
            >
              REQUEST A QUOTE
            </button>
          </motion.div>

          {/* Project Pills — right 2/3 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="md:col-span-2 bg-white rounded-3xl p-8"
          >
            <p
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                color: '#a2a2a2',
                marginBottom: '0.5rem',
              }}
            >
              All Projects
            </p>
            <div>
              {projects.slice(3).map((p) => (
                <ProjectPill key={p.id} project={p} onClick={() => setSelectedProject(p)} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <Modal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onContact={handleContact}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
