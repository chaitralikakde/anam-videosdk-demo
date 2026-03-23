import React, { useRef, useEffect, useCallback } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";

interface AgentAudioPlayerProps {
  participantId: string;
}

export const AgentAudioPlayer: React.FC<AgentAudioPlayerProps> = ({
  participantId,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { micStream } = useParticipant(participantId);

  const tryPlay = useCallback(() => {
    if (audioRef.current && audioRef.current.srcObject) {
      audioRef.current.play().catch((err) => {
        console.warn("Audio play blocked, will retry on user interaction:", err.message);
      });
    }
  }, []);

  // Set up the audio stream when micStream changes
  useEffect(() => {
    if (audioRef.current && micStream) {
      const mediaStream = new MediaStream([micStream.track]);
      audioRef.current.srcObject = mediaStream;
      audioRef.current.volume = 1.0;
      tryPlay();
    }
  }, [micStream, tryPlay]);

  // Retry audio playback on any user interaction (handles autoplay policy)
  useEffect(() => {
    const handleInteraction = () => {
      tryPlay();
    };

    document.addEventListener("click", handleInteraction, { once: false });
    document.addEventListener("keydown", handleInteraction, { once: false });

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };
  }, [tryPlay]);

  return (
    <audio ref={audioRef} autoPlay playsInline />
  );
};
