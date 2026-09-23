import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, CheckCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PinkFlowCanvas from './PinkFlowCanvas';

gsap.registerPlugin(ScrollTrigger);

// ======= REAL CLIENT WORKS (with thumbnails) =======
const realWorks = [
  {
    id: 'w1',
    title: 'Prime Real Estate Marketplace',
    desc: 'High-conversion property web application with automated lead qualification, instant valuation AI, and virtual inquiry triage.',
    tag: 'REAL ESTATE AUTOMATION',
    thumb: '/real-estate-thumbnail.png',
    url: 'https://real-estate-silk-five.vercel.app/',
    weeks: '5 wks',
  },
  {
    id: 'w2',
    title: 'THRIVO Influencer & Viral Agency',
    desc: 'High-impact social media & influencer agency web platform with cinematic video hero, bold typography, and conversion funnels.',
    tag: 'VIRAL AGENCY WEB',
    thumb: '/viral-agency-thumbnail.png',
    url: 'https://agency-liart-six.vercel.app/',
    weeks: '3 wks',
  },
  {
    id: 'w3',
    title: 'AH Transport Logistics Platform',
    desc: 'Autonomous fleet motion UI & dispatch management system with real-time GPS telemetry and automated delivery routing.',
    tag: 'LOGISTICS AUTOMATION',
    thumb: '/media_1787573325188.png',
    url: 'https://ahtransport.vercel.app',
    weeks: '3 wks',
  },
];

