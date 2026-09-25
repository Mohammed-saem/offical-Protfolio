import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import Skills from './Skills';
import Project from './Project';
import Contact from './Contact';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Full Screen Transition Manager
function TransitionManager({ isTransitioning, transitionType }) {
  if (transitionType === 'shutter-close') {
    return (
      <div className={`shards-overlay ${isTransitioning ? 'active' : ''}`}>
        <div className="shard-row"></div>
        <div className="shard-row"></div>
        <div className="shard-row"></div>
        <div className="shard-row"></div>
      </div>
    );
  }

  return (
    <div className={`transition-overlay ${isTransitioning ? 'active' : ''}`}>
      <div className="loader-wrapper">
        {/* Glowing Paper Airplane SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="paper-plane-svg"
        >
          <path d="M22 2 11 13" />
          <path d="M22 2 15 22 11 13 2 9z" />
        </svg>

        {/* 2-Second Progress Bar Loader */}
        <div className="loader-progress-container">
          <div className="loader-progress-bar"></div>
        </div>
      </div>
      <div className="loader-caption">Launching Module...</div>
    </div>
  );
}
// ScrollToHash handles clicking hash links and page loading with a hash
function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        if (window.lenis) {
          window.lenis.scrollTo(hash, { offset: -80, duration: 1.2 });
        } else {
          const element = document.querySelector(hash);
          if (element) {
            const yOffset = -80;
            const elementRect = element.getBoundingClientRect();
            const absoluteElementTop = elementRect.top + window.pageYOffset;
            window.scrollTo({
              top: absoluteElementTop + yOffset,
              behavior: 'smooth'
            });
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  }, [hash, pathname]);

  return null;
}

// Custom hook to trigger staggered entrance reveals as sections scroll into view
function useScrollReveal() {
  useEffect(() => {
    // Find all sections or root containers that contain reveals
    const sections = document.querySelectorAll('section, footer, #hero');

    sections.forEach((section) => {
      const elements = section.querySelectorAll('.reveal');
      if (!elements.length) return;

      // Stagger reveal animations inside each section using GSAP ScrollTrigger
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%', // Reveal when section top is 80% down the viewport
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}

function HomePage() {
  useScrollReveal();

  return (
    <>
      <Hero />
      <Skills />
      <Project />
      <Contact />
    </>
  );
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 40
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    filter: 'blur(8px)',
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1]
    }
  }
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <HomePage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState('plane');

  // Initialize Lenis Smooth Scroll globally
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
    });

    window.lenis = lenis;

    // Connect GSAP ScrollTrigger to update with Lenis scroll ticks
    lenis.on('scroll', ScrollTrigger.update);

    const rafHandler = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafHandler);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafHandler);
      window.lenis = null;
    };
  }, []);

  useEffect(() => {
    const handleTrigger = (e) => {
      const detail = e.detail;
      const noOverlay = typeof detail === 'object' && detail.noOverlay;
      const type = typeof detail === 'object' && detail.transitionType ? detail.transitionType : 'plane';
      
      setTransitionType(type);

      if (!noOverlay) {
        setIsTransitioning(true);
      }

      const duration = typeof detail === 'object' && detail.duration ? detail.duration : (noOverlay ? 0 : 2000);
      const targetHash = typeof detail === 'string' ? detail : (detail.hash || '');
      const action = typeof detail === 'object' ? detail.action : null;

      const timer = setTimeout(() => {
        if (action) {
          action();
        }

        // Secondary timeout tick to let React/browser restore scroll heights before calculation
        const scrollTimer = setTimeout(() => {
          if (targetHash) {
            const elementId = targetHash.replace(/^\/?#/, '');
            const el = document.getElementById(elementId);
            if (el) {
              if (window.lenis) {
                window.lenis.scrollTo(el, { offset: -80, duration: 1.2 });
              } else {
                const yOffset = -80;
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({
                  top: y,
                  behavior: 'smooth'
                });
              }
              window.history.pushState(null, '', targetHash);
            }
          }
          if (!noOverlay) {
            setIsTransitioning(false);
          }
        }, noOverlay ? (action ? 80 : 0) : 50);

        return () => clearTimeout(scrollTimer);
      }, duration);

      return () => clearTimeout(timer);
    };

    window.addEventListener('trigger-transition', handleTrigger);
    return () => window.removeEventListener('trigger-transition', handleTrigger);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToHash />
      <Navbar />
      <TransitionManager isTransitioning={isTransitioning} transitionType={transitionType} />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
