import { useState, useEffect } from "react";

const useWebSocket = (
  url = "localhost:8080",
  reconnectionTimeMs = 10000,
  debug = true
) => {
  const [timeoutHandler, setTimeoutHandler] = useState(0);
  const [ws, setWs] = useState<null | WebSocket>(null);
  const [mode, setMode] = useState<"ws" | "timer">("ws");
  const [status, setStatus] = useState<"OPEN" | "CLOSE">("CLOSE");
  const [messages, setMessages] = useState([]);

  const _onSend = (message: string) => {
    if (ws) {
      ws.send(message);
    }
  };

  useEffect(() => {
    if (mode === "timer") {
      // Timer mode before attempting new connection
      setTimeoutHandler(
        setTimeout(() => {
          setMode("ws");
        }, reconnectionTimeMs)
      );
    } else {
      // WebSocket Mode to connect at distante server
      const wsClient = new WebSocket("ws://" + url);
      wsClient.onopen = () => {
        debug && console.log("ws opened at " + url);
        setStatus("OPEN");
      };
      wsClient.onclose = () => {
        debug && console.log("ws closed");
        setMode("timer");
        setStatus("CLOSE");
      };
      wsClient.onmessage = (e) => {
        debug && console.log("message received", e.data);
        setMessages(e.data);
      };

      setWs(wsClient);
    }

    return () => {
      // Component unmounted
      clearTimeout(timeoutHandler);
      if (ws) {
        ws.close();
      }
    };
  }, [mode]);

  return { status, onMessage: messages, ws };
};

export default useWebSocket;
