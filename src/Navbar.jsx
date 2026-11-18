import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    if (location.pathname !== '/') return;

    let observer;


    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { root: null, rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );

      sections.forEach((section) => observer.observe(section));
    }, 700);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [location.pathname]);

  const closeMenu = () => setIsOpen(false);

  const getLinkClass = (sectionId) => {
    return location.pathname === '/' && activeSection === sectionId ? 'active-link' : '';
  };

  const handleNavLinkClick = (e, targetHash) => {
    e.preventDefault();
    closeMenu();
    if (location.pathname !== '/') {
      navigate(targetHash);
      return;
    }

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


        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>
    </nav>
  );
}