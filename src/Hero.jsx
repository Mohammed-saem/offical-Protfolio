import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Terminal } from 'lucide-react';
import profileImg from './assets/profile.webp';

const ROLES = [
  'Frontend Developer',
  'UI/UX Enthusiast',
  'React JS Developer',
  'Creative Web Engineer'
];

export default function Hero() { 
  const [roleIndex, setRoleIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in-active');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('fade-out-active');

      // Wait for fade out animation to finish before updating role content
      const timer = setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setFadeClass('fade-in-active');
      }, 300);

      return () => clearTimeout(timer);
    }, 2000); // rotates every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero">
      {/* Background shapes */}
      <div className="bg-blob bg-blob-1"></div>
      <div className="bg-blob bg-blob-2"></div>

      <div className="container">
        <div className="hero-wrapper">

          {/* Hero Left Content */}
          <div className="hero-content reveal">
            <div className="hero-tagline animate-fade-in">
              <Terminal size={14} style={{ marginRight: '6px', verticalAlign: 'middle', display: 'inline-block' }} />
              Available for Freelance & Full-time
            </div>

            <h1 className="hero-title reveal-delay-1">
              Hi, I'm <span className="gradient-text">Mohammed
                Saem</span><br />
              <span className={`role-text-switch ${fadeClass}`}>
                {ROLES[roleIndex]}
              </span>
            </h1>

            <p className="hero-desc reveal-delay-2">
              I'm a creative developer specializing in building premium, high-performance web applications using React. I bridge the gap between stunning visual design and clean, interactive frontend engineering.
            </p>

            <div className="hero-actions reveal-delay-3">
              <Link
                to="/#projects"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('trigger-transition', { detail: '/#projects' }));
                }}
                className="glow-btn glow-btn-primary"
              >
                View My Projects
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('trigger-transition', { detail: '/#contact' }));
                }}
                className="glow-btn glow-btn-secondary"
              >
                Let's Talk
                <MessageSquare size={16} />
              </Link>
            </div>
          </div>

          {/* Hero Right Image */}
          <div className="hero-image-area reveal reveal-delay-2">
            <div className="profile-frame">
              <div className="ring-deco"></div>
              <img
                src={profileImg}
                alt="Alex Carter Profile"
                className="profile-image"
                onError={(e) => {
                  // Fallback to high quality avatar icon if image fails to load
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80";
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
