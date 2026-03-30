const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN?.trim();
const AGENT_ID = process.env.REACT_APP_AGENT_ID?.trim();
const VERSION_ID = (process.env.REACT_APP_VERSION_ID ?? "").trim();

if (!AUTH_TOKEN) console.error("REACT_APP_AUTH_TOKEN is missing");
if (!AGENT_ID) console.error("REACT_APP_AGENT_ID is missing");

// Create a new VideoSDK meeting room and return its roomId
export const createMeeting = async (): Promise<string | null> => {
  try {
    if (!AUTH_TOKEN) throw new Error("REACT_APP_AUTH_TOKEN is missing");

    const res = await fetch("https://api.videosdk.live/v2/rooms", {
      method: "POST",
      headers: {
        authorization: AUTH_TOKEN,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("createMeeting API failed:", res.status, res.statusText);
      return null;
    }

    const { roomId } = await res.json();
    return roomId as string;
  } catch (error) {
    console.error("createMeeting failed:", error);
    return null;
  }
};

// Dispatch the configured agent into a meeting room
export const dispatchAgent = async ({
  meetingId,
}: {
  meetingId: string;
}): Promise<boolean> => {
  try {
    if (!AUTH_TOKEN) throw new Error("REACT_APP_AUTH_TOKEN is missing");
    if (!AGENT_ID) throw new Error("REACT_APP_AGENT_ID is missing");

    // Resolve versionId — use the env value or fetch the latest version
    let versionId = VERSION_ID;
    if (!versionId) {
      const response = await fetch(
        `https://api.videosdk.live/ai/v1/agents/${AGENT_ID}/versions`,
        {
          method: "GET",
          headers: {
            Authorization: AUTH_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Fetching agent versions failed:", response.status);
        return false;
      }

      const versionsData = await response.json();
      versionId = versionsData?.versions?.[0]?.versionId;
    }

    const body: Record<string, string> = {
      meetingId,
      agentId: AGENT_ID,
    };

    if (versionId) {
      body.versionId = versionId;
    }

    const res = await fetch("https://api.videosdk.live/v2/agent/dispatch", {
      method: "POST",
      headers: {
        Authorization: AUTH_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      console.log("Agent dispatched successfully");
      return true;
    } else {
      const errBody = await res.text().catch(() => "");
      console.error("dispatchAgent API failed:", res.status, res.statusText, errBody);
      return false;
    }
  } catch (error) {
    console.error("dispatchAgent failed:", error);
    return false;
  }
};
