import React, { useState, useEffect } from "react";

const useWebSocket = (serverUrl: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<any>(null);
  const [status, setStatus] = useState<"OPEN" | "CLOSE" | "ERROR">("CLOSE");

  const start = () => {
    if (!ws) {
      setWs(new WebSocket(serverUrl || "ws://localhost:8080"));
    }
  };

  const stop = () => {
    if (ws) {
      ws.close();
      setWs(null);
    }
  };

  const send = (message: any) => {
    if (ws) {
      ws.send(JSON.stringify(message));
    } else {
      setMessage("No WebSocket connection");
    }
  };

  const read = () => {
    setMessage(null);
    return message;
  };

  if (ws) {
    ws.onopen = () => {
      console.log("ws opened");
      setStatus("OPEN");
    };
    ws.onclose = () => {
      console.log("ws closed");
      setStatus("CLOSE");
      setWs(null);
    };
    ws.onmessage = ({ data }) => {
      setMessage(JSON.parse(data));
    };
    ws.onerror = (error) => {
      // console.log("ws error", error);
      setStatus("ERROR");
      setWs(null);
    };
  }

  return { status, message, start, read, send, stop };
};

export default useWebSocket;
