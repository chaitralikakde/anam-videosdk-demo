import React, { useState } from "react";

export const CreditCardPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1); // Track active step (1 to 4)

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="page-container">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-steps">
          <div className={`step ${currentStep >= 1 ? "active" : ""}`}>Identify Yourself</div>
          <div className={`step ${currentStep >= 2 ? "active" : ""}`}>Confirm Your Details</div>
          <div className={`step ${currentStep >= 3 ? "active" : ""}`}>Choose Card</div>
          <div className={`step ${currentStep >= 4 ? "active" : ""}`}>Submit & Receive</div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
        </div>
      </div>

      <div className="form-container">
        <h2 className="form-title">
          {currentStep === 1 && "Get the Best Credit Card in 3 Easy Steps"}
          {currentStep === 2 && "Confirm Your Details"}
          {currentStep === 3 && "Choose Your Card"}
          {currentStep === 4 && "Submit & Receive"}
        </h2>

        {/* Step 1: Mobile Number */}
        {currentStep === 1 && (
          <div className="card">
            <label className="label">Enter your Mobile Number</label>
            <div className="input-group">
              <span className="prefix">+91</span>
              <input type="text" placeholder="Enter mobile number" className="input" />
            </div>
            <p className="helper-text">We will send you an OTP on this number</p>
          </div>
        )}

        {/* Step 2: Validation */}
        {currentStep === 2 && (
          <div className="card">
            <label className="label">Validate using</label>

            <div className="dob-group">
              <p className="dob-label">Date of Birth</p>
              <div className="dob-inputs">
                <input placeholder="DD" className="dob-input" />
                <input placeholder="MM" className="dob-input" />
                <input placeholder="YYYY" className="dob-input dob-year" />
              </div>
            </div>

            <div className="or-text">OR</div>

            <div className="pan-group">
              <p className="pan-label">PAN Number</p>
              <input type="text" placeholder="Enter PAN" className="input full-width" />
            </div>
          </div>
        )}

        {/* Step 3: Choose Card */}
        {currentStep === 3 && (
          <div className="card">
            <p className="step-content">Here you can show card options for the user to choose.</p>
          </div>
        )}

        {/* Step 4: Submit & Receive */}
        {currentStep === 4 && (
          <div className="card">
            <p className="step-content">Thank you! Submit to receive your credit card.</p>
          </div>
        )}

        {/* Consent */}
        {currentStep <= 2 && (
          <div className="consent">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>
                I hereby consent to collection and processing of my data for
                availing this credit card and relevant services.
              </span>
            </label>

            <label className="checkbox-label">
              <input type="checkbox" />
              <span>
                I agree to receive personalized offers via Call, SMS, WhatsApp,
                Email or other channels.
              </span>
            </label>
          </div>
        )}

        {/* CTA */}
        {currentStep < 4 && (
          <button className="cta-button" onClick={handleNextStep}>
            {currentStep === 1 ? "Get OTP >>" : "Next >>"}
          </button>
        )}

        {currentStep === 4 && (
          <button className="cta-button" onClick={() => alert("Form Submitted!")}>
            Submit & Receive
          </button>
        )}

        <p className="footer-text">
          By submitting, I confirm that I am an Indian above 18 years of age
          and agree to the Privacy Policy and T&C.
        </p>
      </div>
    </div>
  );
};