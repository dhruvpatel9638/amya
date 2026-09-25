import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Plus, Minus, Instagram, Globe, Mail, ArrowUpRight, Loader2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Custom Web App (Full-Stack / MERN)',
    budget: '$1k - $10k',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('https://formsubmit.co/ajax/amyaagrowth@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Free Consultation Inquiry: ${formData.name || 'Client'} (${formData.service})`,
          _template: 'table',
          _captcha: 'false',
          _cc: 'dhruvp9639@gmail.com',
          'Client Name': formData.name,
          'Client Email': formData.email,
          'Interested Service': formData.service,
          'Budget Range': formData.budget,
          'Project Goals': formData.message || 'No additional details provided',
          'Submitted At': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        }),
      });
    } catch (err) {
      console.warn('Form submit notice:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          service: 'Custom Web App (Full-Stack / MERN)',
          budget: '$1k - $10k',
          message: '',
        });
      }, 5000);
    }
  };

  const faqs = [
    {
      q: 'What is Amyaa Growth?',
      a: 'Amyaa Growth is an IT Agency delivering high-impact Web Development (Full-Stack / MERN) and AI Automation Services (WhatsApp, Email, Lead Management, and Auto Follow-up systems).',
    },
    {
      q: 'How does Amyaa Growth automate operations without extra staff?',
      a: 'By developing custom MERN web applications connected to autonomous WhatsApp AI agents, automated email funnels, and CRM pipelines, we eliminate repetitive manual work so your business runs 24/7 autonomously.',
    },
    {
      q: 'Is Amyaa Growth suitable for my business?',
      a: 'Yes. We cater specifically to fast-growing startups, legacy businesses modernizing their manual workflows, and medium-scale enterprises looking to scale 100x.',
    },
    {
      q: 'What AI business automations can you build for us?',
      a: 'We build 24/7 WhatsApp AI lead qualification assistants, automated multi-stage email follow-up workflows, CRM auto-sync, auto appointment booking, and custom cloud-integrated dashboard systems.',
    },
  ];

  // Field styles
  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #dedede',
    padding: '0.875rem 0',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '1rem',
    fontWeight: 300,
    color: '#2b2b2b',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    fontFamily: 'Space Mono, monospace',
    fontSize: '0.65rem',
    textTransform: 'uppercase',
    color: '#a2a2a2',
    letterSpacing: 0,
  };

  return (
    <section id="contact" className="bg-[#f1f1f1] dot-grid" style={{ padding: '5rem 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 3rem)' }}>

        {/* Section header */}
        <div className="mb-20">
          <span style={labelStyle}>BOOK FREE CONSULTATION</span>
          <h2
            style={{
              fontFamily: 'DM Serif Display, Georgia, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.8rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: '#2b2b2b',
              marginTop: '1.25rem',
              fontWeight: 400,
              maxWidth: '18ch',
            }}
          >
            Grow 100x your<br /><em style={{ fontStyle: 'italic', fontWeight: 400 }}>current business.</em>
          </h2>
        </div>

        {/* Form + Contact info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-28">

          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-10"
          >
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '1rem',
                fontWeight: 300,
                color: '#656565',
                lineHeight: 1.6,
              }}
            >
              Ready to automate your operations and deploy high-converting creative web applications? Reach out to book your free strategy consultation.
            </p>

            <div className="space-y-6">
              {[
                { label: 'Instagram', value: '@amya.growth', href: 'https://instagram.com/amya.growth' },
                { label: 'Email Inquiries', value: 'amyaagrowth@gmail.com', href: 'mailto:amyaagrowth@gmail.com' },
                { label: 'Target Clients', value: 'Startups • Legacy • Medium Businesses' },
              ].map((item, i) => (
                <div key={i} style={{ borderBottom: '1px solid #dedede', paddingBottom: '1.25rem' }}>
                  <div style={labelStyle}>{item.label}</div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-[#3F7E7C] transition-colors"
                      style={{
                        fontFamily: 'Space Grotesk, DM Sans, sans-serif',
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#2b2b2b',
                        marginTop: '0.375rem',
                      }}
                    >
                      {item.value}
                      <ArrowUpRight className="w-4 h-4 text-[#3F7E7C]" />
                    </a>
                  ) : (
                    <div
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.9375rem',
                        fontWeight: 400,
                        color: '#2b2b2b',
                        marginTop: '0.375rem',
                      }}
                    >
                      {item.value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-[#1a1a1a] p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl border border-[#333]"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center gap-4"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(63, 126, 124, 0.2)', color: '#3F7E7C' }}
                >
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3
                  style={{
                    fontFamily: 'DM Serif Display, Georgia, serif',
                    fontSize: '2rem',
                    letterSpacing: '-0.02em',
                    color: '#ffffff',
                    fontWeight: 400,
                  }}
                >
                  Consultation Request Sent!
                </h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300, color: '#a2a2a2', maxWidth: '28rem' }}>
                  Thank you! The Amyaa Growth team will review your business details and schedule your free 100x growth consultation promptly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Field 1 — Name */}
                <div>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
                    <span style={{ ...labelStyle, color: '#ffffff' }}>1</span>
                    <span style={labelStyle}>YOUR NAME</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alexander Wright"
                    style={{ ...inputStyle, color: '#ffffff', borderBottomColor: '#444' }}
                    onFocus={e => (e.target.style.borderBottomColor = '#ffffff')}
                    onBlur={e => (e.target.style.borderBottomColor = '#444')}
                    className="placeholder:text-[#656565]"
                  />
                </div>

                {/* Field 2 — Email */}
                <div>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
                    <span style={{ ...labelStyle, color: '#ffffff' }}>2</span>
                    <span style={labelStyle}>WORK EMAIL</span>
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alexander@xyzenterprises.com"
                    style={{ ...inputStyle, color: '#ffffff', borderBottomColor: '#444' }}
                    onFocus={e => (e.target.style.borderBottomColor = '#ffffff')}
                    onBlur={e => (e.target.style.borderBottomColor = '#444')}
                    className="placeholder:text-[#656565]"
                  />
                </div>

                {/* Field 3 — Service */}
                <div>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
                    <span style={{ ...labelStyle, color: '#ffffff' }}>3</span>
                    <span style={labelStyle}>REQUIRED SERVICE</span>
                  </div>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{ ...inputStyle, color: '#ffffff', borderBottomColor: '#444', cursor: 'pointer', appearance: 'none' }}
                    onFocus={e => (e.target.style.borderBottomColor = '#ffffff')}
                    onBlur={e => (e.target.style.borderBottomColor = '#444')}
                  >
                    <option className="bg-[#1a1a1a] text-white">Custom Web App (Full-Stack / MERN)</option>
                    <option className="bg-[#1a1a1a] text-white">AI Business Automation (WhatsApp / Email)</option>
                    <option className="bg-[#1a1a1a] text-white">Auto Follow-Up & CRM Systems</option>
                    <option className="bg-[#1a1a1a] text-white">Admin Panel & SaaS Platform</option>
                    <option className="bg-[#1a1a1a] text-white">AI Integration & Cloud Deployment</option>
                  </select>
                </div>

                {/* Field 4 — Budget */}
                <div>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
                    <span style={{ ...labelStyle, color: '#ffffff' }}>4</span>
                    <span style={labelStyle}>ESTIMATED BUDGET (₹ / $)</span>
                  </div>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    style={{ ...inputStyle, color: '#ffffff', borderBottomColor: '#444', cursor: 'pointer', appearance: 'none' }}
                    onFocus={e => (e.target.style.borderBottomColor = '#ffffff')}
                    onBlur={e => (e.target.style.borderBottomColor = '#444')}
                  >
                    <option className="bg-[#1a1a1a] text-white">₹10,000 – ₹25,000 (Quick Sprint / Prototype / Starter Setup)</option>
                    <option className="bg-[#1a1a1a] text-white">₹25,000 – ₹50,000 (Standard MVP / Brand Website / Core Automations)</option>
                    <option className="bg-[#1a1a1a] text-white">₹50,000 – ₹1,00,000 (Advanced Scalable Web App & Multi-Channel AI System)</option>
                    <option className="bg-[#1a1a1a] text-white">₹1,00,000+ (Full Enterprise Ecosystem & Custom Infrastructure)</option>
                  </select>
                </div>

                {/* Field 5 — Message */}
                <div>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
                    <span style={{ ...labelStyle, color: '#ffffff' }}>5</span>
                    <span style={labelStyle}>TELL US ABOUT YOUR BUSINESS GOALS</span>
                  </div>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Acme Corp needs a custom full-stack web application with automated CRM & WhatsApp integration..."
                    style={{ ...inputStyle, color: '#ffffff', borderBottomColor: '#444', resize: 'none' }}
                    onFocus={e => (e.target.style.borderBottomColor = '#ffffff')}
                    onBlur={e => (e.target.style.borderBottomColor = '#444')}
                    className="placeholder:text-[#656565]"
                  />
                </div>

                {/* Submit button & Note */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="font-mono w-full sm:w-auto text-xs uppercase tracking-wider px-10 py-4 rounded-full bg-[#3F7E7C] text-white hover:bg-[#ffffff] hover:text-[#1a1a1a] transition-all duration-300 shadow-lg inline-flex justify-center items-center gap-2 cursor-pointer disabled:opacity-60 font-bold mb-4"
                    style={{ fontFamily: 'Space Mono, monospace' }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        SENDING...
                      </>
                    ) : (
                      'BOOK FREE CONSULTATION'
                    )}
                  </button>
                  <p
                    className="text-[10px] sm:text-[11px] text-[#656565] font-light leading-normal"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    * Your data is strictly confidential and used solely to communicate regarding your project requirements.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* FAQs */}
        <div>
          <div className="mb-12">
            <span style={labelStyle}>FREQUENTLY ASKED QUESTIONS</span>
            <h3
              style={{
                fontFamily: 'DM Serif Display, Georgia, serif',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                letterSpacing: '-0.02em',
                color: '#2b2b2b',
                marginTop: '0.75rem',
                fontWeight: 400,
              }}
            >
              Everything you need to know.
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white overflow-hidden transition-colors"
                style={{
                  borderRadius: '1.25rem',
                  border: '1px solid #dedede',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer bg-transparent border-none"
                >
                  <span
                    style={{
                      fontFamily: 'Space Grotesk, DM Sans, sans-serif',
                      fontSize: '1.125rem',
                      fontWeight: 500,
                      color: '#2b2b2b',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {faq.q}
                  </span>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-colors"
                    style={{ background: openFaq === i ? '#2b2b2b' : '#f1f1f1', color: openFaq === i ? '#fff' : '#2b2b2b' }}
                  >
                    {openFaq === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p
                        className="px-6 pb-6 pt-2"
                        style={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: '0.9375rem',
                          fontWeight: 300,
                          color: '#656565',
                          lineHeight: 1.6,
                        }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
