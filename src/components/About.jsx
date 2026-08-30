import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Zap, Shield, TrendingUp, Cpu } from 'lucide-react';

export default function About({ onNavigate }) {
  const pillars = [
    {
      title: 'Custom Web Apps (Full-Stack / MERN)',
      desc: 'High-performance React, Node.js, Express, and MongoDB architectures engineered for enterprise scale, responsive UX, and lightning speeds.',
      tag: 'ENTERPRISE MERN',
      number: '01',
    },
    {
      title: 'AI Business & Lead Automation',
      desc: 'Automated WhatsApp AI assistants, intelligent email pipelines, and real-time CRM integrations that capture and close leads automatically.',
      tag: 'AI AUTOMATION',
      number: '02',
    },
    {
      title: 'Auto Follow-Up & Workflow Systems',
      desc: 'Seamless multi-stage client follow-up sequences, automated appointment booking, and zero-drop lead nurturing funnels.',
      tag: 'PROCESS AUTOMATION',
      number: '03',
    },
    {
      title: 'Admin Panels, SaaS & Cloud Deployment',
      desc: 'Bespoke administrative dashboards, SaaS platforms, and resilient cloud architectures deployed on AWS / Vercel with 99.9% uptime.',
      tag: 'CLOUD & SAAS',
      number: '04',
    },
  ];

  const stats = [
    { value: '0', label: 'Manual Employee Overhead' },
    { value: '100x', label: 'Client Business Growth Potential' },
    { value: '24/7', label: 'Autonomous AI & Lead Management' },
  ];

  return (
    <section id="about" className="bg-[#f1f1f1] dot-grid" style={{ padding: '5rem 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 3rem)' }}>

        {/* Header row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.75rem',
                color: '#a2a2a2',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '1.5rem',
              }}
            >
              About Amya Growth
            </span>
            <h2
              style={{
                fontFamily: 'Space Grotesk, DM Serif Display, sans-serif',
                fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                color: '#2b2b2b',
                fontWeight: 600,
              }}
            >
              This is Amya Growth,{' '}
              <em style={{ fontStyle: 'italic', fontFamily: 'DM Serif Display, serif', fontWeight: 400 }}>welcome.</em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col justify-end"
          >
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '1.0625rem',
                fontWeight: 300,
                color: '#656565',
                lineHeight: 1.6,
                marginBottom: '2rem',
              }}
            >
              Amya Growth is an IT Agency delivering high-impact Web Development and autonomous AI Automation. We build creative, enterprise-grade web applications that run your operations around the clock — helping startups, legacy businesses, and medium enterprises grow 100x without needing extra staff.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button onClick={() => onNavigate('contact')} className="btn-dark">
                BOOK FREE CONSULTATION
              </button>
              <button onClick={() => onNavigate('portfolio')} className="btn-outline">
                EXPLORE WORKS
              </button>
            </div>
          </motion.div>
        </div>

        {/* Team/workspace banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden mb-16 shadow-lg"
          style={{ height: '280px' }}
        >
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
            alt="Amya Growth Core Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2b2b2b]/90 via-[#2b2b2b]/40 to-transparent flex items-end justify-between p-8">
            <div>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.75rem', color: '#fc4778' }}>
                AGENCY CAPABILITIES
              </span>
              <h3
                style={{
                  fontFamily: 'Space Grotesk, DM Serif Display, serif',
                  fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                  color: 'white',
                  marginTop: '0.5rem',
                  letterSpacing: '-0.02em',
                }}
              >
                Creative Web Apps & Autonomous AI Systems Running 24/7
              </h3>
            </div>
            <div className="hidden sm:block text-right">
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>
                www.amyagrowth.com
              </span>
            </div>
          </div>
        </motion.div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white p-8 flex flex-col justify-between"
              style={{
                borderRadius: '1.25rem',
                border: '1px solid #dedede',
                minHeight: '260px',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '0.65rem',
                      color: '#fc4778',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {pillar.tag}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '0.75rem',
                      color: '#a2a2a2',
                    }}
                  >
                    {pillar.number}
                  </span>
                </div>
                <h4
                  style={{
                    fontFamily: 'Space Grotesk, DM Sans, sans-serif',
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: '#2b2b2b',
                    marginBottom: '0.75rem',
                    lineHeight: 1.2,
                  }}
                >
                  {pillar.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 300,
                    color: '#656565',
                    lineHeight: 1.5,
                  }}
                >
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#dedede]"
        >
          {stats.map((stat, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: 'Space Grotesk, DM Serif Display, sans-serif',
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  color: '#2b2b2b',
                  letterSpacing: '-0.04em',
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.75rem',
                  color: '#a2a2a2',
                  marginTop: '0.5rem',
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
