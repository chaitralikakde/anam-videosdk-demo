import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { MeetingProvider, usePubSub } from "@videosdk.live/react-sdk";
import { PageProvider, usePageContext } from "./context/PageContext";
import { Navbar } from "./components/banking/Navbar";
import { MeetingInterface } from "./components/agent-meeting/MeetingInterface";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AccountsPage } from "./pages/AccountsPage";
import { TransfersPage } from "./pages/TransfersPage";
import { CardsPage } from "./pages/CardsPage";
import { SupportPage } from "./pages/SupportPage";

// Wrapper that tracks current page in context
const PageTracker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { setCurrentPage, resetFormData } = usePageContext();

  useEffect(() => {
    setCurrentPage(location.pathname);
    resetFormData();
  }, [location.pathname, setCurrentPage, resetFormData]);

  return <>{children}</>;
};

// Handles AGENT_ACTION PubSub messages (navigation, form fill, etc.)
const AgentActionHandler: React.FC = () => {
  const { setFormField, setHighlightedElement, setFormSubmitTrigger } = usePageContext();
  const navigate = useNavigate();

  usePubSub("AGENT_ACTION", {
    onMessageReceived: (message) => {
      try {
        const action = typeof message.message === 'string'
          ? JSON.parse(message.message) : message.message;

        console.log("Agent action received:", action);

        if (action.action === "navigate" && action.route) {
          navigate(action.route);
        } else if (action.action === "fill_field" && action.field) {
          setFormField(action.field, action.value || "");
        } else if (action.action === "submit_form" && action.form) {
          setFormSubmitTrigger(action.form);
        } else if (action.action === "highlight" && action.element) {
          setHighlightedElement(action.element);
          setTimeout(() => setHighlightedElement(null), 3000);
        }
      } catch (e) {
        console.error("Error parsing AGENT_ACTION", e);
      }
    },
  });

  return null; // Invisible — just handles PubSub
};

// The banking app with the ORIGINAL MeetingInterface floating as a panel
const BankingApp: React.FC<{ meetingId: string }> = ({ meetingId }) => {
  const [showPanel, setShowPanel] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);

  const handleDisconnect = () => {
    // Don't hide the panel, just let MeetingInterface handle disconnect
  };

  return (
    <PageTracker>
      <AgentActionHandler />
      <div className="banking-app">
        <Navbar />
        <main className="banking-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/transfers" element={<TransfersPage />} />
            <Route path="/cards" element={<CardsPage />} />
            <Route path="/support" element={<SupportPage />} />
          </Routes>
        </main>

        {/* ── Floating Agent Panel ── */}
        {showPanel ? (
          <div className={`agent-floating-panel ${showTranscript ? 'transcript-open' : ''}`}>
            {/* Close button */}
            <button className="panel-close-btn" onClick={() => { setShowPanel(false); setShowTranscript(false); }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
              </svg>
            </button>

            {/* Transcript toggle button */}
            <button className="panel-transcript-btn" onClick={() => setShowTranscript(!showTranscript)}>
              {showTranscript ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="1" y1="1" x2="23" y2="23"/><line x1="23" y1="1" x2="1" y2="23"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              )}
            </button>

            <MeetingInterface
              meetingId={meetingId}
              onDisconnect={handleDisconnect}
            />
          </div>
        ) : (
          <button className="panel-reopen-btn" onClick={() => setShowPanel(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        )}
      </div>
    </PageTracker>
  );
};

// Entry component — reads token/meetingId from URL and persists them
const App: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const urlToken = params.get("token");
  const urlMeetingId = params.get("meetingId");

  const [token] = useState<string | null>(() => {
    if (urlToken) {
      sessionStorage.setItem("videosdk_token", urlToken);
      return urlToken;
    }
    return sessionStorage.getItem("videosdk_token");
  });

  const [meetingId] = useState<string | null>(() => {
    if (urlMeetingId) {
      sessionStorage.setItem("videosdk_meetingId", urlMeetingId);
      return urlMeetingId;
    }
    return sessionStorage.getItem("videosdk_meetingId");
  });

  if (!token || !meetingId) {
    return <TokenInputPage />;
  }

  return (
    <BrowserRouter>
      <PageProvider>
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: true,
            webcamEnabled: false,
            name: "User",
            debugMode: false,
            multiStream: false,
          }}
          token={token}
          reinitialiseMeetingOnConfigChange={false}
          joinWithoutUserInteraction={false}
        >
          <BankingApp meetingId={meetingId} />
        </MeetingProvider>
      </PageProvider>
    </BrowserRouter>
  );
};

// Token input page when URL params are missing
const TokenInputPage: React.FC = () => {
  const [inputToken, setInputToken] = useState("");
  const [inputMeetingId, setInputMeetingId] = useState("");

  const handleSubmit = () => {
    const newUrl = `${window.location.pathname}?token=${inputToken}&meetingId=${inputMeetingId}`;
    window.location.href = newUrl;
  };

  return (
    <div className="token-input-page">
      <div className="token-card">
        <div className="token-logo">
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#0066FF"/>
            <path d="M16 6L6 12V14H26V12L16 6Z" fill="white"/>
            <rect x="8" y="15" width="3" height="9" fill="white" rx="1"/>
            <rect x="14.5" y="15" width="3" height="9" fill="white" rx="1"/>
            <rect x="21" y="15" width="3" height="9" fill="white" rx="1"/>
            <rect x="6" y="25" width="20" height="2" fill="white" rx="1"/>
          </svg>
        </div>
        <h1>SecureBank AI Demo</h1>
        <p>Enter your VideoSDK credentials to start the banking demo with AI avatar assistant.</p>

        <div className="token-form">
          <div className="token-field">
            <label>VideoSDK Token</label>
            <input type="text" value={inputToken} onChange={(e) => setInputToken(e.target.value)}
              placeholder="Paste your VideoSDK token" />
          </div>
          <div className="token-field">
            <label>Meeting ID</label>
            <input type="text" value={inputMeetingId} onChange={(e) => setInputMeetingId(e.target.value)}
              placeholder="Paste your meeting ID" />
          </div>
          <button onClick={handleSubmit} disabled={!inputToken || !inputMeetingId} className="token-submit-btn">
            Launch Demo
          </button>
        </div>

        <p className="token-hint">Run the Python agent to get token and meeting ID in the console output.</p>
      </div>
    </div>
  );
};

export default App;
