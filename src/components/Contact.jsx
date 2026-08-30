import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Plus, Minus, Instagram, Globe, Mail, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Custom Web App (Full-Stack / MERN)',
    budget: '$1k - $10k',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
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
    }, 4000);
  };

  const faqs = [
    {
      q: 'What is Amya Growth?',
      a: 'Amya Growth is an IT Agency delivering high-impact Web Development (Full-Stack / MERN) and AI Automation Services (WhatsApp, Email, Lead Management, and Auto Follow-up systems).',
    },
    {
      q: 'How does Amya Growth automate operations without extra staff?',
      a: 'By developing custom MERN web applications connected to autonomous WhatsApp AI agents, automated email funnels, and CRM pipelines, we eliminate repetitive manual work so your business runs 24/7 autonomously.',
    },
    {
      q: 'Is Amya Growth suitable for my business?',
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
              fontFamily: 'Space Grotesk, DM Serif Display, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.8rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: '#2b2b2b',
              marginTop: '1.25rem',
              fontWeight: 600,
              maxWidth: '18ch',
            }}
          >
            Grow 100x your<br /><em style={{ fontStyle: 'italic', fontFamily: 'DM Serif Display, serif', fontWeight: 400 }}>current business.</em>
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
                { label: 'Agency Website', value: 'www.amyagrowth.com', href: 'https://www.amyagrowth.com' },
                { label: 'Instagram', value: '@amya.growth', href: 'https://instagram.com/amya.growth' },
                { label: 'Email Inquiries', value: 'hello@amyagrowth.com', href: 'mailto:hello@amyagrowth.com' },
                { label: 'Target Clients', value: 'Startups • Legacy • Medium Businesses' },
              ].map((item, i) => (
                <div key={i} style={{ borderBottom: '1px solid #dedede', paddingBottom: '1.25rem' }}>
                  <div style={labelStyle}>{item.label}</div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-[#fc4778] transition-colors"
                      style={{
                        fontFamily: 'Space Grotesk, DM Sans, sans-serif',
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#2b2b2b',
                        marginTop: '0.375rem',
                      }}
                    >
                      {item.value}
                      <ArrowUpRight className="w-4 h-4 text-[#fc4778]" />
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
            className="lg:col-span-8"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center gap-4"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: '#fff0f4', color: '#fc4778' }}
                >
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3
                  style={{
                    fontFamily: 'Space Grotesk, DM Serif Display, serif',
                    fontSize: '2rem',
                    letterSpacing: '-0.03em',
                    color: '#2b2b2b',
                    fontWeight: 600,
                  }}
                >
                  Consultation Request Sent!
                </h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300, color: '#656565', maxWidth: '28rem' }}>
                  Thank you! The Amya Growth team will review your business details and schedule your free 100x growth consultation promptly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Field 1 — Name */}
                <div>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
                    <span style={{ ...labelStyle, color: '#2b2b2b' }}>1</span>
                    <span style={labelStyle}>YOUR NAME</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dhruv Patel"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderBottomColor = '#2b2b2b')}
                    onBlur={e => (e.target.style.borderBottomColor = '#dedede')}
                  />
                </div>

                {/* Field 2 — Email */}
                <div>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
                    <span style={{ ...labelStyle, color: '#2b2b2b' }}>2</span>
                    <span style={labelStyle}>WORK EMAIL</span>
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="dhruv@company.com"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderBottomColor = '#2b2b2b')}
                    onBlur={e => (e.target.style.borderBottomColor = '#dedede')}
                  />
                </div>

                {/* Field 3 — Service */}
                <div>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
                    <span style={{ ...labelStyle, color: '#2b2b2b' }}>3</span>
                    <span style={labelStyle}>REQUIRED SERVICE</span>
                  </div>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
                    onFocus={e => (e.target.style.borderBottomColor = '#2b2b2b')}
                    onBlur={e => (e.target.style.borderBottomColor = '#dedede')}
                  >
                    <option>Custom Web App (Full-Stack / MERN)</option>
                    <option>AI Business Automation (WhatsApp / Email)</option>
                    <option>Auto Follow-Up & CRM Systems</option>
                    <option>Admin Panel & SaaS Platform</option>
                    <option>AI Integration & Cloud Deployment</option>
                  </select>
                </div>

                {/* Field 4 — Budget */}
                <div>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
                    <span style={{ ...labelStyle, color: '#2b2b2b' }}>4</span>
                    <span style={labelStyle}>ESTIMATED BUDGET (₹ / $)</span>
                  </div>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
                    onFocus={e => (e.target.style.borderBottomColor = '#2b2b2b')}
                    onBlur={e => (e.target.style.borderBottomColor = '#dedede')}
                  >
                    <option>$1k - $10k (Custom Starter Web App / Automation)</option>
                    <option>$10k - $25k (Full-Stack Platform & Auto Workflows)</option>
                    <option>$25k - $50k (Enterprise AI Architecture)</option>
                    <option>$50k+ (Complete Digital Transformation)</option>
                  </select>
                </div>

                {/* Field 5 — Message */}
                <div>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
                    <span style={{ ...labelStyle, color: '#2b2b2b' }}>5</span>
                    <span style={labelStyle}>TELL US ABOUT YOUR BUSINESS GOALS</span>
                  </div>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what web application or AI automation you want to build..."
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => (e.target.style.borderBottomColor = '#2b2b2b')}
                    onBlur={e => (e.target.style.borderBottomColor = '#dedede')}
                  />
                </div>

                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    className="font-mono text-xs uppercase tracking-wider px-10 py-4 rounded-full bg-[#2b2b2b] text-white hover:bg-[#fc4778] transition-all duration-200 shadow-md"
                    style={{ fontFamily: 'Space Mono, monospace' }}
                  >
                    BOOK FREE CONSULTATION
                  </button>
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
                fontFamily: 'Space Grotesk, DM Serif Display, serif',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                letterSpacing: '-0.03em',
                color: '#2b2b2b',
                marginTop: '0.75rem',
                fontWeight: 600,
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