// ======= REAL PROJECT DATA (Agentic AI & Repeated Tasks Automation) =======
const projects = [
  {
    id: 1,
    title: 'Nexus Multi-Agent Workflow Orchestrator',
    category: 'Agentic AI & Automation',
    tag: 'AGENTIC WORKFLOW AI',
    client: 'Nexus Enterprise Ops',
    desc: 'Multi-agent AI ecosystem executing repetitive business workflows — auto-qualifying leads, scheduling meetings, and syncing CRM records 24/7 without manual staff.',
    metric: '98% Repetitive Work Automated',
    tech: ['Autonomous Agents', 'LangGraph', 'Python AI', 'React Dashboard'],
    details: {
      challenge: 'High employee overhead and delays due to manual customer onboarding, repetitive data transfers across platforms, and missed follow-ups.',
      solution: 'Architected an autonomous multi-agent pipeline with role-specialized AI agents that handle lead scoring, WhatsApp/Email auto-conversations, and seamless two-way CRM database syncs.',
      deliverables: ['Agentic Workflow Engine', 'Real-time Execution Dashboard', 'CRM & WhatsApp AI Webhooks', 'Automated Fallback Handlers'],
    },
  },
  {
    id: 2,
    title: 'Aura 24/7 Voice & Chat Sales Agent',
    category: 'Autonomous AI Systems',
    tag: 'AI AGENTIC VOICE & CHAT',
    client: 'Aura Global Systems',
    desc: 'Conversational agentic voice and chat agent resolving client queries, auto-generating quotations, and finalizing bookings with sub-200ms audio latency.',
    metric: '12,000+ Hours Saved / Month',
    tech: ['Real-Time Voice AI', 'Next.js', 'WebAudio API', 'Agentic Logic'],
    details: {
      challenge: 'Eliminating round-the-clock employee shifts for incoming client sales calls and repetitive booking inquiries across international timezones.',
      solution: 'Engineered a conversational voice AI agent trained on domain knowledge bases with natural human cadence, instant dynamic pricing lookup, and automated CRM deal creation.',
      deliverables: ['Voice Agent Console', 'Speech Waveform UI', 'Automated Booking Engine', 'Analytics Dashboard'],
    },
  },
  {
    id: 3,
    title: 'Krypton Auto-Reconciliation & Invoice Agent',
    category: 'Automated Operations',
    tag: 'FINANCIAL AUTOMATION',
    client: 'Krypton Financial Corp',
    desc: 'Self-healing autonomous financial agent that ingests vendor invoices, auto-matches bank statements, detects discrepancies, and reconciles ERP records.',
    metric: '0 Human Errors / $40M+ Processed',
    tech: ['Agentic Vision OCR', 'Python AI', 'React', 'Enterprise ERP API'],
    details: {
      challenge: 'Finance teams spending 35+ hours weekly on tedious manual data entry, OCR scanning errors, and invoice-to-receipt matching.',
      solution: 'Built an intelligent agentic pipeline that autonomously extracts, validates, and cross-references invoice line items against purchase orders and bank feeds.',
      deliverables: ['Agentic Invoice Ingestion', 'Audit Trail Visualizer', 'ERP Sync Webhooks', 'Approval Rule Engine'],
    },
  },
  {
    id: 4,
    title: 'Solstice Auto-Fulfillment & Inventory Agent',
    category: 'Automated Operations',
    tag: 'E-COM AGENTIC PIPELINE',
    client: 'Solstice Retail Group',
    desc: 'Autonomous multi-channel e-commerce agent managing repeated supplier orders, stock replenishment, dynamic pricing rules, and cross-platform inventory sync.',
    metric: '100% Autonomous Inventory Cycle',
    tech: ['Agentic Workflow', 'Next.js', 'Shopify & Amazon API', 'Webhooks'],
    details: {
      challenge: 'Managing fast-moving stock across 5 digital sales channels leading to stockouts, manual supplier orders, and repetitive daily spreadsheets.',
      solution: 'Deployed an autonomous AI monitoring agent that predicts replenishment velocity, drafts and dispatches supplier purchase orders, and syncs multi-warehouse quantities in real time.',
      deliverables: ['Autonomous Inventory Agent', 'Multi-Warehouse Sync UI', 'Supplier Dispatch Automation'],
    },
  },
  {
    id: 5,
    title: 'CyberPulse B2B Cold Outreach & Lead Nurturing AI',
    category: 'Agentic AI & Automation',
    tag: 'SALES AGENTIC AI',
    client: 'CyberPulse Tech Labs',
    desc: 'Multi-stage B2B sales agent researching prospects, drafting context-aware hyper-personalized emails, handling objections, and booking calendar demos automatically.',
    metric: '4.2x More Qualified Meetings',
    tech: ['Autonomous LLM Agents', 'React', 'TypeScript', 'Email & Calendar API'],
    details: {
      challenge: 'SDR sales teams stuck doing manual LinkedIn/web research and repetitive email drafting with low conversion and inconsistent follow-ups.',
      solution: 'Built an autonomous research & outreach agent that scrapes company news, tailors value propositions per recipient, and autonomously manages email follow-up cadences.',
      deliverables: ['Autonomous Sales Pipeline', 'Prospect Enrichment Agent', 'Smart Reply Classifier'],
    },
  },
  {
    id: 6,
    title: 'CognitiveOps Self-Healing Server & DevOps Agent',
    category: 'Autonomous AI Systems',
    tag: 'DEVOPS AGENTIC AI',
    client: 'CognitiveOps Cloud',
    desc: 'Autonomous infrastructure agent monitoring server health, diagnosing error stack traces, rolling back failed deployments, and patching security vulnerabilities.',
    metric: '99.999% Autonomous Uptime',
    tech: ['AI Agent Runbooks', 'Python', 'React Ops UI', 'Docker & Kubernetes'],
    details: {
      challenge: 'DevOps engineers frequently awakened at odd hours for routine server restarts, log cleanups, and predictable traffic spike scaling.',
      solution: 'Implemented autonomous diagnostic agents executing predefined secure runbooks, analyzing telemetry anomalies, and auto-scaling resources instantly.',
      deliverables: ['Autonomous Ops Console', 'Self-Healing Rule Builder', 'Incident Response Agent'],
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
        — Founding Partner @Apex Global
      </p>
    </div>
  );
}


// ======= HORIZONTAL PROJECT PILL =======
function ProjectPill({ project, onClick }) {
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
            background: '#f1f1f1',
            color: '#656565',
            padding: '3px 8px',
            borderRadius: '9999px',
          }}
        >
          {weekMap[project.id]}
        </span>
        <ArrowUpRight
          className="w-4 h-4 text-[#a2a2a2] group-hover:text-[#3F7E7C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
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
                  color: '#3F7E7C',
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
                  <CheckCircle className="w-3 h-3 text-[#3F7E7C]" />
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDraggingTrack, setIsDraggingTrack] = useState(false);
  const [preventClick, setPreventClick] = useState(false);

  const triggerRef = useRef(null);
  const trackRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const stRef = useRef(null);

  const getScrollDistance = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const trackWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const offset = window.innerWidth < 768 ? 24 : 120;
    return -(trackWidth - viewportWidth + offset);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const trigger = triggerRef.current;
      if (!track || !trigger) return;

      const scrollTween = gsap.to(track, {
        x: getScrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: () => window.innerWidth < 768
            ? `+=${Math.max(track.scrollWidth - window.innerWidth + 300, 1200)}`
            : `+=${Math.max(track.scrollWidth - window.innerWidth + 800, 2000)}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });

      stRef.current = scrollTween.scrollTrigger;

      return () => {
        scrollTween.kill();
      };
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  // Compute exact scroll position for a specific slide index
  const getCardScrollPosition = (index) => {
    const st = stRef.current;
    const track = trackRef.current;
    if (!st || !track) return 0;

    const clampedIndex = Math.max(0, Math.min(index, realWorks.length - 1));
    const totalTravel = Math.abs(getScrollDistance());
    if (totalTravel === 0) return st.start;

    let targetProgress = 0;
    if (clampedIndex === 0) {
      targetProgress = 0;
    } else if (clampedIndex === realWorks.length - 1) {
      targetProgress = 1;
    } else if (track.children && track.children[clampedIndex] && track.children[0]) {
      const cardOffset = track.children[clampedIndex].offsetLeft - track.children[0].offsetLeft;
      targetProgress = Math.min(1, Math.max(0, cardOffset / totalTravel));
    } else {
      targetProgress = clampedIndex / (realWorks.length - 1);
    }

    return st.start + targetProgress * (st.end - st.start);
  };

  // Programmatically slide smoothly to target index using Lenis or native scroll
  const goToSlide = (index, duration = 0.8) => {
    const st = stRef.current;
    if (!st) return;

    const targetScroll = getCardScrollPosition(index);

    if (window.lenis) {
      window.lenis.scrollTo(targetScroll, {
        duration,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  const currentSlideIndex = Math.min(
    Math.max(Math.round(scrollProgress * (realWorks.length - 1)), 0),
    realWorks.length - 1
  );

  // Mobile horizontal swipe & drag handler (with non-blocking vertical scroll)
  useEffect(() => {
    const container = sliderContainerRef.current;
    if (!container) return;

    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let startTime = 0;
    let isHorizontal = null;
    let isDragging = false;

    const onTouchStart = (e) => {
      if (e.touches.length > 1) return;
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      lastX = touch.clientX;
      startTime = Date.now();
      isHorizontal = null;
      isDragging = false;
    };

    const onTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const totalDx = touch.clientX - startX;
      const totalDy = touch.clientY - startY;

      // Determine user intent: horizontal swipe vs vertical scroll
      if (isHorizontal === null) {
        if (Math.abs(totalDx) > 8 || Math.abs(totalDy) > 8) {
          isHorizontal = Math.abs(totalDx) > Math.abs(totalDy);
          if (isHorizontal) {
            isDragging = true;
            setIsDraggingTrack(true);
          }
        }
      }

      // If user is intentionally sliding horizontally
      if (isHorizontal) {
        if (e.cancelable) e.preventDefault();

        const diffX = touch.clientX - lastX;
        lastX = touch.clientX;

        const st = stRef.current;
        const track = trackRef.current;
        if (st && track) {
          const trackDistance = Math.abs(getScrollDistance());
          if (trackDistance > 0) {
            const pinDistance = st.end - st.start;
            const ratio = pinDistance / trackDistance;
            // Moving finger left (diffX < 0) advances scroll down
            const scrollDelta = -diffX * ratio;
            const currentScroll = st.scroll();
            const nextScroll = Math.max(st.start, Math.min(st.end, currentScroll + scrollDelta));

            if (window.lenis) {
              window.lenis.scrollTo(nextScroll, { immediate: true });
            } else {
              window.scrollTo({ top: nextScroll, behavior: 'instant' });
            }
            st.scroll(nextScroll);
            st.update();
          }
        }
      }
      // If isHorizontal === false, vertical scroll continues completely natively!
    };

    const onTouchEnd = () => {
      setIsDraggingTrack(false);

      if (isDragging) {
        setPreventClick(true);
        setTimeout(() => setPreventClick(false), 300);
      }

      if (isHorizontal) {
        const totalDx = lastX - startX;
        const duration = Date.now() - startTime;
        const velocity = totalDx / Math.max(duration, 1);

        const st = stRef.current;
        if (st) {
          const currentProg = st.progress;
          const currentCard = Math.min(
            Math.max(Math.round(currentProg * (realWorks.length - 1)), 0),
            realWorks.length - 1
          );

          // Fast flick or drag > 45px
          if (velocity < -0.25 || totalDx < -45) {
            // Swiped LEFT => go to next card
            if (currentCard < realWorks.length - 1) {
              goToSlide(currentCard + 1);
            } else {
              // At last card, continue past pin
              if (window.lenis) {
                window.lenis.scrollTo(st.end + 120, { duration: 0.8 });
              } else {
                window.scrollTo({ top: st.end + 120, behavior: 'smooth' });
              }
            }
          } else if (velocity > 0.25 || totalDx > 45) {
            // Swiped RIGHT => go to previous card
            if (currentCard > 0) {
              goToSlide(currentCard - 1);
            } else {
              // At first card, scroll before pin
              if (window.lenis) {
                window.lenis.scrollTo(st.start - 120, { duration: 0.8 });
              } else {
                window.scrollTo({ top: st.start - 120, behavior: 'smooth' });
              }
            }
          } else {
            // Small move: snap back to current card
            goToSlide(currentCard);
          }
        }
      }

      isHorizontal = null;
      isDragging = false;
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd, { passive: true });
    container.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

  // Desktop mouse drag support
  const mouseDragRef = useRef({ isDown: false, startX: 0, lastX: 0, startTime: 0, dragged: false });

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    mouseDragRef.current = {
      isDown: true,
      startX: e.clientX,
      lastX: e.clientX,
      startTime: Date.now(),
      dragged: false,
    };
  };

  const handleMouseMove = (e) => {
    if (!mouseDragRef.current.isDown) return;
    const totalDx = e.clientX - mouseDragRef.current.startX;
    if (Math.abs(totalDx) > 6) {
      mouseDragRef.current.dragged = true;
      setIsDraggingTrack(true);
      setPreventClick(true);
    }
    if (mouseDragRef.current.dragged) {
      const diffX = e.clientX - mouseDragRef.current.lastX;
      mouseDragRef.current.lastX = e.clientX;

      const st = stRef.current;
      const track = trackRef.current;
      if (st && track) {
        const trackDistance = Math.abs(getScrollDistance());
        if (trackDistance > 0) {
          const pinDistance = st.end - st.start;
          const ratio = pinDistance / trackDistance;
          const scrollDelta = -diffX * ratio;
          const currentScroll = st.scroll();
          const nextScroll = Math.max(st.start, Math.min(st.end, currentScroll + scrollDelta));

          if (window.lenis) {
            window.lenis.scrollTo(nextScroll, { immediate: true });
          } else {
            window.scrollTo({ top: nextScroll, behavior: 'instant' });
          }
          st.scroll(nextScroll);
          st.update();
        }
      }
    }
  };

  const handleMouseUp = () => {
    if (!mouseDragRef.current.isDown) return;
    mouseDragRef.current.isDown = false;
    setIsDraggingTrack(false);

    if (mouseDragRef.current.dragged) {
      const totalDx = mouseDragRef.current.lastX - mouseDragRef.current.startX;
      const duration = Date.now() - mouseDragRef.current.startTime;
      const velocity = totalDx / Math.max(duration, 1);

      const st = stRef.current;
      if (st) {
        const currentProg = st.progress;
        const currentCard = Math.min(
          Math.max(Math.round(currentProg * (realWorks.length - 1)), 0),
          realWorks.length - 1
        );

        if (velocity < -0.2 || totalDx < -45) {
          if (currentCard < realWorks.length - 1) goToSlide(currentCard + 1);
        } else if (velocity > 0.2 || totalDx > 45) {
          if (currentCard > 0) goToSlide(currentCard - 1);
        } else {
          goToSlide(currentCard);
        }
      }
      setTimeout(() => setPreventClick(false), 250);
    }
  };

  const handleContact = () => {
    setSelectedProject(null);
    onNavigate('contact');
  };

  return (
    <section id="portfolio" className="bg-[#f1f1f1] dot-grid relative overflow-x-clip">
      {/* Pinned Horizontal Scroll Viewport */}
      <div
        ref={triggerRef}
        className="w-full min-h-screen flex flex-col justify-center overflow-hidden py-10 md:py-16 relative"
      >
        {/* Section Header & Progress Indicator */}
        <div className="w-full max-w-[1360px] mx-auto px-6 md:px-12 mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#3F7E7C] animate-pulse" />
              <span
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.75rem',
                  color: '#a2a2a2',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Selected Works · Live Platforms
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'DM Serif Display, serif',
                fontSize: 'clamp(2.1rem, 3.8vw, 3.4rem)',
                color: '#2b2b2b',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              Engineered for Growth.
            </h2>
          </div>

          {/* Creative Interactive Slidebar & Navigation Controls */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Creative Slidebar Track with Glowing Progress & Scrub Thumb */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                const progress = clickX / rect.width;
                const st = stRef.current;
                if (st) {
                  const targetScroll = st.start + progress * (st.end - st.start);
                  if (window.lenis) {
                    window.lenis.scrollTo(targetScroll, { duration: 0.7 });
                  } else {
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                  }
                }
              }}
              title="Click or drag to slide"
              className="relative w-44 sm:w-56 md:w-64 h-9 rounded-full bg-white/95 backdrop-blur-md border border-[#dedede] hover:border-[#3F7E7C]/60 p-1 flex items-center cursor-pointer shadow-xs transition-colors group select-none"
            >
              {/* Soft Segment Markers (indicating project positions without numbers) */}
              <div className="absolute inset-x-3 inset-y-0 flex items-center justify-between pointer-events-none z-0">
                {realWorks.map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      currentSlideIndex === i ? 'bg-[#3F7E7C] scale-125' : 'bg-[#dedede]'
                    }`}
                  />
                ))}
              </div>

              {/* Glowing Active Track Fill */}
              <div
                className="absolute left-1 top-1 bottom-1 rounded-full bg-gradient-to-r from-[#3F7E7C]/20 to-[#3F7E7C]/40 transition-all duration-75 pointer-events-none"
                style={{ width: `${Math.max(scrollProgress * 100, 18)}%` }}
              />

              {/* Creative Floating Scrub Thumb */}
              <div
                className="relative z-10 h-7 px-3.5 rounded-full bg-[#2b2b2b] group-hover:bg-[#3F7E7C] text-white flex items-center justify-center gap-1.5 shadow-sm transition-all duration-100 will-change-transform"
                style={{
                  transform: `translateX(${Math.max(0, scrollProgress * (window.innerWidth < 640 ? 120 : 180))}px)`,
                }}
              >
                {/* 3 Minimal Tactile Grip Bars */}
                <div className="flex items-center gap-0.5">
                  <span className="w-0.5 h-2.5 rounded-full bg-white/70" />
                  <span className="w-0.5 h-2.5 rounded-full bg-white" />
                  <span className="w-0.5 h-2.5 rounded-full bg-white/70" />
                </div>
              </div>
            </div>

            {/* Prev / Next Slide Arrow Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => goToSlide(currentSlideIndex - 1)}
                disabled={currentSlideIndex === 0}
                aria-label="Previous work slide"
                className="w-9 h-9 rounded-full border border-[#dedede] bg-white flex items-center justify-center text-[#2b2b2b] hover:border-[#3F7E7C] hover:bg-[#3F7E7C] hover:text-white disabled:opacity-25 disabled:pointer-events-none transition-all shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => goToSlide(currentSlideIndex + 1)}
                disabled={currentSlideIndex === realWorks.length - 1}
                aria-label="Next work slide"
                className="w-9 h-9 rounded-full border border-[#dedede] bg-white flex items-center justify-center text-[#2b2b2b] hover:border-[#3F7E7C] hover:bg-[#3F7E7C] hover:text-white disabled:opacity-25 disabled:pointer-events-none transition-all shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Micro Instruction Tag */}
            <div className="hidden sm:flex items-center gap-1.5 font-mono text-[9px] text-[#8e8e8e] uppercase tracking-wider pl-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3F7E7C] animate-pulse" />
              <span>SLIDE OR SCROLL</span>
            </div>
          </div>
        </div>

        {/* Horizontal Card Track (Slides smoothly horizontally via swipe, drag, or vertical scroll) */}
        <div
          ref={sliderContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`w-full overflow-visible select-none ${isDraggingTrack ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ touchAction: 'pan-y' }}
        >
          <div
            ref={trackRef}
            className="flex items-stretch gap-6 md:gap-10 pl-6 md:pl-12 pr-12 md:pr-24 will-change-transform"
            style={{ width: 'max-content' }}
          >
            {realWorks.map((work) => (
              <div
                key={work.id}
                className="w-[84vw] sm:w-[480px] md:w-[580px] lg:w-[640px] flex-shrink-0 group"
              >
                {/* Thumbnail card (clickable in current tab) */}
                <a
                  href={work.url || '#'}
                  onClick={(e) => {
                    if (preventClick) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  className="relative block overflow-hidden mb-4 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                  style={{ borderRadius: '1.5rem', aspectRatio: '16/10', background: '#dedede' }}
                >
                  <img
                    src={work.thumb}
                    alt={work.title}
                    draggable={false}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                  />
                  {/* Overlay on hover */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(43,43,43,0.45)' }}
                  >
                    {work.url ? (
                      <span
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#2b2b2b] group-hover:bg-[#3F7E7C] group-hover:text-white transition-all shadow-md"
                        style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.75rem', textTransform: 'uppercase', textDecoration: 'none' }}
                      >
                        VIEW LIVE <ArrowUpRight className="w-4 h-4" />
                      </span>
                    ) : (
                      <span
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#2b2b2b]"
                        style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.75rem', textTransform: 'uppercase' }}
                      >
                        VIEW PROJECT
                      </span>
                    )}
                  </div>
                </a>

                {/* Card info below thumbnail */}
                <div className="flex items-start justify-between gap-4 px-1">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        style={{
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '0.6875rem',
                          textTransform: 'uppercase',
                          color: '#3F7E7C',
                          fontWeight: 600,
                        }}
                      >
                        {work.tag}
                      </span>
                      <span style={{ color: '#dedede' }}>·</span>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.6875rem', color: '#a2a2a2' }}>{work.weeks}</span>
                    </div>
                    <h3
                      style={{
                        fontFamily: 'DM Serif Display, serif',
                        fontSize: '1.35rem',
                        letterSpacing: '-0.03em',
                        color: '#2b2b2b',
                        lineHeight: 1.15,
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
                        lineHeight: 1.45,
                      }}
                    >
                      {work.desc}
                    </p>
                  </div>

                  {work.url && (
                    <a
                      href={work.url}
                      onClick={(e) => {
                        if (preventClick) {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                      className="flex-shrink-0 w-10 h-10 rounded-full border border-[#dedede] bg-white flex items-center justify-center text-[#a2a2a2] hover:text-white hover:bg-[#3F7E7C] hover:border-[#3F7E7C] transition-all shadow-sm"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bento Grid & Case Studies Section */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem clamp(1rem, 4vw, 3rem) 5rem' }}>
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
                  <ArrowUpRight className="w-4 h-4 text-[#a2a2a2] group-hover:text-[#3F7E7C] flex-shrink-0 transition-colors" />
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
