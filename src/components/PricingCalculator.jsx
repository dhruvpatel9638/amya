import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

export default function PricingCalculator({ onNavigate }) {
  const [tab, setTab] = useState('single'); // 'single' | 'recurring'

  // Single project state
  const [projectType, setProjectType] = useState('landing');
  const [projectSize, setProjectSize] = useState('standard');
  const [creativity, setCreativity] = useState('enhanced');
  const [timeline, setTimeline] = useState('asap');

  // Dynamic cost calculation
  const calculatePricing = () => {
    let basePrice = 25000;
    let weeks = '2 – 3';

    if (projectType === 'webapp') {
      basePrice += 20000;
      weeks = '3 – 5';
    } else if (projectType === 'automation') {
      basePrice += 15000;
      weeks = '2 – 4';
    } else if (projectType === 'fullsite') {
      basePrice += 30000;
      weeks = '4 – 6';
    }

    if (projectSize === 'large') {
      basePrice += 15000;
    } else if (projectSize === 'enterprise') {
      basePrice += 35000;
    }

    if (creativity === 'masterpiece') {
      basePrice += 15000;
    }

    const minPrice = basePrice;
    const maxPrice = Math.round(basePrice * 1.35 / 1000) * 1000;

    return {
      weeks,
      inr: `₹${(minPrice / 1000).toFixed(0)}k – ₹${(maxPrice / 1000).toFixed(0)}k`,
      usd: `$${Math.round(minPrice / 85)} – $${Math.round(maxPrice / 85)}`,
    };
  };

  const currentPricing = calculatePricing();

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-12 my-16">
      {/* Section Header */}
      <div className="mb-8">
        <span
          className="font-mono text-xs text-[#a2a2a2] uppercase tracking-wider block mb-2"
          style={{ fontFamily: 'Space Mono, monospace' }}
        >
          PRICING & ENGAGEMENT
        </span>
        <h2
          style={{
            fontFamily: 'Space Grotesk, DM Serif Display, sans-serif',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: '#2b2b2b',
            fontWeight: 600,
          }}
        >
          Simple pricing
        </h2>
        <p
          className="mt-4 text-[#656565] max-w-xl font-light"
          style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', lineHeight: 1.5 }}
        >
          Most projects are custom scoped according to your requirements, delivering high-impact creative UI, scalable web applications, and autonomous AI systems.
        </p>
      </div>

      {/* Pill Tab Switcher — matches incredibles.dev mobile view exactly */}
      <div className="flex p-1.5 bg-[#eaeaea] rounded-full max-w-sm mb-8">
        <button
          onClick={() => setTab('single')}
          className={`flex-1 py-3 text-xs md:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
            tab === 'single' ? 'bg-white text-[#2b2b2b] shadow-sm' : 'text-[#656565] hover:text-[#2b2b2b]'
          }`}
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Single project
        </button>
        <button
          onClick={() => setTab('recurring')}
          className={`flex-1 py-3 text-xs md:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
            tab === 'recurring' ? 'bg-white text-[#2b2b2b] shadow-sm' : 'text-[#656565] hover:text-[#2b2b2b]'
          }`}
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Recurring
        </button>
      </div>

      {/* Tab 1: Single Project Interactive Calculator */}
      {tab === 'single' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl p-6 md:p-10 border border-[#dedede] shadow-sm space-y-8"
        >
          <div>
            <h3
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#2b2b2b',
                letterSpacing: '-0.03em',
              }}
            >
              Single Project
            </h3>
            <p className="text-sm text-[#656565] font-light mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              For clearly defined projects, with a fixed scope, rapid turnaround, and guaranteed quality.
            </p>
          </div>

          <div className="space-y-6">
            {/* Field 1 — Project Type */}
            <div className="border-b border-[#dedede] pb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-[10px] text-[#2b2b2b]">1</span>
                <span className="font-mono text-[10px] text-[#a2a2a2] uppercase">PROJECT TYPE</span>
              </div>
              <div className="relative">
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full bg-transparent text-[#2b2b2b] font-medium py-2 outline-none appearance-none cursor-pointer text-base md:text-lg"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  <option value="landing">Landing page / High-Conversion Launch</option>
                  <option value="webapp">Custom Full-Stack MERN Web App</option>
                  <option value="automation">AI Business & WhatsApp Automation</option>
                  <option value="fullsite">Complete SaaS Platform & Admin Panel</option>
                </select>
                <ChevronDown className="w-5 h-5 text-[#a2a2a2] absolute right-0 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Field 2 — Project Size */}
            <div className="border-b border-[#dedede] pb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-[10px] text-[#2b2b2b]">2</span>
                <span className="font-mono text-[10px] text-[#a2a2a2] uppercase">PROJECT SIZE</span>
              </div>
              <div className="relative">
                <select
                  value={projectSize}
                  onChange={(e) => setProjectSize(e.target.value)}
                  className="w-full bg-transparent text-[#2b2b2b] font-medium py-2 outline-none appearance-none cursor-pointer text-base md:text-lg"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  <option value="standard">Standard — 5 to 8 modules / sections</option>
                  <option value="large">Large — 8 to 15 modules & CRM integration</option>
                  <option value="enterprise">Enterprise — Multi-tier architecture</option>
                </select>
                <ChevronDown className="w-5 h-5 text-[#a2a2a2] absolute right-0 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Field 3 — Project Creativity */}
            <div className="border-b border-[#dedede] pb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-[10px] text-[#2b2b2b]">3</span>
                <span className="font-mono text-[10px] text-[#a2a2a2] uppercase">PROJECT CREATIVITY & MOTION</span>
              </div>
              <div className="relative">
                <select
                  value={creativity}
                  onChange={(e) => setCreativity(e.target.value)}
                  className="w-full bg-transparent text-[#2b2b2b] font-medium py-2 outline-none appearance-none cursor-pointer text-base md:text-lg"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  <option value="enhanced">Enhanced — refined motion and micro-interactions</option>
                  <option value="standard">Standard — clean, fast & minimal</option>
                  <option value="masterpiece">Masterpiece — bespoke fluid shaders & 3D elements</option>
                </select>
                <ChevronDown className="w-5 h-5 text-[#a2a2a2] absolute right-0 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Field 4 — Project Timeline */}
            <div className="border-b border-[#dedede] pb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-[10px] text-[#2b2b2b]">4</span>
                <span className="font-mono text-[10px] text-[#a2a2a2] uppercase">PROJECT TIMELINE</span>
              </div>
              <div className="relative">
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full bg-transparent text-[#2b2b2b] font-medium py-2 outline-none appearance-none cursor-pointer text-base md:text-lg"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  <option value="asap">ASAP — short sprint / rapid deployment</option>
                  <option value="flexible">Flexible — standard 3 to 6 weeks</option>
                </select>
                <ChevronDown className="w-5 h-5 text-[#a2a2a2] absolute right-0 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Dynamic Estimation Calculation Box — matching frame 00:37 */}
          <div className="pt-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 border-t border-[#dedede]">
            <div>
              <span className="font-mono text-xs text-[#a2a2a2] uppercase block mb-1">
                Estimated development timeline
              </span>
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#2b2b2b',
                  letterSpacing: '-0.04em',
                }}
              >
                {currentPricing.weeks} <span className="text-base font-normal text-[#656565]">weeks</span>
              </div>
            </div>

            <div>
              <span className="font-mono text-xs text-[#a2a2a2] uppercase block mb-1">
                Estimated price range
              </span>
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#2b2b2b',
                  letterSpacing: '-0.04em',
                }}
              >
                {currentPricing.inr} <span className="text-sm font-normal text-[#a2a2a2]">({currentPricing.usd})</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full md:w-auto font-mono text-xs uppercase tracking-wider px-8 py-4 rounded-full bg-[#2b2b2b] text-white hover:bg-[#fc4778] transition-all duration-200 shadow-md flex items-center justify-center cursor-pointer"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              START A CONVERSATION
            </button>
          </div>
        </motion.div>
      )}

      {/* Tab 2: Recurring Retainer Cards */}
      {tab === 'recurring' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Plan 1 */}
          <div className="bg-white rounded-3xl p-8 border border-[#dedede] shadow-sm flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-[#a2a2a2] uppercase tracking-wider block mb-2">
                STANDARD ENGAGEMENT
              </span>
              <h4
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: '#2b2b2b',
                  letterSpacing: '-0.04em',
                }}
              >
                ₹39,999 <span className="text-sm font-normal text-[#656565]">/month</span>
              </h4>
              <p className="text-sm text-[#656565] font-light mt-2 mb-6">
                Ideal for startups and growing brands needing continuous web dev & AI automation.
              </p>

              <div className="space-y-3 pt-6 border-t border-[#dedede]">
                {[
                  'Full-Stack MERN Development',
                  '1 active request at a time',
                  'Dedicated WhatsApp AI agent updates',
                  'Weekly deployments & cloud management',
                  'Direct Slack / WhatsApp channel',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#2b2b2b]">
                    <CheckCircle2 className="w-4 h-4 text-[#fc4778] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="mt-8 w-full font-mono text-xs uppercase tracking-wider py-4 rounded-full bg-[#2b2b2b] text-white hover:bg-[#fc4778] transition-colors"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              START A CONVERSATION
            </button>
          </div>

          {/* Plan 2 */}
          <div className="bg-[#2b2b2b] text-white rounded-3xl p-8 shadow-md flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-[#fc4778] uppercase tracking-wider block mb-2">
                SCALE & AUTOMATE PRO
              </span>
              <h4
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '-0.04em',
                }}
              >
                ₹79,999 <span className="text-sm font-normal text-[#a2a2a2]">/month</span>
              </h4>
              <p className="text-sm text-[#a2a2a2] font-light mt-2 mb-6">
                For high-velocity businesses scaling 100x with complex web apps and full automation.
              </p>

              <div className="space-y-3 pt-6 border-t border-white/15">
                {[
                  'Multiple simultaneous dev requests',
                  'Full MERN SaaS platform engineering',
                  'End-to-end multi-channel AI auto follow-up',
                  'Custom API integrations & AWS cloud scaling',
                  '24/7 priority support & dedicated engineer',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#fafafa]">
                    <CheckCircle2 className="w-4 h-4 text-[#fc4778] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="mt-8 w-full font-mono text-xs uppercase tracking-wider py-4 rounded-full bg-[#fc4778] text-white hover:bg-white hover:text-[#2b2b2b] transition-colors"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              START A CONVERSATION
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
