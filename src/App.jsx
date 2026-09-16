import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import USPSection from './components/USPSection';
import About from './components/About';
import Portfolio from './components/Portfolio';
import PricingCalculator from './components/PricingCalculator';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis with gentle, fluid smooth scrolling inertia
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const handleScroll = (e) => {
      const sections = ['hero', 'about', 'portfolio', 'pricing', 'contact'];
      const scrollPosition = (e?.scroll ?? window.scrollY) + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    lenis.on('scroll', handleScroll);

    return () => {
      lenis.off('scroll', handleScroll);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  const handleNavigate = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element, {
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f1f1f1] text-[#2b2b2b] font-sans overflow-x-hidden">
      <CustomCursor />
      <Navbar activeSection={activeSection} setActiveSection={handleNavigate} />

      <main>
        <USPSection onNavigate={handleNavigate} />
        <Portfolio onNavigate={handleNavigate} />
        <About onNavigate={handleNavigate} />
        <div id="pricing">
          <PricingCalculator onNavigate={handleNavigate} />
        </div>
        <Contact />
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
