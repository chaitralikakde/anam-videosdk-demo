import React, { useState, useEffect, useRef } from "react";
import { usePubSub, useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { AgentVideoPlayer } from "../agent-meeting/AgentVideoPlayer";
import { usePageContext } from "../../context/PageContext";
import { useLocation, useNavigate } from "react-router-dom";

interface AvatarWidgetProps {
  isJoined: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  agentParticipantId?: string;
  webcamOn?: boolean;
}

export const AvatarWidget: React.FC<AvatarWidgetProps> = ({
  isJoined,
  onConnect,
  onDisconnect,
  agentParticipantId,
  webcamOn,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState<string>("offline");
  const [transcripts, setTranscripts] = useState<Array<{ role: string; text: string; uid: string }>>([]);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const lastEventTimeRef = useRef<number>(0);
  const greetingShownRef = useRef<boolean>(false);
  const lastFullTurnRef = useRef<boolean>(false);

  const { setFormField, setPendingNavigation, setHighlightedElement, setFormSubmitTrigger } = usePageContext();
  const location = useLocation();
  const navigate = useNavigate();

  const { localParticipant, toggleMic } = useMeeting();

  // Get speaking status — uses props-based agentParticipantId (like AgentDashboard)
  const { isActiveSpeaker: isAgentSpeaking } = useParticipant(agentParticipantId || "");
  const { isActiveSpeaker: isUserSpeaking, micOn: isMicOn } = useParticipant(localParticipant?.id || "");

  // Status state machine
  useEffect(() => {
    if (!isJoined) { setStatus("offline"); return; }
    if (isAgentSpeaking) setStatus("speaking");
    else if (isUserSpeaking) setStatus("listening");
    else setStatus(prev => {
      if (prev === "listening") return "thinking";
      if (prev === "speaking") return "listening";
      return prev === "offline" ? "listening" : prev;
    });
  }, [isAgentSpeaking, isUserSpeaking, isJoined]);

  // Auto-scroll transcripts
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcripts]);

  // Send page context to agent via PubSub
  const { publish } = usePubSub("PAGE_CONTEXT", {});

  useEffect(() => {
    if (isJoined) {
      const pageName = location.pathname === "/" ? "Home" :
        location.pathname.replace("/", "").charAt(0).toUpperCase() + location.pathname.slice(2);
      publish(JSON.stringify({ page: location.pathname, pageName }), { persist: false });
    }
  }, [location.pathname, isJoined]);

  // Listen for agent metrics & commands
  usePubSub("AGENT_METRICS", {
    onMessageReceived: (message) => {
      try {
        const payload = typeof message.message === 'string'
          ? JSON.parse(message.message) : message.message;

        if (payload.type && payload.metrics) {
          const metricsData = typeof payload.metrics === 'string'
            ? JSON.parse(payload.metrics) : payload.metrics;

          // Handle transcripts from timeline
          if (metricsData.timeline && Array.isArray(metricsData.timeline)) {
            metricsData.timeline.forEach((event: any) => {
              if (event.event_type && event.text) {
                const eventTime = event.end_time || event.start_time;
                if (eventTime) lastEventTimeRef.current = Math.max(lastEventTimeRef.current, eventTime);

                const role = event.event_type === "user_speech" ? "user" : "agent";
                setTranscripts(prev => {
                  const id = `${event.start_time}-${role}`;
                  if (prev.find(t => t.uid === id || t.text === event.text)) return prev;
                  return [...prev, { role, text: event.text, uid: id }].slice(-30);
                });
              }
            });
          }

          // Handle user_speech
          if (metricsData.user_speech && typeof metricsData.user_speech === 'string' &&
            (!metricsData.timeline || metricsData.timeline.length === 0)) {
            setTranscripts(prev => {
              if (prev.find(t => t.text === metricsData.user_speech)) return prev;
              return [...prev, {
                role: "user",
                text: metricsData.user_speech,
                uid: `user-${Date.now()}`
              }].slice(-30);
            });
          }

          // Handle agent_speech
          if (metricsData.agent_speech && typeof metricsData.agent_speech === 'string' &&
            (!metricsData.timeline || metricsData.timeline.length === 0)) {
            setTranscripts(prev => {
              if (prev.find(t => t.text === metricsData.agent_speech)) return prev;
              return [...prev, {
                role: "agent",
                text: metricsData.agent_speech,
                uid: `agent-${Date.now()}`
              }].slice(-30);
            });
          }
        }
      } catch (e) {
        console.error("Error parsing AGENT_METRICS in widget", e);
      }
    },
  });

  // Listen for agent actions (navigation, form fill, etc.)
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

  return (
    <>
      {/* ── Floating Avatar Button (when widget is collapsed) ────────── */}
      {!isExpanded && (
        <button
          className={`avatar-fab ${status} ${isJoined ? "connected" : ""}`}
          onClick={() => setIsExpanded(true)}
        >
          {agentParticipantId ? (
            <AgentVideoPlayer participantId={agentParticipantId} className="fab-video" />
          ) : (
            <div className="fab-icon">
              <div className={`fab-orb ${status}`}></div>
            </div>
          )}
          {status !== "offline" && (
            <div className={`fab-status-dot ${status}`}></div>
          )}
        </button>
      )}

      {/* ── Expanded Widget Panel ────────────────────────────────────── */}
      {isExpanded && (
        <div className="avatar-widget-panel">
          {/* Widget Header */}
          <div className="widget-header">
            <div className="widget-header-left">
              <div className={`widget-status-dot ${status}`}></div>
              <span className="widget-title">SecureBank Assistant</span>
            </div>
            <div className="widget-header-right">
              {isJoined && (
                <button
                  className={`widget-mic-btn ${!isMicOn ? "muted" : ""}`}
                  onClick={() => toggleMic()}
                >
                  {isMicOn ? "🎙️" : "🔇"}
                </button>
              )}
              <button className="widget-close-btn" onClick={() => setIsExpanded(false)}>
                ✕
              </button>
            </div>
          </div>

          {/* Avatar Video Area — full size, no shrinking */}
          <div className="widget-avatar-area">
            {agentParticipantId ? (
              <AgentVideoPlayer participantId={agentParticipantId} className="widget-video" />
            ) : (
              <div className={`widget-orb-container ${status}`}>
                <div className="widget-orb"></div>
                {status === "speaking" && (
                  <div className="widget-pulse-rings">
                    <div className="pulse-ring"></div>
                    <div className="pulse-ring delay-1"></div>
                    <div className="pulse-ring delay-2"></div>
                  </div>
                )}
              </div>
            )}
            <div className={`widget-status-badge ${status}`}>
              {status === "offline" ? "Click Connect to start" :
               status === "listening" ? "Listening..." :
               status === "speaking" ? "Speaking..." :
               status === "thinking" ? "Thinking..." : status}
            </div>
          </div>

          {/* Transcript Area */}
          <div className="widget-transcript">
            {transcripts.length === 0 ? (
              <div className="widget-empty">
                {isJoined ? "Say something to get started..." : "Connect to start chatting"}
              </div>
            ) : (
              transcripts.map(t => (
                <div key={t.uid} className={`widget-msg ${t.role}`}>
                  <span className="widget-msg-role">{t.role === "user" ? "You" : "Assistant"}</span>
                  <p>{t.text}</p>
                </div>
              ))
            )}
            <div ref={transcriptEndRef} />
          </div>

          {/* Controls */}
          <div className="widget-controls">
            {!isJoined ? (
              <button className="widget-connect-btn" onClick={onConnect}>
                <span>🎧</span> Connect to Assistant
              </button>
            ) : (
              <button className="widget-disconnect-btn" onClick={onDisconnect}>
                Disconnect
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
