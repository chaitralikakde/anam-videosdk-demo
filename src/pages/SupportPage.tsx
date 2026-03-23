import React, { useEffect } from "react";
import { usePageContext } from "../context/PageContext";

export const SupportPage: React.FC = () => {
  const { formData, setFormField, highlightedElement, formSubmitTrigger, setFormSubmitTrigger } = usePageContext();

  useEffect(() => {
    if (formSubmitTrigger === "support") {
      console.log("Support form submitted via agent:", formData);
      alert(`Support ticket created!\nSubject: ${formData.subject || ""}\nMessage: ${formData.message || ""}`);
      setFormSubmitTrigger(null);
    }
  }, [formSubmitTrigger, formData, setFormSubmitTrigger]);

  const faqs = [
    { q: "How do I reset my password?", a: "Click 'Forgot Password' on the login page, or contact our support team for manual reset." },
    { q: "What are the transfer limits?", a: "Daily limit: $10,000. Monthly: $50,000. Contact us if you need higher limits for your account." },
    { q: "How do I freeze my card?", a: "Go to the Cards page and click 'Freeze Card', or ask the AI assistant to do it for you." },
    { q: "Is my data secure?", a: "Yes. We use 256-bit encryption and maintain SOC 2 Type II certified infrastructure." },
  ];

  return (
    <div className="page support-page">
      <div className="page-header">
        <h1>Help & Support</h1>
        <p>We're here to help, 24/7</p>
      </div>

      <div className="support-layout">
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-question">{faq.q}</summary>
                <div className="faq-answer">{faq.a}</div>
              </details>
            ))}
          </div>

          <div className="contact-info">
            <h3>Other Ways to Reach Us</h3>
            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-icon-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <strong>Phone</strong>
                  <p>1-800-SECURE-BANK</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-icon-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <strong>Email</strong>
                  <p>support@securebank.com</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-icon-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div>
                  <strong>AI Assistant</strong>
                  <p>Click the avatar at bottom-right</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="support-form-section">
          <h2>Send Us a Message</h2>
          <form className="support-form" onSubmit={(e) => {
            e.preventDefault();
            alert(`Ticket submitted!\nSubject: ${formData.subject}`);
          }}>
            <div className={`form-group ${highlightedElement === "name" ? "highlighted" : ""}`}>
              <label>Your Name</label>
              <input type="text" placeholder="John Doe"
                value={formData.name || ""} onChange={(e) => setFormField("name", e.target.value)}
                className="form-input" data-field="name" />
            </div>
            <div className={`form-group ${highlightedElement === "email" ? "highlighted" : ""}`}>
              <label>Email</label>
              <input type="email" placeholder="name@example.com"
                value={formData.email || ""} onChange={(e) => setFormField("email", e.target.value)}
                className="form-input" data-field="email" />
            </div>
            <div className={`form-group ${highlightedElement === "subject" ? "highlighted" : ""}`}>
              <label>Subject</label>
              <input type="text" placeholder="How can we help?"
                value={formData.subject || ""} onChange={(e) => setFormField("subject", e.target.value)}
                className="form-input" data-field="subject" />
            </div>
            <div className={`form-group ${highlightedElement === "message" ? "highlighted" : ""}`}>
              <label>Message</label>
              <textarea placeholder="Describe your issue..."
                value={formData.message || ""} onChange={(e) => setFormField("message", e.target.value)}
                className="form-input form-textarea" data-field="message" rows={4} />
            </div>
            <button type="submit" className="btn btn-primary btn-full" data-action="support">
              Submit Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
