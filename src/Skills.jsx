
import { Cpu, Server, ArrowLeft, Terminal, Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';

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

const HTMLIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" style={{ filter: 'drop-shadow(0 0 6px #e34f26)' }}>
    <path d="M2 2h20l-2 18-8 3-8-3L2 2zm13.7 8H9.3l-.2-2h6.8l-.2-2H7l.6 6h6l-.4 3.5-3.2 1-3.2-1-.2-2.2H4.6l.4 4.2 5 1.8 5-1.8.6-6.3z" fill="#e34f26" />
  </svg>
);

const CSSIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" style={{ filter: 'drop-shadow(0 0 6px #2965f1)' }}>
    <path fill="#264de4" d="M2 2h20l-2 18-8 3-8-3L2 2z" />
    <path fill="#2965f1" d="M12 3.8v17.4l6.4-2.4 1.7-15H12z" />
    <path fill="#ebebeb" d="M12 7.8H7.3l.3 3.3H12V7.8zm0 5.6H9.7l.2 2.2 2.1.6V19l-4.1-1.1-.3-3.1H5.4l.5 5.2 6.1 1.7V13.4z" />
    <path fill="#ffffff" d="M12 7.8v3.3h4.4l-.4 4.5-4 1.1v2.8l6.3-1.8.8-9.9H12z" />
  </svg>
);

const NodeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" style={{ filter: 'drop-shadow(0 0 6px #3c873a)' }}>
    <path d="M12 2L2.5 7.5v11L12 22l9.5-5.5v-11L12 2zm0 2.5l7.5 4.3v8.4L12 19.5l-7.5-4.3v-8.4L12 4.5zm-2.5 5.5v3.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5V10h2v3.5c0 1.9-1.6 3.5-3.5 3.5s-3.5-1.6-3.5-3.5V10h2z" fill="#3c873a" />
  </svg>
);

const ExpressIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" style={{ filter: 'drop-shadow(0 0 6px #ffffff)' }}>
    <rect width="24" height="24" rx="4" fill="#ffffff" />
    <text x="12" y="16.5" fill="#000000" fontSize="11" fontWeight="800" fontFamily="system-ui, sans-serif" textAnchor="middle">ex</text>
  </svg>
);

const MongoIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" style={{ filter: 'drop-shadow(0 0 6px #47a248)' }}>
    <path d="M12 2c-.3 0-5.7 6.1-5.7 10.3 0 3.3 2.6 6 5.7 6s5.7-2.7 5.7-6C17.7 8.1 12.3 2 12 2zm0 16.3c-2.3 0-4.2-1.9-4.2-4.3 0-3.3 3.9-8.3 4.2-8.3s4.2 5 4.2 8.3c0 2.4-1.9 4.3-4.2 4.3z" fill="#47a248" />
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

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 6px #ffffff)' }}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const VSCodeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" style={{ filter: 'drop-shadow(0 0 6px #007acc)' }}>
    <path fill="#007acc" d="M17.583 2.001a1.492 1.492 0 0 0-.962.375L7.26 10.297l-4.22-3.21a.75.75 0 0 0-1.036.126l-1.63 2.04a.75.75 0 0 0 .114 1.042l4.08 3.204-4.08 3.203a.75.75 0 0 0-.114 1.042l1.63 2.04a.75.75 0 0 0 1.036.126l4.22-3.21 9.36 7.922a1.5 1.5 0 0 0 2.47-.962V2.883a1.5 1.5 0 0 0-1.547-1.507c-.004 0-.008 0-.012.001zm-.583 4.887v10.224l-6.61-5.112 6.61-5.112z" />
  </svg>
);

