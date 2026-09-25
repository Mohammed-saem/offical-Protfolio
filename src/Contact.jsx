import React, { useState } from 'react';
import { Mail, MapPin, Send, Phone } from 'lucide-react';

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

const LinkedinIcon = ({ size = 20 }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ size = 20 }) => (
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
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Project Inquiry',
    customSubject: '',
    message: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // REAL API INTEGRATION WITH NODEJS & MONGODB BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    if (formData.subject === 'Other' && !formData.customSubject) {
      setStatus({ type: 'error', message: 'Please enter a custom subject.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    // Agar Subject "Other" hai toh customSubject bhejenge
    const finalSubject = formData.subject === 'Other' ? formData.customSubject : formData.subject;

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: finalSubject,
          message: formData.message
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been saved & sent successfully.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'Project Inquiry',
          customSubject: '',
          message: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: data.message || data.error || 'Failed to send message.'
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      setStatus({
        type: 'error',
        message: 'Server error. Please check if your Node server is running on port 5000.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="container">

        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-subtitle">Let's Connect</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>

        {/* Contact Layout */}
        <div className="contact-wrapper">

          {/* Details Column */}
          <div className="contact-details reveal">
            <h3 className="contact-lead">Let's collaborate on your next digital product.</h3>
            <p className="contact-text">
              I am open to contract opportunities, freelance gigs, or full-time roles. If you have an idea you want to bring to life, or just want to chat about code, feel free to reach out!
            </p>

            <div className="contact-methods">
              <a href="mailto:saembehlim@gmail.com" className="contact-method">
                <div className="method-icon">
                  <Mail size={20} />
                </div>
                <div className="method-info">
                  <h4>Email</h4>
                  <p>
                    <span className="contact-link">
                      saembehlim@gmail.com
                    </span>
                  </p>
                </div>
              </a>

              <a href="tel:+919461047417" className="contact-method">
                <div className="method-icon">
                  <Phone size={20} />
                </div>
                <div className="method-info">
                  <h4>Phone</h4>
                  <p>
                    <span className="contact-link">
                      +91 9461047417
                    </span>
                  </p>
                </div>
              </a>

              <div className="contact-method">
                <div className="method-icon">
                  <MapPin size={20} />
                </div>
                <div className="method-info">
                  <h4>Location</h4>
                  <p>Rajasthan, India</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="socials-list">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="GitHub"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="LinkedIn"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="Twitter"
              >
                <TwitterIcon size={20} />
              </a>
            </div>
          </div>

          {/* Form Column */}
          <div className="reveal reveal-delay-2">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Jane Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="jane@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="Project Inquiry">Project Inquiry</option>
                    <option value="Freelance Work">Freelance Work</option>
                    <option value="Job Opportunity">Job Opportunity</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {formData.subject === 'Other' && (
                <div className="form-group">
                  <label htmlFor="customSubject">Custom Subject *</label>
                  <input
                    type="text"
                    id="customSubject"
                    name="customSubject"
                    value={formData.customSubject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your subject..."
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Tell me about your project details..."
                  required
                ></textarea>
              </div>

              {status.message && (
                <div className={`form-status-msg ${status.type}`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                className="glow-btn glow-btn-primary submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
                <Send size={16} style={{ marginLeft: '6px' }} />
              </button>
            </form>
          </div>

        </div>

        {/* Footer Area */}
        <div className="footer-bar reveal">
          <div className="footer-logo">
            <span>M.Saem</span> /
          </div>
          <div>
            &copy; {new Date().getFullYear()} Mohammed Saem. All rights reserved. Made with React &amp; CSS.
          </div>
        </div>

      </div>
    </section>
  );
}