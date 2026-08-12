import React, { useState, useEffect } from 'react';
import { Layout, Cpu, Server, ArrowLeft, Terminal, Check } from 'lucide-react';

/* --- Beautiful Inline Brand SVGs (Compact sizes for 180px dials) --- */
const ReactIcon = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" width="20" height="20" style={{ filter: 'drop-shadow(0 0 6px #61dafb)' }}>
    <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const JSIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" style={{ filter: 'drop-shadow(0 0 6px #f7df1e)' }}>
    <rect width="24" height="24" rx="4" fill="#f7df1e" />
    <path d="M12 18h2.5c1.5 0 2.5-1 2.5-2.5V11H15v4.5H12V18zm-5-3h4v-1.5H7V12h4v-1.5H7V9h5.5v9H7v-3z" fill="#000000" />
  </svg>
);

const TSIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" style={{ filter: 'drop-shadow(0 0 6px #3178c6)' }}>
    <rect width="24" height="24" rx="4" fill="#3178c6" />
    <path d="M15.5 10.5h-3V18H11v-7.5H8V9h7.5v1.5zM16.5 15h2c0 .8.6 1.3 1.5 1.3.8 0 1.2-.4 1.2-.9s-.3-.7-.9-.9l-1-.3c-1.3-.3-2.1-1-2.1-2.2 0-1.5 1.2-2.3 2.8-2.3s2.7.8 2.7 2.3h-2c0-.7-.5-1.1-1.2-1.1s-1 .3-1 .8c0 .4.3.6.9.8l1 .3c1.3.3 2.1 1 2.1 2.3 0 1.5-1.2 2.5-3 2.5s-3-1-3-2.7z" fill="#ffffff" />
  </svg>
);

const HTMLIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" style={{ filter: 'drop-shadow(0 0 6px #e34f26)' }}>
    <path d="M2 2h20l-2 18-8 3-8-3L2 2zm13.7 8H9.3l-.2-2h6.8l-.2-2H7l.6 6h6l-.4 3.5-3.2 1-3.2-1-.2-2.2H4.6l.4 4.2 5 1.8 5-1.8.6-6.3z" fill="#e34f26" />
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" style={{ filter: 'drop-shadow(0 0 6px #06b6d4)' }}>
    <path d="M12 .587l3.668 5.568 5.618.818-4.062 3.96 1.036 5.599L12 13.91l-5.26 2.622 1.036-5.599-4.062-3.96 5.618-.818L12 .587z" fill="#06b6d4" />
  </svg>
);

const NodeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" style={{ filter: 'drop-shadow(0 0 6px #3c873a)' }}>
    <path d="M12 2L2.5 7.5v11L12 22l9.5-5.5v-11L12 2zm0 2.5l7.5 4.3v8.4L12 19.5l-7.5-4.3v-8.4L12 4.5zm-2.5 5.5v3.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5V10h2v3.5c0 1.9-1.6 3.5-3.5 3.5s-3.5-1.6-3.5-3.5V10h2z" fill="#3c873a" />
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#f05032" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 6px #f05032)' }}>
    <circle cx="12" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <circle cx="18" cy="6" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
    <path d="M6 9v3a3 3 0 0 0 3 3h3" />
  </svg>
);

const FigmaIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" style={{ filter: 'drop-shadow(0 0 6px #a259ff)' }}>
    <path d="M12 2a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4zm-4 8a4 4 0 0 0 4 4 4 4 0 0 0 4-4v4a4 4 0 0 0-4 4 4 4 0 0 0-4-4zm0 8a4 4 0 0 0 4 4v-4a4 4 0 0 0-4-4 4 4 0 0 0 0 4zm0-8a4 4 0 0 0-4-4 4 4 0 0 0 4 4V10zm8 0a4 4 0 0 0 4-4 4 4 0 0 0-4 4v-4z" fill="#a259ff" />
  </svg>
);

const MongoIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" style={{ filter: 'drop-shadow(0 0 6px #47a248)' }}>
    <path d="M12 2c-.3 0-5.7 6.1-5.7 10.3 0 3.3 2.6 6 5.7 6s5.7-2.7 5.7-6C17.7 8.1 12.3 2 12 2zm0 16.3c-2.3 0-4.2-1.9-4.2-4.3 0-3.3 3.9-8.3 4.2-8.3s4.2 5 4.2 8.3c0 2.4-1.9 4.3-4.2 4.3z" fill="#47a248" />
  </svg>
);

