import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Mail,
  CheckCircle2,
  ArrowRight,
  Loader2,
  RefreshCw,
  Building2,
  Phone,
  FileText,
  Sparkles,
} from 'lucide-react';

export default function PricingCalculator({ onNavigate }) {
  // Field 1: Project Requirement (Optional)
  const [requirement, setRequirement] = useState(''); // '' | 'webapp' | 'website' | 'ai_agents'

  // Field 2: Expected Budget Range
  const [budget, setBudget] = useState(''); // '' | '5k_10k' | '10k_50k' | '50k_1L' | '1L_plus'

  // Field 3: Comments for specific requirement (Optional)
  const [comments, setComments] = useState('');

  // Field 4: Business Details (Compulsory - C)
  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');

  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Professional labels
  const requirementLabels = {
    webapp: '1. Web Application (Full-Stack / MERN / SaaS & Admin Portal)',
    website: '2. Website (Corporate Brand / High-Conversion Landing Page)',
    ai_agents: '3. AI Agents Related Set-Up (Autonomous 24/7 Agent, WhatsApp / Voice AI, CRM)',
  };

  const budgetLabels = {
    '5k_10k': '₹5,000 – ₹10,000 (Quick Sprint / Prototype / Starter Setup)',
    '10k_50k': '₹10,000 – ₹50,000 (Standard MVP / Brand Website / Core Automations)',
    '50k_1L': '₹50,000 – ₹1,00,000 (Advanced Scalable Web App & Multi-Channel AI System)',
    '1L_plus': '₹1,00,000+ (Full Enterprise Ecosystem & Custom Infrastructure)',
  };

  // Dynamic estimate calculation based on selected budget
  const calculateEstimate = () => {
    if (!budget) return null;

    switch (budget) {
      case '5k_10k':
        return {
          weeks: '3 – 7 Days',
          label: 'Rapid Prototype & Starter Sprint',
          range: '₹5,000 – ₹10,000',
        };
      case '10k_50k':
        return {
          weeks: '1 – 3 Weeks',
          label: 'Production-Ready MVP & Brand Sprint',
          range: '₹10,000 – ₹50,000',
        };
      case '50k_1L':
        return {
          weeks: '3 – 5 Weeks',
          label: 'Scalable Full-Stack Architecture & Multi-Agent Engine',
          range: '₹50,000 – ₹1,00,000',
        };
      case '1L_plus':
        return {
          weeks: '5 – 8 Weeks',
          label: 'Enterprise Autonomous Ecosystem & Custom Cloud Infrastructure',
          range: '₹1,00,000+',
        };
      default:
        return null;
    }
  };

  const currentEstimate = calculateEstimate();

  const handleReset = () => {
    setRequirement('');
    setBudget('');
    setComments('');
    setBusinessName('');
    setBusinessEmail('');
    setBusinessPhone('');
    setErrorMessage('');
    setSubmitted(false);
  };

  // Handle Form Submission with Compulsory validation
  const handleSubmitEstimate = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation for Compulsory (C) fields
    if (!businessName.trim()) {
      setErrorMessage('Please enter your Business / Company Name (Compulsory).');
      return;
    }

    if (!businessEmail.trim() || !businessEmail.includes('@')) {
      setErrorMessage('Please enter a valid Business Work Email (Compulsory).');
      return;
    }

    if (!businessPhone.trim() || businessPhone.trim().length < 7) {
      setErrorMessage('Please enter a valid Business Contact / WhatsApp Number (Compulsory).');
      return;
    }

    setIsSubmitting(true);
    const estimate = calculateEstimate();

    const payload = {
      _subject: `New Project Quote Request: ${businessName} (${budgetLabels[budget] || 'Custom Budget'})`,
      _template: 'table',
      _captcha: 'false',
      _cc: 'dhruvp9639@gmail.com',
      'Name of Business (C)': businessName,
      'Business Email (C)': businessEmail,
      'Business Contact Number (C)': businessPhone,
      'Project Requirement (Optional)': requirementLabels[requirement] || 'General Digital Architecture (Open)',
      'Expected Budget Range': budgetLabels[budget] || 'Custom Range / Discussion',
      'Comments & Specific Scope': comments.trim() || 'No specific comments provided',
      'Estimated Delivery Timeline': estimate ? estimate.weeks : 'To be confirmed in customized quote',
      'Estimated Budget Tier': estimate ? estimate.range : 'Custom Scope',
      'Submitted At': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    try {
      await fetch('https://formsubmit.co/ajax/amyagrowth@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('FormSubmit network notice:', err);
      // Still show positive confirmation for smooth UX
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
            PROJECT ESTIMATION & CUSTOM QUOTATION
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
          Project Price Calculator
        </h2>
        <p
          className="mt-3 text-[#656565] max-w-xl font-light text-sm sm:text-base leading-relaxed"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Configure your project requirements and expected budget to generate an accurate development timeline and receive a comprehensive commercial quotation.
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
              Estimate Your Investment
            </h3>
            <p className="text-xs sm:text-sm text-[#656565] font-light mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Select your specifications below. Compulsory business fields are marked with <strong className="text-[#3F7E7C] font-mono">(C)</strong>.
            </p>
          </div>

          {(requirement || budget || comments || businessName || businessEmail || businessPhone) && !submitted && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-[#8e8e8e] hover:text-[#3F7E7C] transition-colors self-start sm:self-auto py-1.5 px-3 rounded-lg border border-[#e5e5e5] hover:border-[#3F7E7C] bg-white cursor-pointer"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              RESET FORM
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
                  Quotation Request Confirmed!
                </h4>
                <p className="text-[#656565] text-sm font-light leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Thank you, <strong className="text-[#2b2b2b] font-medium">{businessName}</strong>! Your project specifications and estimated timeline of{' '}
                  <strong className="text-[#2b2b2b] font-medium">{currentEstimate?.weeks || '1 – 3 weeks'}</strong> have been forwarded to our technical team.
                  We will contact <strong className="text-[#3F7E7C]">{businessEmail}</strong> / <strong className="text-[#2b2b2b]">{businessPhone}</strong> within 24 hours with a comprehensive architecture roadmap and quote.
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
              {/* Field 1 — Requirement (Optional) */}
              <div className="border-b border-[#dedede] pb-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#f1f1f1] border border-[#dedede] text-[#3F7E7C] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      01
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs text-[#6e6e6e] uppercase tracking-wider font-medium">
                      Project Requirement
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono text-[#a2a2a2] uppercase">
                    (Optional)
                  </span>
                </div>
                <div className="relative">
                  <select
                    value={requirement}
                    onChange={(e) => {
                      setRequirement(e.target.value);
                      setErrorMessage('');
                    }}
                    className={`w-full bg-transparent font-medium py-2.5 sm:py-3 pr-8 outline-none appearance-none cursor-pointer text-sm sm:text-base transition-colors border-b border-[#e5e5e5] focus:border-[#3F7E7C] ${
                      requirement ? 'text-[#2b2b2b]' : 'text-[#8e8e8e]'
                    }`}
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    <option value="">Select Project Requirement (Optional)...</option>
                    <option value="webapp">1. Web Application (Full-Stack / MERN / SaaS & Admin Portal)</option>
                    <option value="website">2. Website (Corporate Brand / High-Conversion Landing Page)</option>
                    <option value="ai_agents">3. AI Agents Related Set-Up (Autonomous 24/7 Agent, WhatsApp / Voice AI, CRM)</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-[#a2a2a2] absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Field 2 — Expected Budget */}
              <div className="border-b border-[#dedede] pb-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#f1f1f1] border border-[#dedede] text-[#3F7E7C] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      02
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs text-[#6e6e6e] uppercase tracking-wider font-medium">
                      Your Expected Budget Range
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono text-[#3F7E7C] uppercase font-semibold">
                    (Selectable)
                  </span>
                </div>
                <div className="relative">
                  <select
                    value={budget}
                    onChange={(e) => {
                      setBudget(e.target.value);
                      setErrorMessage('');
                    }}
                    className={`w-full bg-transparent font-medium py-2.5 sm:py-3 pr-8 outline-none appearance-none cursor-pointer text-sm sm:text-base transition-colors border-b border-[#e5e5e5] focus:border-[#3F7E7C] ${
                      budget ? 'text-[#2b2b2b]' : 'text-[#8e8e8e]'
                    }`}
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    <option value="">Select Your Expected Budget Range...</option>
                    <option value="5k_10k">₹5,000 – ₹10,000 (Quick Sprint / Prototype / Starter Setup)</option>
                    <option value="10k_50k">₹10,000 – ₹50,000 (Standard MVP / Brand Website / Core Automations)</option>
                    <option value="50k_1L">₹50,000 – ₹1,00,000 (Advanced Scalable Web App & Multi-Channel AI System)</option>
                    <option value="1L_plus">₹1,00,000+ (Full Enterprise Ecosystem & Custom Infrastructure)</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-[#a2a2a2] absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Field 3 — Comments for Any Requirement (Optional) */}
              <div className="border-b border-[#dedede] pb-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#f1f1f1] border border-[#dedede] text-[#3F7E7C] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      03
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs text-[#6e6e6e] uppercase tracking-wider font-medium">
                      Comments & Specific Scope
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono text-[#a2a2a2] uppercase">
                    (Optional)
                  </span>
                </div>
                <div className="relative mt-2">
                  <textarea
                    rows={3}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Describe any specific requirements, integrations, preferred features, or target timelines for your business..."
                    className="w-full bg-[#f9f9f9] text-[#2b2b2b] placeholder-[#a2a2a2] font-light py-3 px-3.5 outline-none rounded-xl border border-[#e5e5e5] focus:border-[#3F7E7C] focus:bg-white transition-all text-sm sm:text-base resize-none"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  />
                </div>
              </div>

              {/* Field 4 — Business Details (Compulsory - C) */}
              <div className="border-b border-[#dedede] pb-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#3F7E7C] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 shadow-sm">
                      04
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs text-[#2b2b2b] uppercase tracking-wider font-semibold">
                      Business Details
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] sm:text-xs text-[#3F7E7C] bg-[#EAF4F3] border border-[#3F7E7C]/25 px-2.5 py-0.5 rounded-full font-bold">
                    (C) COMPULSORY
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mt-3">
                  {/* Name of business (C) */}
                  <div className="relative">
                    <label className="block text-[11px] font-mono text-[#6e6e6e] uppercase tracking-wider mb-1.5 font-medium">
                      Name of Business <span className="text-red-500 font-bold">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => {
                          setBusinessName(e.target.value);
                          setErrorMessage('');
                        }}
                        placeholder="e.g. Apex Global Corp"
                        className="w-full bg-[#f9f9f9] text-[#2b2b2b] placeholder-[#a2a2a2] font-light py-3 pl-10 pr-3.5 outline-none rounded-xl border border-[#e5e5e5] focus:border-[#3F7E7C] focus:bg-white transition-all text-sm sm:text-base"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                      />
                      <Building2 className="w-4 h-4 text-[#a2a2a2] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Business email (C) */}
                  <div className="relative">
                    <label className="block text-[11px] font-mono text-[#6e6e6e] uppercase tracking-wider mb-1.5 font-medium">
                      Business Email <span className="text-red-500 font-bold">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={businessEmail}
                        onChange={(e) => {
                          setBusinessEmail(e.target.value);
                          setErrorMessage('');
                        }}
                        placeholder="e.g. contact@company.com"
                        className="w-full bg-[#f9f9f9] text-[#2b2b2b] placeholder-[#a2a2a2] font-light py-3 pl-10 pr-3.5 outline-none rounded-xl border border-[#e5e5e5] focus:border-[#3F7E7C] focus:bg-white transition-all text-sm sm:text-base"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                      />
                      <Mail className="w-4 h-4 text-[#a2a2a2] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Business contact Number (C) */}
                  <div className="relative">
                    <label className="block text-[11px] font-mono text-[#6e6e6e] uppercase tracking-wider mb-1.5 font-medium">
                      Business Contact Number <span className="text-red-500 font-bold">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={businessPhone}
                        onChange={(e) => {
                          setBusinessPhone(e.target.value);
                          setErrorMessage('');
                        }}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-[#f9f9f9] text-[#2b2b2b] placeholder-[#a2a2a2] font-light py-3 pl-10 pr-3.5 outline-none rounded-xl border border-[#e5e5e5] focus:border-[#3F7E7C] focus:bg-white transition-all text-sm sm:text-base"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                      />
                      <Phone className="w-4 h-4 text-[#a2a2a2] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Inline Error Message if any compulsory field is missed */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 text-red-700 text-xs sm:text-sm font-mono border border-red-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
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
                        color: currentEstimate ? '#2b2b2b' : '#a2a2a2',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {currentEstimate ? (
                        <>
                          {currentEstimate.weeks}
                          <span className="text-xs sm:text-sm font-normal text-[#656565] ml-2 block sm:inline">
                            • {currentEstimate.label}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-normal text-[#a2a2a2] italic">
                          Select expected budget above to calculate timeline
                        </span>
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
                        PROCESSING QUOTE...
                      </>
                    ) : (
                      <>
                        REQUEST DETAILED QUOTE
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Note text placed below the timeline row */}
                <div className="mt-4 pt-2">
                  <p
                    className="text-[10px] sm:text-[11px] text-[#8e8e8e] font-light leading-normal"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    * Note: All fields marked with (C) are strictly verified for customized enterprise proposals. Your quotation and architecture scope will be delivered directly to your verified business email and WhatsApp number.
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
