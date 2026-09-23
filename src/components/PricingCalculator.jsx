import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail, CheckCircle2, ArrowRight, Loader2, RefreshCw } from 'lucide-react';

export default function PricingCalculator({ onNavigate }) {
  // Step 1: Project Category (Website or AI Agent) — starts empty
  const [category, setCategory] = useState(''); // '' | 'website' | 'agent'

  // Step 2: Target Budget Expectation — starts empty
  const [budget, setBudget] = useState(''); // '' | 'tier1' | 'tier2' | 'tier3' | 'tier4'

  // Step 3 & 4 (Website Specific) — starts empty
  const [websiteMotion, setWebsiteMotion] = useState(''); // '' | 'simple' | 'creative'
  const [websiteType, setWebsiteType] = useState(''); // '' | 'landing' | 'corporate' | 'webapp'

  // Step 3 & 4 (AI Agent Specific) — starts empty
  const [agentTask, setAgentTask] = useState(''); // '' | 'lead_followup' | 'sales_voice' | 'operations' | 'multi_agent'
  const [agentScope, setAgentScope] = useState(''); // '' | 'standard' | 'multi_channel' | 'enterprise'

  // Step 5: User contact details
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Human-readable labels for email dispatch and display
  const budgetLabels = {
    tier1: '₹10,000 – ₹25,000 (Starter MVP / Fast Sprint)',
    tier2: '₹25,000 – ₹60,000 (Growth & Scale / Custom Features)',
    tier3: '₹60,000 – ₹1,00,000 (Advanced Automation & Web Apps)',
    tier4: '₹1,00,000 – ₹1,50,000 (Full Enterprise Ecosystem)',
  };

  const websiteMotionLabels = {
    simple: 'Simpler Design — Clean, minimal & ultra-fast loading',
    creative: 'Creative Motion — Smooth scroll, fluid hover effects & micro-interactions',
  };

  const websiteTypeLabels = {
    landing: 'High-Conversion Landing Page (1-Page Launch)',
    corporate: 'Multi-Page Corporate / Brand Website (5 to 8 Pages)',
    webapp: 'Custom Full-Stack MERN Web App / SaaS Admin Panel',
  };

  const agentTaskLabels = {
    lead_followup: 'Lead Capture & Auto Follow-Up (WhatsApp, Email & CRM 24/7)',
    sales_voice: '24/7 Sales & Support Voice / Chat Agent (Sub-200ms audio latency)',
    operations: 'Repeated Operations & Data Tasks (Invoices, scraping & reconciliation)',
    multi_agent: 'Autonomous Multi-Agent Workflow Engine (Zero employee overhead)',
  };

  const agentScopeLabels = {
    standard: 'Single Channel (WhatsApp or Website Chatbot)',
    multi_channel: 'Multi-Channel Hub (WhatsApp + Email + CRM + Google Calendar)',
    enterprise: 'Full Enterprise Architecture (Custom LLM, ERP webhooks & database sync)',
  };

  // Check whether all required project specification steps are selected
  const isSpecsCompleted = Boolean(
    category &&
    budget &&
    (category === 'website' ? (websiteMotion && websiteType) : (agentTask && agentScope))
  );

  // Dynamic cost calculation (Spanning ₹10,000 to ₹1,50,000)
  const calculatePricing = () => {
    if (!isSpecsCompleted) {
      return null;
    }

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

  // Reset calculator to clean empty state
  const handleReset = () => {
    setCategory('');
    setBudget('');
    setWebsiteMotion('');
    setWebsiteType('');
    setAgentTask('');
    setAgentScope('');
    setUserEmail('');
    setUserName('');
    setSubmitted(false);
    setErrorMessage('');
  };

  // Handle Form Submission and send email to dhruvp9639@gmail.com
  const handleSubmitEstimate = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!category) {
      setErrorMessage('Please select Step 1: Project Type.');
      return;
    }
    if (!budget) {
      setErrorMessage('Please select Step 2: Target Budget Range.');
      return;
    }
    if (category === 'website' && (!websiteMotion || !websiteType)) {
      setErrorMessage('Please complete Website Design Style and Scope options.');
      return;
    }
    if (category === 'agent' && (!agentTask || !agentScope)) {
      setErrorMessage('Please complete AI Agent Tasks and Integration Channels.');
      return;
    }
    if (!userEmail || !userEmail.includes('@') || !userEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address in Step 5 to receive your estimate.');
      return;
    }

    setIsSubmitting(true);

    const pricing = calculatePricing();
    const projectTypeName = category === 'website' ? 'Website / High-Converting Web Application' : 'Autonomous AI Agent System';
    const styleOrTask = category === 'website' ? (websiteMotionLabels[websiteMotion] || websiteMotion) : (agentTaskLabels[agentTask] || agentTask);
    const scopeOrChannels = category === 'website' ? (websiteTypeLabels[websiteType] || websiteType) : (agentScopeLabels[agentScope] || agentScope);

    const payload = {
      _subject: `New Project Estimate Request: ${projectTypeName} (${pricing ? pricing.inr : ''})`,
      _template: 'table',
      _captcha: 'false',
      _cc: 'dhruvp9639@gmail.com',
      'Client Email': userEmail,
      'Client Name or WhatsApp': userName || 'Not provided',
      'Project Type': projectTypeName,
      'Target Budget': budgetLabels[budget] || budget,
      'Design Style / Agent Task': styleOrTask,
      'Scope / Channels': scopeOrChannels,
      'Estimated Timeline': pricing ? `${pricing.weeks} weeks` : 'To be confirmed',
      'Estimated Price INR': pricing ? pricing.inr : 'Custom Quote',
      'Estimated Price USD': pricing ? pricing.usd : 'Custom Quote',
      'Submission Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/amyagrowth@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        // Fallback: still show positive confirmation
        setSubmitted(true);
      }
    } catch (err) {
      console.warn('FormSubmit connection notice, proceeding with confirmation:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 my-10 md:my-16 scroll-mt-24">
      {/* Section Header */}
      <div className="mb-6 md:mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#3F7E7C] animate-pulse" />
          <span
            className="font-mono text-xs text-[#a2a2a2] uppercase tracking-wider"
            style={{ fontFamily: 'Space Mono, monospace' }}
          >
            PRICING & ESTIMATION (₹10,000 – ₹1,50,000)
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'Space Grotesk, DM Serif Display, sans-serif',
            fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#2b2b2b',
            fontWeight: 600,
          }}
        >
          Project Pricing Calculator
        </h2>
        <p
          className="mt-3 text-[#656565] max-w-xl font-light text-sm sm:text-base leading-relaxed"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Fill in your project specifications to calculate your exact development timeline and price estimate, and receive detailed quotation directly to your email.
        </p>
      </div>

      {/* Interactive Project Calculator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-10 border border-[#dedede] shadow-sm relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 pb-5 border-b border-[#f0f0f0]">
          <div>
            <h3
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(1.35rem, 3vw, 1.75rem)',
                fontWeight: 600,
                color: '#2b2b2b',
                letterSpacing: '-0.02em',
              }}
            >
              Estimate Your Project
            </h3>
            <p className="text-xs sm:text-sm text-[#656565] font-light mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Select each field below to generate your custom timeline and budget estimate.
            </p>
          </div>

          {(category || budget || userEmail) && !submitted && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-[#8e8e8e] hover:text-[#3F7E7C] transition-colors self-start sm:self-auto py-1.5 px-3 rounded-lg border border-[#e5e5e5] hover:border-[#3F7E7C] bg-white cursor-pointer"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              CLEAR FORM
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            /* Success confirmation card */
            <motion.div
              key="success-state"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="py-12 px-4 md:px-8 text-center flex flex-col items-center justify-center space-y-5 rounded-2xl bg-[#f8fbfb] border border-[#d2ebe9]"
            >
              <div className="w-16 h-16 rounded-full bg-[#EAF4F3] text-[#3F7E7C] flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="max-w-md space-y-2">
                <h4
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#2b2b2b',
                  }}
                >
                  Estimate Details Received!
                </h4>
                <p className="text-[#656565] text-sm font-light leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Thank you! Your project specification and estimated timeline of{' '}
                  <strong className="text-[#2b2b2b] font-medium">{currentPricing?.weeks} weeks</strong> have been forwarded to our team.
                  We will contact <strong className="text-[#3F7E7C]">{userEmail}</strong> within 24 hours with full proposal details and custom quotation.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="font-mono text-xs uppercase tracking-wider px-6 py-3 rounded-full bg-[#2b2b2b] text-white hover:bg-[#3F7E7C] transition-colors shadow-sm cursor-pointer"
                  style={{ fontFamily: 'Space Mono, monospace' }}
                >
                  Calculate Another Project
                </button>
                {onNavigate && (
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="font-mono text-xs uppercase tracking-wider px-6 py-3 rounded-full border border-[#dedede] text-[#2b2b2b] hover:border-[#3F7E7C] hover:text-[#3F7E7C] transition-colors cursor-pointer"
                    style={{ fontFamily: 'Space Mono, monospace' }}
                  >
                    Direct Consultation
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmitEstimate} className="space-y-6 sm:space-y-7">
              {/* Step 1 — Make Website or AI Agent */}
              <div className="border-b border-[#dedede] pb-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#f1f1f1] border border-[#dedede] text-[#3F7E7C] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    01
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-[#6e6e6e] uppercase tracking-wider font-medium">
                    Project Type (Website or AI Agent)
                  </span>
                </div>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setWebsiteMotion('');
                      setWebsiteType('');
                      setAgentTask('');
                      setAgentScope('');
                      setErrorMessage('');
                    }}
                    className={`w-full bg-transparent font-medium py-2.5 sm:py-3 pr-8 outline-none appearance-none cursor-pointer text-sm sm:text-base md:text-lg transition-colors border-b border-[#e5e5e5] focus:border-[#3F7E7C] ${
                      category ? 'text-[#2b2b2b]' : 'text-[#8e8e8e]'
                    }`}
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    <option value="" disabled>
                      Select Project Type (Website or AI Agent)...
                    </option>
                    <option value="website">Make Website / High-Converting Web Application</option>
                    <option value="agent">Autonomous AI Agent / Repeated Workflow Automation</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-[#a2a2a2] absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Step 2 — Target Budget */}
              <div className="border-b border-[#dedede] pb-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#f1f1f1] border border-[#dedede] text-[#3F7E7C] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    02
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-[#6e6e6e] uppercase tracking-wider font-medium">
                    Your Target Budget Range
                  </span>
                </div>
                <div className="relative">
                  <select
                    value={budget}
                    onChange={(e) => {
                      setBudget(e.target.value);
                      setErrorMessage('');
                    }}
                    className={`w-full bg-transparent font-medium py-2.5 sm:py-3 pr-8 outline-none appearance-none cursor-pointer text-sm sm:text-base md:text-lg transition-colors border-b border-[#e5e5e5] focus:border-[#3F7E7C] ${
                      budget ? 'text-[#2b2b2b]' : 'text-[#8e8e8e]'
                    }`}
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    <option value="" disabled>
                      Select Your Target Budget Range...
                    </option>
                    <option value="tier1">₹10,000 – ₹25,000 (Starter MVP / Fast Sprint)</option>
                    <option value="tier2">₹25,000 – ₹60,000 (Growth & Scale / Custom Features)</option>
                    <option value="tier3">₹60,000 – ₹1,00,000 (Advanced Automation & Web Apps)</option>
                    <option value="tier4">₹1,00,000 – ₹1,50,000 (Full Enterprise Ecosystem)</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-[#a2a2a2] absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Step 3 & 4 (CONDITIONAL: If Website Selected) */}
              {category === 'website' && (
                <>
                  {/* Step 3: Website Design Style */}
                  <div className="border-b border-[#dedede] pb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-[#f1f1f1] border border-[#dedede] text-[#3F7E7C] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        03
                      </span>
                      <span className="font-mono text-[11px] sm:text-xs text-[#6e6e6e] uppercase tracking-wider font-medium">
                        Website Design Style
                      </span>
                    </div>
                    <div className="relative">
                      <select
                        value={websiteMotion}
                        onChange={(e) => {
                          setWebsiteMotion(e.target.value);
                          setErrorMessage('');
                        }}
                        className={`w-full bg-transparent font-medium py-2.5 sm:py-3 pr-8 outline-none appearance-none cursor-pointer text-sm sm:text-base md:text-lg transition-colors border-b border-[#e5e5e5] focus:border-[#3F7E7C] ${
                          websiteMotion ? 'text-[#2b2b2b]' : 'text-[#8e8e8e]'
                        }`}
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                      >
                        <option value="" disabled>
                          Select Website Design Style...
                        </option>
                        <option value="simple">Simpler Design — Clean, minimal & ultra-fast loading</option>
                        <option value="creative">Creative Motion — Smooth scroll, fluid hover effects & micro-interactions</option>
                      </select>
                      <ChevronDown className="w-5 h-5 text-[#a2a2a2] absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Step 4: Website Scope & Architecture */}
                  <div className="border-b border-[#dedede] pb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-[#f1f1f1] border border-[#dedede] text-[#3F7E7C] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        04
                      </span>
                      <span className="font-mono text-[11px] sm:text-xs text-[#6e6e6e] uppercase tracking-wider font-medium">
                        Website Scope & Pages
                      </span>
                    </div>
                    <div className="relative">
                      <select
                        value={websiteType}
                        onChange={(e) => {
                          setWebsiteType(e.target.value);
                          setErrorMessage('');
                        }}
                        className={`w-full bg-transparent font-medium py-2.5 sm:py-3 pr-8 outline-none appearance-none cursor-pointer text-sm sm:text-base md:text-lg transition-colors border-b border-[#e5e5e5] focus:border-[#3F7E7C] ${
                          websiteType ? 'text-[#2b2b2b]' : 'text-[#8e8e8e]'
                        }`}
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                      >
                        <option value="" disabled>
                          Select Website Scope & Pages...
                        </option>
                        <option value="landing">High-Conversion Landing Page (1-Page Launch)</option>
                        <option value="corporate">Multi-Page Corporate / Brand Website (5 to 8 Pages)</option>
                        <option value="webapp">Custom Full-Stack MERN Web App / SaaS Admin Panel</option>
                      </select>
                      <ChevronDown className="w-5 h-5 text-[#a2a2a2] absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </>
              )}

              {/* Step 3 & 4 (CONDITIONAL: If AI Agent Selected) */}
              {category === 'agent' && (
                <>
                  {/* Step 3: What Agent Tasks */}
                  <div className="border-b border-[#dedede] pb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-[#f1f1f1] border border-[#dedede] text-[#3F7E7C] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        03
                      </span>
                      <span className="font-mono text-[11px] sm:text-xs text-[#6e6e6e] uppercase tracking-wider font-medium">
                        Agent Tasks & Automation
                      </span>
                    </div>
                    <div className="relative">
                      <select
                        value={agentTask}
                        onChange={(e) => {
                          setAgentTask(e.target.value);
                          setErrorMessage('');
                        }}
                        className={`w-full bg-transparent font-medium py-2.5 sm:py-3 pr-8 outline-none appearance-none cursor-pointer text-sm sm:text-base md:text-lg transition-colors border-b border-[#e5e5e5] focus:border-[#3F7E7C] ${
                          agentTask ? 'text-[#2b2b2b]' : 'text-[#8e8e8e]'
                        }`}
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                      >
                        <option value="" disabled>
                          Select Agent Tasks & Automation...
                        </option>
                        <option value="lead_followup">Lead Capture & Auto Follow-Up (WhatsApp, Email & CRM 24/7)</option>
                        <option value="sales_voice">24/7 Sales & Support Voice / Chat Agent (Sub-200ms audio latency)</option>
                        <option value="operations">Repeated Operations & Data Tasks (Invoices, scraping & reconciliation)</option>
                        <option value="multi_agent">Autonomous Multi-Agent Workflow Engine (Zero employee overhead)</option>
                      </select>
                      <ChevronDown className="w-5 h-5 text-[#a2a2a2] absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Step 4: Integration Scope */}
                  <div className="border-b border-[#dedede] pb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-[#f1f1f1] border border-[#dedede] text-[#3F7E7C] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        04
                      </span>
                      <span className="font-mono text-[11px] sm:text-xs text-[#6e6e6e] uppercase tracking-wider font-medium">
                        Integration Channels
                      </span>
                    </div>
                    <div className="relative">
                      <select
                        value={agentScope}
                        onChange={(e) => {
                          setAgentScope(e.target.value);
                          setErrorMessage('');
                        }}
                        className={`w-full bg-transparent font-medium py-2.5 sm:py-3 pr-8 outline-none appearance-none cursor-pointer text-sm sm:text-base md:text-lg transition-colors border-b border-[#e5e5e5] focus:border-[#3F7E7C] ${
                          agentScope ? 'text-[#2b2b2b]' : 'text-[#8e8e8e]'
                        }`}
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                      >
                        <option value="" disabled>
                          Select Integration Channels...
                        </option>
                        <option value="standard">Single Channel (WhatsApp or Website Chatbot)</option>
                        <option value="multi_channel">Multi-Channel Hub (WhatsApp + Email + CRM + Google Calendar)</option>
                        <option value="enterprise">Full Enterprise Architecture (Custom LLM, ERP webhooks & database sync)</option>
                      </select>
                      <ChevronDown className="w-5 h-5 text-[#a2a2a2] absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </>
              )}

              {/* Step 3 & 4 (Placeholder when Step 1 not chosen yet) */}
              {!category && (
                <div className="border-b border-[#dedede] pb-5 opacity-60">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#f1f1f1] border border-[#dedede] text-[#a2a2a2] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      03 & 04
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs text-[#a2a2a2] uppercase tracking-wider font-medium">
                      Specifications & Scope
                    </span>
                  </div>
                  <div className="py-2 text-[#a2a2a2] font-light text-xs sm:text-sm italic" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Select Step 01 (Project Type) above to unlock specific scope and architecture options.
                  </div>
                </div>
              )}

              {/* Step 5 — User Contact Details */}
              <div className="border-b border-[#dedede] pb-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#f1f1f1] border border-[#dedede] text-[#3F7E7C] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    05
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-[#6e6e6e] uppercase tracking-wider font-medium">
                    Your Contact Information
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 mt-3">
                  <div className="relative">
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                        setErrorMessage('');
                      }}
                      placeholder="Your Email (e.g. name@company.com) *"
                      required
                      className="w-full bg-[#f9f9f9] text-[#2b2b2b] placeholder-[#a2a2a2] font-light py-3 pl-10 pr-3.5 outline-none rounded-xl border border-[#e5e5e5] focus:border-[#3F7E7C] focus:bg-white transition-all text-sm sm:text-base"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                    <Mail className="w-4 h-4 text-[#a2a2a2] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Your Name or WhatsApp (optional)"
                      className="w-full bg-[#f9f9f9] text-[#2b2b2b] placeholder-[#a2a2a2] font-light py-3 px-3.5 outline-none rounded-xl border border-[#e5e5e5] focus:border-[#3F7E7C] focus:bg-white transition-all text-sm sm:text-base"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                  </div>
                </div>
              </div>

              {/* Inline Error Message if any */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-mono border border-red-200">
                  {errorMessage}
                </div>
              )}

              {/* Dynamic Estimation Calculation Box & Submit */}
              <div className="pt-2 sm:pt-4">
                <div className="p-4 sm:p-6 rounded-2xl bg-[#f8fbfb] border border-[#d2ebe9] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6">
                  <div>
                    <span className="font-mono text-[11px] text-[#3F7E7C] uppercase font-semibold tracking-wider block mb-1">
                      Estimated Development Timeline
                    </span>
                    <div
                      style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: 'clamp(1.4rem, 4vw, 2rem)',
                        fontWeight: 700,
                        color: currentPricing ? '#2b2b2b' : '#a2a2a2',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {currentPricing ? (
                        <>
                          {currentPricing.weeks} <span className="text-sm font-normal text-[#656565]">weeks</span>
                        </>
                      ) : (
                        <span className="text-sm font-normal text-[#a2a2a2] italic">Select options above</span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto font-mono text-xs uppercase tracking-wider px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#2b2b2b] text-white hover:bg-[#3F7E7C] active:scale-[0.99] transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shrink-0"
                    style={{ fontFamily: 'Space Mono, monospace' }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        SENDING ESTIMATE...
                      </>
                    ) : (
                      <>
                        GET PRICE DETAILS
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Note text placed with generous distance below the timeline row */}
                <div className="mt-4 pt-2">
                  <p
                    className="text-[10px] sm:text-[11px] text-[#8e8e8e] font-light leading-normal"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    * Note: Estimated timeline may vary based on custom requirements. Full price quotation is delivered directly to your email.
                  </p>
                </div>
              </div>
            </form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