const SKILLS_DATA = [
  {
    id: 'frontend',
    category: 'Fronted Service',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="M6 14h.01M10 14h.01M14 14h.01M18 14h.01" />
      </svg>
    ),
    desc: 'Engineering interactive, responsive, and pixel-perfect layouts using modern React patterns, state managers, and semantic styles.',
    illustrations: [<HTMLIcon key="html" />, <CSSIcon key="css" />, <JSIcon key="js" />, <ReactIcon key="react" />],
    skills: [
      { name: 'HTML', desc: 'Fluid grids, flexbox layouts, and browser-compliant schemas.', level: 95, icon: <HTMLIcon /> },
      { name: 'CSS', desc: 'Modern responsive layouts, animations, and styling systems.', level: 90, icon: <CSSIcon /> },
      { name: 'JavaScript (ES6+)', desc: 'Strict typing structures and functional programming paradigms.', level: 85, icon: <JSIcon /> },
      { name: 'React.js', desc: 'Advanced state orchestration and component optimization.', level: 85, icon: <ReactIcon /> }
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
    desc: 'Orchestrating robust source control, package management, asset optimization, and development workflows.',
    illustrations: [<GitIcon key="git" />, <GithubIcon key="github" />, <VSCodeIcon key="vscode" />],
    skills: [
      { name: 'Git', desc: 'Conflict resolution, rebase sequences, and branch controls.', level: 90, icon: <GitIcon /> },
      { name: 'GitHub', desc: 'Remote repositories, pull requests, code reviews, and collaboration.', level: 85, icon: <GithubIcon /> },
      { name: 'VS Code', desc: 'Productive code editing, debugging, extensions, and workspace setup.', level: 90, icon: <VSCodeIcon /> }
    ],
    features: [
      'Trunk-based branch architectures',
      'Remote repository collaboration',
      'Fast client bundling build trees',
      'Lighthouse performance enhancements'
    ]
  },
  {
    id: 'backend',
    category: 'Backend & Services',
    icon: <Server size={22} />,
    desc: 'Developing scalable server scripts, clean RESTful schemas, GraphQL data layers, and database queries.',
    illustrations: [<NodeIcon key="node" />, <ExpressIcon key="express" />, <MongoIcon key="mongo" />],
    skills: [
      { name: 'Node.js', desc: 'Server-side runtime, asynchronous event-driven architecture, and APIs.', level: 80, icon: <NodeIcon /> },
      { name: 'Express.js', desc: 'Middleware layers, routing logic, and error handlers.', level: 80, icon: <ExpressIcon /> },
      { name: 'MongoDB', desc: 'Document schemas, connections, and basic aggregates.', level: 75, icon: <MongoIcon /> }
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
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [showCloseAnimation, setShowCloseAnimation] = useState(false);
  const [animationState, setAnimationState] = useState('');

  // Lock body scroll whenever overlay is open
  useEffect(() => {
    if (selectedCategoryId) {
      if (window.lenis) window.lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = '';
    }
    return () => {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = '';
    };
  }, [selectedCategoryId]);

  const handleCardClick = (catId) => {
    setSelectedCategoryId(catId);
  };

  const handleCloseDetail = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setIsClosing(true);
    setShowCloseAnimation(true);
    setAnimationState('closing-in');

    // Step 2: Shutters meet in the middle at ~380ms, unmount detail view then
    setTimeout(() => {
      setSelectedCategoryId(null);
      setIsClosing(false);
      setAnimationState('opening-out');
    }, 380);

    // Step 3: Shutters slide open completely at ~760ms, clean up
    setTimeout(() => {
      setShowCloseAnimation(false);
      setAnimationState('');
    }, 760);
  };

  const selectedCategory = SKILLS_DATA.find((c) => c.id === selectedCategoryId);

  return (
    <section id="skills" style={{ position: 'relative' }}>
      <style>{`
        .premium-back-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .premium-back-wrapper:hover {
          transform: translateX(-3px);
          opacity: 0.85;
        }

        .premium-back-circle-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
        }

        /* Dial Entry & Exit Animations */
        @keyframes dial-fade-in {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .circular-meter-box {
          opacity: 0;
          animation: dial-fade-in 0.65s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, border-color var(--transition-normal), box-shadow var(--transition-normal), background var(--transition-normal);
        }

        .skill-detail-fullscreen-overlay.closing .circular-meter-box {
          opacity: 0 !important;
          transform: translateY(30px) scale(0.92) !important;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
          animation: none !important;
        }

        /* Fullscreen Tab Close Animation Overlay */
        .tab-close-animation-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 20000;
          pointer-events: all;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .shutter-pane {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          background: var(--color-bg-darkest, #070a13);
          transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
          box-sizing: border-box;
        }

        .shutter-left {
          left: 0;
          border-right: 2px solid var(--color-primary, #10b981);
          transform: translateX(-100%);
        }

        .shutter-right {
          right: 0;
          border-left: 2px solid var(--color-secondary, #06b6d4);
          transform: translateX(100%);
        }

        .tab-close-animation-overlay.closing-in .shutter-left {
          transform: translateX(0);
        }

        .tab-close-animation-overlay.closing-in .shutter-right {
          transform: translateX(0);
        }

        .tab-close-animation-overlay.opening-out .shutter-left {
          transform: translateX(-100%);
        }

        .tab-close-animation-overlay.opening-out .shutter-right {
          transform: translateX(100%);
        }

        .tab-close-center-badge {
          position: relative;
          z-index: 20001;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: rgba(13, 20, 38, 0.85);
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 1.5rem 2.5rem;
          border-radius: 16px;
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.2), inset 0 0 15px rgba(16, 185, 129, 0.1);
          backdrop-filter: blur(8px);
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .tab-close-animation-overlay.closing-in .tab-close-center-badge {
          opacity: 1;
          transform: scale(1);
          transition-delay: 0.15s;
        }

        .tab-close-animation-overlay.opening-out .tab-close-center-badge {
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.15s ease, transform 0.15s ease;
        }

        .tab-close-text {
          font-family: var(--font-heading), monospace;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: var(--color-primary, #10b981);
          text-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
        }

        .tab-close-icon {
          color: var(--color-secondary, #06b6d4);
          filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.5));
          animation: tab-icon-pulse 1s ease-in-out infinite alternate;
        }

        @keyframes tab-icon-pulse {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.1);
          }
        }

        .tab-close-scanline {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
          box-shadow: 0 0 8px var(--color-primary);
          animation: tab-scanline-sweep 1.2s linear infinite;
        }

        @keyframes tab-scanline-sweep {
          0% {
            top: 0%;
          }
          100% {
            top: 100%;
          }
        }
      `}</style>

      <div className="container">

        <div className="section-header reveal">
          <span className="section-subtitle">What I am good at</span>
          <h2 className="section-title">My Technical Expertise</h2>
        </div>


        <div className="skills-grid">
          {SKILLS_DATA.map((cat, idx) => (
            <div
              key={cat.id}
              className={`skills-category-card reveal reveal-delay-${idx + 1}`}
              onClick={() => handleCardClick(cat.id)}
            >
              <div className="card-header-area">
                <div className="card-icon-circle">{cat.icon}</div>
                <h3 className="card-title-text">{cat.category}</h3>
              </div>

              <p className="card-short-desc">{cat.desc}</p>

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
      </div>

      {selectedCategory && (
        <div className={`skill-detail-fullscreen-overlay ${isClosing ? 'closing' : ''}`}>

          <div className="detail-header-nav-fixed">
            <div className="premium-back-wrapper" onClick={handleCloseDetail}>
              <div className="premium-back-circle-btn">
                <ArrowLeft size={16} />
              </div>
              <span className="premium-back-label">Return to Grid</span>
            </div>

            <div className="detail-header-logo">
              <Terminal size={14} />
            </div>
          </div>


          <div className="detail-content-center-container">
            <div className="detail-visual-wrapper">

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
                      <stop offset="0%" stopColor="var(--color-primary, #61dafb)" />
                      <stop offset="50%" stopColor="var(--color-secondary, #a259ff)" />
                      <stop offset="100%" stopColor="var(--color-primary, #61dafb)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>


              <div className="detail-progress-right-grid">
                {selectedCategory.skills.map((skill, sIdx) => {
                  const radius = 42;
                  const stroke = 5.5;
                  const circumference = 2 * Math.PI * radius;
                  const strokeDashoffset = circumference - (circumference * skill.level) / 100;

                  return (
                    <div
                      key={sIdx}
                      className="circular-meter-box"
                      style={{
                        animationDelay: `${0.3 + sIdx * 0.08}s`,
                        transitionDelay: isClosing ? `${(selectedCategory.skills.length - 1 - sIdx) * 0.05}s` : '0s'
                      }}
                    >
                      <div className="dial-circle-outer-ring">
                        <svg className="dial-circle-svg" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            stroke="rgba(255, 255, 255, 0.06)"
                            strokeWidth={stroke}
                            fill="none"
                          />
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
                              <stop offset="0%" stopColor="var(--color-primary, #61dafb)" />
                              <stop offset="100%" stopColor="var(--color-secondary, #a259ff)" />
                            </linearGradient>
                          </defs>
                        </svg>

                        <div className="dial-inner-brand-icon">
                          {skill.icon}
                        </div>
                      </div>

                      <h4 className="dial-skill-title">{skill.name}</h4>
                      <p className="dial-skill-desc">{skill.desc}</p>
                      <div className="dial-skill-percentage gradient-text">{skill.level}%</div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      )}


      {showCloseAnimation && (
        <div className={`tab-close-animation-overlay ${animationState}`}>
          <div className="shutter-pane shutter-left"></div>
          <div className="shutter-pane shutter-right"></div>
          <div className="tab-close-center-badge">
            <X className="tab-close-icon" size={24} />
            <div className="tab-close-text">TAB CLOSED</div>
            <div className="tab-close-scanline"></div>
          </div>
        </div>
      )}
    </section>
  );
}