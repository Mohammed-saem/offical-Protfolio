import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Terminal } from 'lucide-react';

const ROLES = [
  'Full Stack Web Developer',
  'MERN Stack Developer',
  'React JS Developer',
  'Node.js Developer'
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in-active');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('fade-out-active');

      const timer = setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setFadeClass('fade-in-active');
      }, 300);

      return () => clearTimeout(timer);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero">
      <div className="bg-blob bg-blob-1"></div>
      <div className="bg-blob bg-blob-2"></div>

      <div className="container">
        <div className="hero-wrapper">

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
  I'm a Full Stack Web Developer specializing in the MERN stack. I build fast, responsive web applications with React on the frontend and Node.js, Express and MongoDB on the backend, from the user interface to the database.
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

          <div className="hero-image-area reveal reveal-delay-2">
            <div className="profile-frame">
              <div className="ring-deco"></div>
              <div className="profile-monogram">
                <span className="gradient-text">MS</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}