const SKILLS_DATA = [
  {
    id: 'frontend',
    category: 'Frontend Development',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="M6 14h.01M10 14h.01M14 14h.01M18 14h.01" />
      </svg>
    ),
    desc: 'Engineering interactive, responsive, and pixel-perfect layouts using modern React patterns, state managers, and semantic styles.',
    illustrations: [<ReactIcon />, <JSIcon />, <TSIcon />, <HTMLIcon />, <TailwindIcon />],
    skills: [
      { name: 'React (Hooks)', desc: 'Advanced state orchestration and component optimization.', level: 85, icon: <ReactIcon /> },
      { name: 'JS', desc: 'Strict typing structures and functional programming paradigms.', level: 85, icon: <JSIcon /> },
      { name: 'HTML & CSS', desc: 'Fluid grids, flexbox layouts, and browser-compliant schemas.', level: 95, icon: <HTMLIcon /> },
      { name: 'Inline CSS & Tailwind CSS', desc: 'Rapid prototyping and utility-first responsive layout builds.', level: 85, icon: <TailwindIcon /> }
    ],
    features: [
      'Declarative state UI rendering',
      'Webpack & Vite bundle optimization',
      'Clean responsive component architectures',
      'Accessible, browser-compliant DOM structures'
    ]
  },
  {
    id: 'tools',
    category: 'Tools & Ecosystem',
    icon: <Cpu size={22} />,
    desc: 'Orchestrating robust source control, package management, asset optimization, and Figma-to-code design pipeline handoffs.',
    illustrations: [<GitIcon />, <FigmaIcon />, <JSIcon />],
    skills: [
      { name: 'Vite configs', desc: 'Asset splitting, module resolution, and server tuning.', level: 85, icon: <Cpu size={16} /> },
      { name: 'Git versioning', desc: 'Conflict resolution, rebase sequences, and branch controls.', level: 90, icon: <GitIcon /> },
      { name: 'Figma templates', desc: 'Reading vector nodes, grids, layouts, and spacing presets.', level: 80, icon: <FigmaIcon /> },
      { name: 'Responsive views', desc: 'Responsive view grids, testing, and touch interfaces.', level: 95, icon: <Layout size={16} /> }
    ],
    features: [
      'Trunk-based branch architectures',
      'Figma wireframe to code accuracy',
      'Fast client bundling build trees',
      'Lighthouse performance enhancements'
    ]
  },
  {
    id: 'backend',
    category: 'Backend & Services',
    icon: <Server size={22} />,
    desc: 'Developing scalable server scripts, clean RESTful schemas, GraphQL data layers, and database queries.',
    illustrations: [<NodeIcon />, <MongoIcon />, <TSIcon />],
    skills: [
      { name: 'Node.js & Express', desc: 'Middleware layers, routing logic, and error handlers.', level: 75, icon: <NodeIcon /> },
      { name: 'RESTful API logic', desc: 'Resource pathing, status maps, and request queries.', level: 85, icon: <Server size={16} /> },
      { name: 'MongoDB databases', desc: 'Document schemas, connections, and basic aggregates.', level: 70, icon: <MongoIcon /> },
      { name: 'Headless CMS grids', desc: 'GraphQL querying, webhooks integration, and content feeds.', level: 75, icon: <Terminal size={16} /> }
    ],
    features: [
      'Modular Express routing middleware',
      'Asynchronous query handling pipelines',
      'Schema validations and JSON validation rules',
      'GraphQL query tree requests'
    ]
  }
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  // Prevent main page scrolling while detail overlay is active
  useEffect(() => {
    if (activeCategory) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
    };
  }, [activeCategory]);

  // Reset activeCategory if a global transition is fired without an internal card action
  useEffect(() => {
    const handleGlobalTransition = (e) => {
      const detail = e.detail;
      const targetHash = typeof detail === 'string' ? detail : (detail.hash || '');
      if (targetHash && !detail.action) {
        setActiveCategory(null);
      }
    };
    window.addEventListener('trigger-transition', handleGlobalTransition);
    return () => window.removeEventListener('trigger-transition', handleGlobalTransition);
  }, []);

  const handleCardClick = (catId) => {
    window.dispatchEvent(
      new CustomEvent('trigger-transition', {
        detail: {
          action: () => setActiveCategory(catId),
          duration: 2000
        }
      })
    );
  };

  const handleCloseDetail = () => {
    setIsClosing(true);
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('trigger-transition', {
          detail: {
            action: () => {
              setActiveCategory(null);
              setIsClosing(false);
            },
            duration: 0,
            noOverlay: true,
            hash: '#skills'
          }
        })
      );
    }, 600); // 600ms matches exit transition in CSS
  };

  const selectedCategory = SKILLS_DATA.find((c) => c.id === activeCategory);

  return (
    <section id="skills">
      <div className="container">

        {/* Header (Always Visible) */}
        <div className="section-header reveal">
          <span className="section-subtitle">What I am good at</span>
          <h2 className="section-title">My Technical Expertise</h2>
        </div>

        {/* Skills Grid (Always mounted to protect scroll-reveal active state) */}
        <div className="skills-grid">
          {SKILLS_DATA.map((cat, idx) => (
            <div
              key={cat.id}
              className={`skills-category-card reveal reveal-delay-${idx + 1}`}
              onClick={() => handleCardClick(cat.id)}
            >
              <div className="card-header-area">
                <div className="card-icon-circle">
                  {cat.icon}
                </div>
                <h3 className="card-title-text">{cat.category}</h3>
              </div>

              <p className="card-short-desc">{cat.desc}</p>

              {/* Illustrative Brand Icons Area */}
              <div className="floating-badge-container">
                {cat.illustrations.map((badge, bIdx) => (
                  <div
                    key={bIdx}
                    className="floating-badge"
                    style={{
                      animationDelay: `${bIdx * 0.4}s`,
                      animationName: bIdx % 2 === 0 ? 'float-badge' : 'float-badge-reverse'
                    }}
                  >
                    {badge}
                  </div>
                ))}
              </div>

              <div className="card-cta-link">
                Explore Details & Skills <span>&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div> {/* Close .container here so the fixed overlay is a sibling to it and bypasses transform bounds! */}

      {/* Immersive Fullscreen Detail View Overlay (Fades in over SPA) */}
      {selectedCategory && (
        <div className={`skill-detail-fullscreen-overlay ${isClosing ? 'closing' : ''}`}>

          {/* Header Area */}
          <div className="detail-header-nav-fixed">
            {/* Premium Back Button Group */}
            <div className="premium-back-wrapper" onClick={handleCloseDetail}>
              <button className="premium-back-circle-btn" aria-label="Go Back">
                <ArrowLeft size={16} />
              </button>
              <span className="premium-back-label">Return to Grid</span>
            </div>

            <div className="detail-header-logo">
              <Terminal size={14} /> <span>MODULE://{selectedCategory.id.toUpperCase()}</span>
            </div>
          </div>

          {/* Main Center Content Alignment Container */}
          <div className="detail-content-center-container">
            <div className="detail-visual-wrapper">

              {/* Left Card: Matches the picture, compact padding */}
              <div className="detail-glass-left-card">
                <div className="detail-card-brand-metal-frame">
                  {selectedCategory.icon}
                </div>

                <h2 className="detail-card-heading-title">
                  {selectedCategory.category}
                </h2>

                <p className="detail-card-sub-description">
                  {selectedCategory.desc}
                </p>

                <div className="detail-card-divider-line"></div>

                <h4 className="detail-card-pillars-label">
                  KEY DEVELOPMENT PILLARS
                </h4>

                <div className="detail-card-check-items">
                  {selectedCategory.features.map((feat, fIdx) => (
                    <div key={fIdx} className="detail-card-check-item">
                      <div className="detail-check-circle-bullet">
                        <Check size={11} className="check-svg-node" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connecting Animated Neon Wave SVG */}
              <div className="wave-connection-graphic">
                <svg className="connecting-sine-wave" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0,40 Q30,10 60,40 T120,40"
                    stroke="url(#neon-wave-grad-3)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="flowing-wave-path"
                  />
                  <defs>
                    <linearGradient id="neon-wave-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--color-primary)" />
                      <stop offset="50%" stopColor="var(--color-secondary)" />
                      <stop offset="100%" stopColor="var(--color-primary)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Right Area: 2x2 grid of circular progress meters */}
              <div className="detail-progress-right-grid">
                {selectedCategory.skills.map((skill, sIdx) => {
                  const radius = 42;
                  const stroke = 5.5;
                  const circumference = 2 * Math.PI * radius;
                  const strokeDashoffset = circumference - (circumference * skill.level) / 100;

                  return (
                    <div key={sIdx} className="circular-meter-box">

                      {/* Dial Circle SVG container */}
                      <div className="dial-circle-outer-ring">
                        <svg className="dial-circle-svg" viewBox="0 0 100 100">
                          {/* Background track */}
                          <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            stroke="rgba(255, 255, 255, 0.04)"
                            strokeWidth={stroke}
                            fill="none"
                          />
                          {/* Foreground colored progress arc */}
                          <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            stroke="url(#dial-grad-3)"
                            strokeWidth={stroke}
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            transform="rotate(-90 50 50)"
                            className="dial-active-fill-ring"
                          />
                          <defs>
                            <linearGradient id="dial-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="var(--color-primary)" />
                              <stop offset="100%" stopColor="var(--color-secondary)" />
                            </linearGradient>
                          </defs>
                        </svg>

                        {/* Centered Brand Icon */}
                        <div className="dial-inner-brand-icon">
                          {skill.icon}
                        </div>
                      </div>

                      {/* Title & Desc */}
                      <h4 className="dial-skill-title">{skill.name}</h4>
                      <p className="dial-skill-desc">{skill.desc}</p>

                      {/* Percentage */}
                      <div className="dial-skill-percentage gradient-text">{skill.level}%</div>

                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      )}
    </section>
  );
}
