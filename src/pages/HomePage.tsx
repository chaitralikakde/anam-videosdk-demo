import React from "react";
import { Link } from "react-router-dom";

// SVG Icon components
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const Shield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const Zap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const TrendingUp = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);

const Headphones = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
  </svg>
);

export const HomePage: React.FC = () => {
  return (
    <div className="page home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">Trusted by 2 million+ customers</div>
          <h1 className="hero-title">
            Modern banking<br />for the way you live
          </h1>
          <p className="hero-subtitle">
            Manage your money with confidence. SecureBank gives you powerful tools,
            real-time insights, and AI-powered assistance — all in one place.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Open an Account
              <ArrowRight />
            </Link>
            <Link to="/accounts" className="btn btn-outline btn-lg">Learn More</Link>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80"
            alt="Professional banking team"
            className="hero-image"
          />
        </div>
      </section>

      {/* Trust Bar */}
      <section className="trust-bar">
        <div className="trust-item">
          <span className="trust-number">2M+</span>
          <span className="trust-label">Active Customers</span>
        </div>
        <div className="trust-divider"></div>
        <div className="trust-item">
          <span className="trust-number">99.9%</span>
          <span className="trust-label">Platform Uptime</span>
        </div>
        <div className="trust-divider"></div>
        <div className="trust-item">
          <span className="trust-number">$0</span>
          <span className="trust-label">Transfer Fees</span>
        </div>
        <div className="trust-divider"></div>
        <div className="trust-item">
          <span className="trust-number">24/7</span>
          <span className="trust-label">AI-Powered Support</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Everything you need to bank smarter</h2>
          <p className="section-subtitle">
            From instant transfers to AI-powered guidance, we've built every feature
            with your financial wellbeing in mind.
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Zap />
            </div>
            <h3>Instant Transfers</h3>
            <p>Send money to anyone in seconds. Zero fees on all domestic transfers, with real-time confirmation.</p>
            <Link to="/transfers" className="feature-link">
              Make a Transfer <ArrowRight />
            </Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <TrendingUp />
            </div>
            <h3>Smart Savings</h3>
            <p>Earn 4.5% APY on your savings. Set goals, automate deposits, and watch your money grow.</p>
            <Link to="/accounts" className="feature-link">
              View Accounts <ArrowRight />
            </Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Shield />
            </div>
            <h3>Enterprise Security</h3>
            <p>256-bit encryption, biometric authentication, and real-time fraud monitoring protect every transaction.</p>
            <Link to="/cards" className="feature-link">
              Manage Cards <ArrowRight />
            </Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Headphones />
            </div>
            <h3>AI Assistant</h3>
            <p>Your personal banking concierge. Ask questions, get guided through tasks, or just say hello.</p>
            <Link to="/support" className="feature-link">
              Get Help <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop&q=80"
          alt="Banking technology"
          className="cta-bg-image"
        />
        <div className="cta-overlay">
          <h2>Ready to take control of your finances?</h2>
          <p>Join over 2 million customers who trust SecureBank with their money.</p>
          <Link to="/register" className="btn btn-white btn-lg">
            Get Started Today <ArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};
