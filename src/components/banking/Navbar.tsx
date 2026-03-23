import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/accounts", label: "Accounts" },
    { path: "/transfers", label: "Transfers" },
    { path: "/cards", label: "Cards" },
    { path: "/support", label: "Support" },
  ];

  return (
    <nav className="bank-navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <div className="logo-icon-bank">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#0F172A"/>
              <path d="M16 6L6 12V14H26V12L16 6Z" fill="white"/>
              <rect x="8" y="15" width="3" height="9" fill="white" rx="1"/>
              <rect x="14.5" y="15" width="3" height="9" fill="white" rx="1"/>
              <rect x="21" y="15" width="3" height="9" fill="white" rx="1"/>
              <rect x="6" y="25" width="20" height="2" fill="white" rx="1"/>
            </svg>
          </div>
          <span className="logo-text">SecureBank</span>
        </Link>

        <div className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
              data-nav={link.label.toLowerCase()}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          {location.pathname === "/login" || location.pathname === "/register" ? (
            <Link to="/" className="nav-btn nav-btn-outline">
              Back to Home
            </Link>
          ) : (
            <>
              <Link to="/login" className="nav-btn nav-btn-outline" data-nav="login">
                Sign In
              </Link>
              <Link to="/register" className="nav-btn nav-btn-primary" data-nav="register">
                Get Started
              </Link>
            </>
          )}
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
