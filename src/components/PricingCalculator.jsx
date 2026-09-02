import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function PricingCalculator({ onNavigate }) {
  // Step 1: Project Category (Website or AI Agent)
  const [category, setCategory] = useState('website'); // 'website' | 'agent'

  // Step 2: Target Budget Expectation
  const [budget, setBudget] = useState('tier2');

  // Step 3 & 4 (Website Specific)
  const [websiteMotion, setWebsiteMotion] = useState('creative'); // 'simple' | 'creative'
  const [websiteType, setWebsiteType] = useState('webapp'); // 'landing' | 'corporate' | 'webapp'

  // Step 3 & 4 (AI Agent Specific)
  const [agentTask, setAgentTask] = useState('lead_followup'); // 'lead_followup' | 'sales_voice' | 'operations' | 'multi_agent'
  const [agentScope, setAgentScope] = useState('multi_channel'); // 'standard' | 'multi_channel' | 'enterprise'

  // Dynamic cost calculation (Spanning ₹10,000 to ₹1,50,000)
  const calculatePricing = () => {
    let minPrice = 10000;
    let maxPrice = 25000;
    let weeks = '1 – 2';

    if (category === 'website') {
      if (websiteType === 'landing') {
        if (websiteMotion === 'simple') {
          minPrice = 10000;
          maxPrice = 18000;
          weeks = '1 – 2';
        } else {
          minPrice = 22000;
          maxPrice = 38000;
          weeks = '2 – 3';
        }
      } else if (websiteType === 'corporate') {
        if (websiteMotion === 'simple') {
          minPrice = 25000;
          maxPrice = 42000;
          weeks = '2 – 3';
        } else {
          minPrice = 45000;
          maxPrice = 75000;
          weeks = '3 – 4';
        }
      } else if (websiteType === 'webapp') {
        if (websiteMotion === 'simple') {
          minPrice = 50000;
          maxPrice = 85000;
          weeks = '3 – 5';
        } else {
          minPrice = 90000;
          maxPrice = 150000;
          weeks = '4 – 7';
        }
      }
    } else {
      // AI Agent Calculation
      if (agentTask === 'lead_followup') {
        if (agentScope === 'standard') {
          minPrice = 15000;
          maxPrice = 28000;
          weeks = '1 – 2';
        } else if (agentScope === 'multi_channel') {
          minPrice = 32000;
          maxPrice = 52000;
          weeks = '2 – 3';
        } else {
          minPrice = 60000;
          maxPrice = 85000;
          weeks = '3 – 4';
        }
      } else if (agentTask === 'sales_voice') {
        if (agentScope === 'standard') {
          minPrice = 35000;
          maxPrice = 58000;
          weeks = '2 – 3';
        } else if (agentScope === 'multi_channel') {
          minPrice = 58000;
          maxPrice = 92000;
          weeks = '3 – 4';
        } else {
          minPrice = 95000;
          maxPrice = 135000;
          weeks = '4 – 6';
        }
      } else if (agentTask === 'operations') {
        if (agentScope === 'standard') {
          minPrice = 30000;
          maxPrice = 52000;
          weeks = '2 – 3';
        } else if (agentScope === 'multi_channel') {
          minPrice = 55000;
          maxPrice = 88000;
          weeks = '3 – 5';
        } else {
          minPrice = 90000;
          maxPrice = 140000;
          weeks = '4 – 6';
        }
      } else if (agentTask === 'multi_agent') {
        if (agentScope === 'standard') {
          minPrice = 65000;
          maxPrice = 95000;
          weeks = '3 – 4';
        } else if (agentScope === 'multi_channel') {
          minPrice = 95000;
          maxPrice = 130000;
          weeks = '4 – 6';
        } else {
          minPrice = 125000;
          maxPrice = 150000;
          weeks = '5 – 8';
        }
      }
    }

    // Format thousands cleanly
    const minFormatted = minPrice >= 100000 ? `₹${(minPrice / 100000).toFixed(1)}L` : `₹${(minPrice / 1000).toFixed(0)}k`;
    const maxFormatted = maxPrice >= 100000 ? `₹${(maxPrice / 100000).toFixed(1)}L` : `₹${(maxPrice / 1000).toFixed(0)}k`;

    return {
      weeks,
      inr: `${minFormatted} – ${maxFormatted}`,
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
          PRICING & ESTIMATION (₹10,000 – ₹1,50,000)
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
          Project Pricing Calculator
        </h2>
        <p
          className="mt-4 text-[#656565] max-w-xl font-light"
          style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', lineHeight: 1.5 }}
        >
          Choose whether you need a high-impact website or an autonomous AI agent system to calculate your exact development timeline and price estimate.
        </p>
      </div>

      {/* Interactive Project Calculator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
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
            Estimate Your Project
          </h3>
          <p className="text-sm text-[#656565] font-light mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Transparent fixed-scope estimation starting from ₹10,000 up to ₹1,50,000 with guaranteed delivery.
          </p>
        </div>

        <div className="space-y-6">
          {/* Step 1 — Make Website or AI Agent */}
          <div className="border-b border-[#dedede] pb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-[10px] text-[#2b2b2b]">1</span>
              <span className="font-mono text-[10px] text-[#a2a2a2] uppercase">1. PROJECT TYPE (WEBSITE OR AI AGENT)</span>
            </div>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent text-[#2b2b2b] font-medium py-2 outline-none appearance-none cursor-pointer text-base md:text-lg"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                <option value="website">Make Website / High-Converting Web Application</option>
                <option value="agent">Autonomous AI Agent / Repeated Workflow Automation</option>
              </select>
              <ChevronDown className="w-5 h-5 text-[#a2a2a2] absolute right-0 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Step 2 — Target Budget */}
          <div className="border-b border-[#dedede] pb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-[10px] text-[#2b2b2b]">2</span>
              <span className="font-mono text-[10px] text-[#a2a2a2] uppercase">2. YOUR TARGET BUDGET RANGE</span>
            </div>
            <div className="relative">
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-transparent text-[#2b2b2b] font-medium py-2 outline-none appearance-none cursor-pointer text-base md:text-lg"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                <option value="tier1">₹10,000 – ₹25,000 (Starter MVP / Fast Sprint)</option>
                <option value="tier2">₹25,000 – ₹60,000 (Growth & Scale / Custom Features)</option>
                <option value="tier3">₹60,000 – ₹1,00,000 (Advanced Automation & Web Apps)</option>
                <option value="tier4">₹1,00,000 – ₹1,50,000 (Full Enterprise Ecosystem)</option>
              </select>
              <ChevronDown className="w-5 h-5 text-[#a2a2a2] absolute right-0 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Step 3 & 4 (CONDITIONAL: If Website Selected) */}
          {category === 'website' && (
            <>
              {/* Step 3: Website Design Style (Simpler or Creative Motion) */}
              <div className="border-b border-[#dedede] pb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-[10px] text-[#2b2b2b]">3</span>
                  <span className="font-mono text-[10px] text-[#a2a2a2] uppercase">3. WEBSITE DESIGN STYLE</span>
                </div>
                <div className="relative">
                  <select
                    value={websiteMotion}
                    onChange={(e) => setWebsiteMotion(e.target.value)}
                    className="w-full bg-transparent text-[#2b2b2b] font-medium py-2 outline-none appearance-none cursor-pointer text-base md:text-lg"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    <option value="simple">Simpler Design — Clean, minimal & ultra-fast loading</option>
                    <option value="creative">Creative Motion — Smooth scroll, fluid hover effects & micro-interactions</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-[#a2a2a2] absolute right-0 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Step 4: Website Scope & Architecture */}
              <div className="border-b border-[#dedede] pb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-[10px] text-[#2b2b2b]">4</span>
                  <span className="font-mono text-[10px] text-[#a2a2a2] uppercase">4. WEBSITE SCOPE & PAGES</span>
                </div>
                <div className="relative">
                  <select
                    value={websiteType}
                    onChange={(e) => setWebsiteType(e.target.value)}
                    className="w-full bg-transparent text-[#2b2b2b] font-medium py-2 outline-none appearance-none cursor-pointer text-base md:text-lg"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    <option value="landing">High-Conversion Landing Page (1-Page Launch)</option>
                    <option value="corporate">Multi-Page Corporate / Brand Website (5 to 8 Pages)</option>
                    <option value="webapp">Custom Full-Stack MERN Web App / SaaS Admin Panel</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-[#a2a2a2] absolute right-0 top-3 pointer-events-none" />
                </div>
              </div>
            </>
          )}

          {/* Step 3 & 4 (CONDITIONAL: If AI Agent Selected) */}
          {category === 'agent' && (
            <>
              {/* Step 3: What Agent Tasks */}
              <div className="border-b border-[#dedede] pb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-[10px] text-[#2b2b2b]">3</span>
                  <span className="font-mono text-[10px] text-[#a2a2a2] uppercase">3. WHAT AGENT TASKS</span>
                </div>
                <div className="relative">
                  <select
                    value={agentTask}
                    onChange={(e) => setAgentTask(e.target.value)}
                    className="w-full bg-transparent text-[#2b2b2b] font-medium py-2 outline-none appearance-none cursor-pointer text-base md:text-lg"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    <option value="lead_followup">Lead Capture & Auto Follow-Up (WhatsApp, Email & CRM 24/7)</option>
                    <option value="sales_voice">24/7 Sales & Support Voice / Chat Agent (Sub-200ms audio latency)</option>
                    <option value="operations">Repeated Operations & Data Tasks (Invoices, scraping & reconciliation)</option>
                    <option value="multi_agent">Autonomous Multi-Agent Workflow Engine (Zero employee overhead)</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-[#a2a2a2] absolute right-0 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Step 4: Integration Scope */}
              <div className="border-b border-[#dedede] pb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-[10px] text-[#2b2b2b]">4</span>
                  <span className="font-mono text-[10px] text-[#a2a2a2] uppercase">4. INTEGRATION CHANNELS</span>
                </div>
                <div className="relative">
                  <select
                    value={agentScope}
                    onChange={(e) => setAgentScope(e.target.value)}
                    className="w-full bg-transparent text-[#2b2b2b] font-medium py-2 outline-none appearance-none cursor-pointer text-base md:text-lg"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    <option value="standard">Single Channel (WhatsApp or Website Chatbot)</option>
                    <option value="multi_channel">Multi-Channel Hub (WhatsApp + Email + CRM + Google Calendar)</option>
                    <option value="enterprise">Full Enterprise Architecture (Custom LLM, ERP webhooks & database sync)</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-[#a2a2a2] absolute right-0 top-3 pointer-events-none" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Dynamic Estimation Calculation Box */}
        <div className="pt-4 border-t border-[#dedede]">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-[#a2a2a2] uppercase block mb-1">
                Estimated development timeline
              </span>
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(1.5rem, 4.5vw, 2rem)',
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
                  fontSize: 'clamp(1.4rem, 4.5vw, 2rem)',
                  fontWeight: 700,
                  color: '#2b2b2b',
                  letterSpacing: '-0.04em',
                }}
              >
                {currentPricing.inr} <span className="text-xs sm:text-sm font-normal text-[#a2a2a2]">({currentPricing.usd})</span>
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

          {/* Note text placed with generous distance below the price row */}
          <div className="mt-7 pt-3 border-t border-[#f5f5f5]">
            <p
              className="text-[10px] text-[#8e8e8e] font-light"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              * Note: Estimated range, not final quote. Actual price may vary based on custom requirements and technical specifications.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
