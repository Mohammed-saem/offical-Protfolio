import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import Skills from './Skills';
import Project from './Project';
import Contact from './Contact';
import './App.css';

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
      // Small timeout ensures elements are fully rendered and positioned
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const yOffset = -80; // Offset matches navbar height
          const elementRect = element.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;

          window.scrollTo({
            top: absoluteElementTop + yOffset,
            behavior: 'smooth'
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Scroll to top if no hash is present
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [hash, pathname]);

  return null;
}

// Custom hook to trigger entrance animations as sections scroll into view
function useScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1, // Trigger reveal when 10% of element is in view
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
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

export default function App() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState('plane');

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
              const yOffset = -80;
              const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({
                top: y,
                behavior: 'smooth'
              });
              window.history.pushState(null, '', targetHash);
            }
          }
          if (!noOverlay) {
            setIsTransitioning(false);
          }
        }, noOverlay ? 0 : 50);

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
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
