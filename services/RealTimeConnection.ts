import React, { useState, useEffect, useRef } from "react";
import { useWebSocket, useTimer } from "../hooks";
import { IRealTime } from "../interfaces";

const RealTimeManager = ({ store, dispatch }: IRealTime) => {
  const [render, setRender] = useState(false);
  let handler = useRef<number>(0).current;
  // WebSocket custon hook
  const { status, message, start, read, send, stop } = useWebSocket(
    store.webSocketUrl
  );

  // WebSocket reconnection manager
  useEffect(() => {
    // Check if user is authenticated
    if (store.authenticated) {
      // Connect websocket to server
      if (status !== "OPEN") {
        handler = setInterval(() => {
          start();
          setRender((prev) => !prev);
        }, store.wsReconnectionMs);
      }
      // Update context store
      dispatch({
        type: "SET_WEBSOCKET",
        payload: {
          wsStatus: status,
          wsSend: send,
          wsRead: read,
          wsOnMessage: message,
        },
      });
    }
    return () => clearInterval(handler);
  }, [store.authenticated, status, render]);
};

export default RealTimeManager;
