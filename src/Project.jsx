import React from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

const GithubIcon = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PROJECTS_DATA = [
  {
    title: 'Auth E-Commerce',
    subtitle: 'Secure Shopping Platform',
    desc: 'A modern e-commerce website featuring user registration, login authentication, secure session handling, product catalogs, shopping cart management, and interactive checkout. Built with HTML, CSS, JS, and React.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
    demoUrl: 'https://auth-commerce-demo.vercel.app/'
  },
  {
    title: 'Car Services',
    subtitle: 'Automotive Booking & Care Platform',
    desc: 'A premium, responsive website designed for automotive maintenance and car servicing. Features interactive booking scheduling, service details, pricing comparisons, and a modern customer dashboard.',
    tags: ['React', 'CSS', 'JavaScript', 'Responsive Design'],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop',
    demoUrl: 'https://cars-services-olive.vercel.app/'
  },
  {
    title: 'Project Title',
    subtitle: 'Interactive Web Platform',
    desc: 'A feature-rich web platform designed to solve real-world problems. Under development, click to see progress. (Placeholder project, customize it with your new project details).',
    tags: ['React', 'CSS', 'JavaScript', 'API Integration'],
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop',
    demoUrl: 'https://github.com/'
  }
];

export default function Project() {
  return (
    <section id="projects">
      <div className="container">

        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-subtitle">Showcase of Work</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {PROJECTS_DATA.map((proj, idx) => (
            <a
              key={idx}
              href={proj.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card reveal reveal-delay-${idx + 1}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {/* Image & Overlay */}
              <div className="project-img-wrapper">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="project-img"
                  onError={(e) => {
                    e.target.onerror = null; // Infinite loop rokne ke liye
                    e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop";
                  }}
                />
                <div className="project-overlay">
                  <div className="project-link-icon" title="Launch Live Demo">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>

              {/* Info Area */}
              <div className="project-info">
                {/* Tech Tags */}
                <div className="project-tags">
                  {proj.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="project-tag">{tag}</span>
                  ))}
                </div>

                <h3 className="project-title">{proj.title}</h3>
                <p className="project-desc">{proj.desc}</p>

                {/* Footer Buttons */}
                <div className="project-footer">
                  <span className="project-action-link" style={{ color: 'var(--color-text-muted)' }}>
                    {proj.subtitle}
                  </span>

                  <span className="project-action-link">
                    Live Demo
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>

            </a>
          ))}
        </div>

      </div>
    </section>
  );
}