import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Terminal } from 'lucide-react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shrink and shadow navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via Intersection Observer
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // focused viewport band for intersection mapping
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  const getLinkClass = (sectionId) => {
    return activeSection === sectionId ? 'active-link' : '';
  };

  const handleNavLinkClick = (e, targetHash) => {
    e.preventDefault();
    closeMenu();
    window.dispatchEvent(
      new CustomEvent('trigger-transition', {
        detail: {
          hash: targetHash,
          noOverlay: true
        }
      })
    );
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">

        {/* Logo */}
        <Link 
          to="/#hero" 
          className="logo" 
          onClick={(e) => handleNavLinkClick(e, '/#hero')}
        >
          <span>&lt;</span>M.Saem<span> /&gt;</span>
        </Link>

        {/* Nav Links */}
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li className="nav-item">
            <Link
              to="/#hero"
              className={getLinkClass('hero')}
              onClick={(e) => handleNavLinkClick(e, '/#hero')}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/#skills"
              className={getLinkClass('skills')}
              onClick={(e) => handleNavLinkClick(e, '/#skills')}
            >
              Skills
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/#projects"
              className={getLinkClass('projects')}
              onClick={(e) => handleNavLinkClick(e, '/#projects')}
            >
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/#contact"
              className={getLinkClass('contact')}
              onClick={(e) => handleNavLinkClick(e, '/#contact')}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle Button */}
        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>
    </nav>
  );
}
