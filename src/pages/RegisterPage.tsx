import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageContext } from "../context/PageContext";

export const RegisterPage: React.FC = () => {
  const { formData, setFormField, highlightedElement, formSubmitTrigger, setFormSubmitTrigger } = usePageContext();

  useEffect(() => {
    if (formSubmitTrigger === "register") {
      console.log("Register form submitted via agent:", formData);
      alert(`Account created!\nName: ${formData.fullName || ""}\nEmail: ${formData.email || ""}`);
      setFormSubmitTrigger(null);
    }
  }, [formSubmitTrigger, formData, setFormSubmitTrigger]);

  return (
    <div className="page register-page">
      <div className="auth-container">
        <div className="auth-card wide">
          <div className="auth-header">
            <h1>Create your account</h1>
            <p>Start banking smarter in under 2 minutes</p>
          </div>

          <form className="auth-form" onSubmit={(e) => {
            e.preventDefault();
            alert(`Account created!\nName: ${formData.fullName || ""}\nEmail: ${formData.email || ""}`);
          }}>
            <div className="form-row-2col">
              <div className={`form-group ${highlightedElement === "fullName" || highlightedElement === "name" ? "highlighted" : ""}`}>
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" name="fullName" placeholder="John Doe"
                  value={formData.fullName || ""} onChange={(e) => setFormField("fullName", e.target.value)}
                  className="form-input" data-field="fullName" />
              </div>
              <div className={`form-group ${highlightedElement === "email" ? "highlighted" : ""}`}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="name@example.com"
                  value={formData.email || ""} onChange={(e) => setFormField("email", e.target.value)}
                  className="form-input" data-field="email" />
              </div>
            </div>

            <div className={`form-group ${highlightedElement === "phone" ? "highlighted" : ""}`}>
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000"
                value={formData.phone || ""} onChange={(e) => setFormField("phone", e.target.value)}
                className="form-input" data-field="phone" />
            </div>

            <div className="form-row-2col">
              <div className={`form-group ${highlightedElement === "password" ? "highlighted" : ""}`}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Min. 8 characters"
                  value={formData.password || ""} onChange={(e) => setFormField("password", e.target.value)}
                  className="form-input" data-field="password" />
              </div>
              <div className={`form-group ${highlightedElement === "confirmPassword" ? "highlighted" : ""}`}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Repeat password"
                  value={formData.confirmPassword || ""} onChange={(e) => setFormField("confirmPassword", e.target.value)}
                  className="form-input" data-field="confirmPassword" />
              </div>
            </div>

            <label className="checkbox-label">
              <input type="checkbox" />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>

            <button type="submit" className="btn btn-primary btn-full" data-action="register">
              Create Account
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};
