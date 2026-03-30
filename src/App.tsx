import React, { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
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
import { CreditCardPage } from "./pages/CreditCardsPage";
import { createMeeting, dispatchAgent } from "./api";

// Tracks the current page in context for the agent to read
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
// Must be rendered inside a MeetingProvider
const AgentActionHandler: React.FC = () => {
  const { setFormField, setHighlightedElement, setFormSubmitTrigger } = usePageContext();
  const navigate = useNavigate();

  usePubSub("AGENT_ACTION", {
    onMessageReceived: (message) => {
      try {
        const action =
          typeof message.message === "string"
            ? JSON.parse(message.message)
            : message.message;

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

  return null;
};

// ── Connect Panel (shown before a session is active) ────────────────────────
const ConnectAgentPanel: React.FC<{
  isConnecting: boolean;
  connectError: string | null;
  onConnect: () => void;
}> = ({ isConnecting, connectError, onConnect }) => (
  <div className="connect-agent-panel">
    <div className="connect-agent-header">
      <div className="connect-agent-logo">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#0066FF" />
          <path d="M16 6L6 12V14H26V12L16 6Z" fill="white" />
          <rect x="8" y="15" width="3" height="9" fill="white" rx="1" />
          <rect x="14.5" y="15" width="3" height="9" fill="white" rx="1" />
          <rect x="21" y="15" width="3" height="9" fill="white" rx="1" />
          <rect x="6" y="25" width="20" height="2" fill="white" rx="1" />
        </svg>
      </div>
      <span className="connect-agent-title">SecureBank Assistant</span>
    </div>

    <p className="connect-agent-desc">
      Connect to your AI assistant for real-time help.
    </p>

    {connectError && (
      <div className="connect-agent-error">{connectError}</div>
    )}

    <button
      className={`cc-connect-btn connect-agent-btn ${isConnecting ? "disabled" : ""}`}
      onClick={onConnect}
      disabled={isConnecting}
    >
      {isConnecting ? (
        <>
          <span className="connect-spinner" />
          Connecting...
        </>
      ) : (
        "Connect Agent"
      )}
    </button>
  </div>
);

// ── Banking App (routes + floating agent panel) ──────────────────────────────
const BankingApp: React.FC<{
  meetingId: string | null;
  isConnecting: boolean;
  connectError: string | null;
  authToken: string;
  onConnectAgent: () => void;
  onDisconnect: () => void;
  onMeetingJoined: () => void;
}> = ({
  meetingId,
  isConnecting,
  connectError,
  authToken,
  onConnectAgent,
  onDisconnect,
  onMeetingJoined,
}) => {
  const [showPanel, setShowPanel] = useState(true);

  return (
    <PageTracker>
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
            <Route path="/credit-cards" element={<CreditCardPage />} />
          </Routes>
        </main>

        {/* ── Floating Agent Panel ─────────────────────────────────────── */}
        {showPanel ? (
          <div className="agent-floating-panel">
            {/* Close button */}
            <button
              className="panel-close-btn"
              onClick={() => setShowPanel(false)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="1" y1="1" x2="13" y2="13" />
                <line x1="13" y1="1" x2="1" y2="13" />
              </svg>
            </button>

            {meetingId && authToken ? (
              // Meeting is active — wrap in MeetingProvider
              <MeetingProvider
                config={{
                  meetingId,
                  micEnabled: true,
                  webcamEnabled: false,
                  name: `User-${Date.now().toString(36)}`,
                  debugMode: false,
                  multiStream: false,
                }}
                token={authToken}
                reinitialiseMeetingOnConfigChange={false}
                joinWithoutUserInteraction={false}
              >
                {/* Handles agent navigation/form commands */}
                <AgentActionHandler />

                {/* Main meeting UI with auto-join enabled */}
                <MeetingInterface
                  meetingId={meetingId}
                  onDisconnect={onDisconnect}
                  onJoined={onMeetingJoined}
                  autoJoin={true}
                />
              </MeetingProvider>
            ) : (
              // No active session — show connect button
              <ConnectAgentPanel
                isConnecting={isConnecting}
                connectError={connectError}
                onConnect={onConnectAgent}
              />
            )}
          </div>
        ) : (
          // Panel is minimised — show reopen button
          <button
            className="panel-reopen-btn"
            onClick={() => setShowPanel(true)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        )}
      </div>
    </PageTracker>
  );
};

// ── App root ─────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectError, setConnectError] = useState<string | null>(null);

  const authToken = process.env.REACT_APP_AUTH_TOKEN || "";

  // Called when user clicks "Connect Agent"
  const handleConnectAgent = async () => {
    setIsConnecting(true);
    setConnectError(null);

    try {
      // 1. Create a fresh meeting room
      const id = await createMeeting();
      if (!id) throw new Error("Failed to create meeting room");

      // 2. Dispatch the agent into that room
      const dispatched = await dispatchAgent({ meetingId: id });
      if (!dispatched) throw new Error("Failed to dispatch agent");

      // 3. Hand off to MeetingProvider — isConnecting stays true until joined
      setMeetingId(id);
    } catch (err: any) {
      console.error("Connect agent error:", err);
      setConnectError(err.message || "Connection failed. Please try again.");
      setIsConnecting(false);
    }
  };

  // Called when the VideoSDK meeting is actually joined
  const handleMeetingJoined = () => {
    setIsConnecting(false);
  };

  // Called when the user disconnects from the session
  const handleDisconnect = () => {
    setMeetingId(null);
    setIsConnecting(false);
    setConnectError(null);
  };

  return (
    <BrowserRouter>
      <PageProvider>
        <BankingApp
          meetingId={meetingId}
          isConnecting={isConnecting}
          connectError={connectError}
          authToken={authToken}
          onConnectAgent={handleConnectAgent}
          onDisconnect={handleDisconnect}
          onMeetingJoined={handleMeetingJoined}
        />
      </PageProvider>
      <Analytics />
    </BrowserRouter>
  );
};

export default App;
