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
    title: 'Nova Commerce',
    subtitle: 'Headless E-Commerce Platform',
    desc: 'A premium React-based shopping platform featuring seamless cart functionality, Stripe payment gateway, and a headless GraphQL backend for rapid content delivery.',
    tags: ['React', 'GraphQL', 'Stripe', 'CSS Modules'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop&q=80',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com'
  },
  {
    title: 'Aether Analytics',
    subtitle: 'Real-Time Insights Dashboard',
    desc: 'An interactive analytics suite presenting live socket data feeds. Built with D3.js visualization charts, grid-based layouts, and responsive dark themes.',
    tags: ['React', 'D3.js', 'Socket.io', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com'
  },
  {
    title: 'Synthesis Engine',
    subtitle: 'AI Code Playground',
    desc: 'An AI-integrated playground environment that generates, runs, and documents React code snippets, leveraging real-time OpenAI text streaming.',
    tags: ['React', 'OpenAI API', 'Tailwind', 'Express'],
    image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=600&auto=format&fit=crop&q=80',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com'
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
            <div
              key={idx}
              className={`project-card reveal reveal-delay-${idx + 1}`}
            >
              {/* Image & Overlay */}
              <div className="project-img-wrapper">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="project-img"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=600&auto=format&fit=crop&q=80";
                  }}
                />
                <div className="project-overlay">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-icon"
                    title="View Source on GitHub"
                  >
                    <GithubIcon size={20} />
                  </a>
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-icon"
                    title="Launch Live Demo"
                  >
                    <ExternalLink size={20} />
                  </a>
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

                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action-link"
                  >
                    Live Demo
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
