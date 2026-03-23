import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageContext } from "../context/PageContext";

export const LoginPage: React.FC = () => {
  const { formData, setFormField, highlightedElement, formSubmitTrigger, setFormSubmitTrigger } = usePageContext();

  useEffect(() => {
    if (formSubmitTrigger === "login") {
      console.log("Login form submitted via agent:", formData);
      alert(`Login submitted!\nEmail: ${formData.email || ""}\nPassword: ${formData.password ? "\u2022".repeat(formData.password.length) : ""}`);
      setFormSubmitTrigger(null);
    }
  }, [formSubmitTrigger, formData, setFormSubmitTrigger]);

  return (
    <div className="page login-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome back</h1>
            <p>Sign in to your SecureBank account</p>
          </div>

          <form className="auth-form" onSubmit={(e) => {
            e.preventDefault();
            alert(`Login submitted!\nEmail: ${formData.email || ""}`);
          }}>
            <div className={`form-group ${highlightedElement === "email field" || highlightedElement === "email" ? "highlighted" : ""}`}>
              <label htmlFor="email">Email</label>
              <input
                type="email" id="email" name="email"
                placeholder="name@example.com"
                value={formData.email || ""}
                onChange={(e) => setFormField("email", e.target.value)}
                className="form-input" data-field="email"
              />
            </div>

            <div className={`form-group ${highlightedElement === "password field" || highlightedElement === "password" ? "highlighted" : ""}`}>
              <label htmlFor="password">Password</label>
              <input
                type="password" id="password" name="password"
                placeholder="Enter your password"
                value={formData.password || ""}
                onChange={(e) => setFormField("password", e.target.value)}
                className="form-input" data-field="password"
              />
            </div>

            <div className="form-row">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <button type="button" className="link-btn">Forgot password?</button>
            </div>

            <button
              type="submit"
              className={`btn btn-primary btn-full ${highlightedElement === "login button" || highlightedElement === "sign in button" ? "highlighted" : ""}`}
              data-action="login"
            >
              Sign In
            </button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <div className="social-auth">
            <button className="social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button className="social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Apple
            </button>
          </div>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Create one</Link></p>
          </div>
        </div>

        <div className="auth-side">
          <img
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=800&fit=crop&q=80"
            alt="Secure banking"
            className="auth-side-image"
          />
          <div className="auth-side-overlay">
            <h2>Bank-grade security, human-grade simplicity</h2>
            <div className="auth-side-features">
              <div className="auth-side-feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>256-bit SSL encryption</span>
              </div>
              <div className="auth-side-feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Two-factor authentication</span>
              </div>
              <div className="auth-side-feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Real-time fraud monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
