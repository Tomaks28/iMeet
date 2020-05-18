import React, { useState, useEffect } from "react";
import { useWebSocket, useTimer } from "../hooks";
import { Store, StoreActionType } from "../interfaces";

const RealTimeManager = (
  store: Store,
  dispatch: React.Dispatch<StoreActionType>
) => {
  const { status, onMessage, ws } = useWebSocket("localhost:8080", 5000, true);

  // Store onSend function to Store
  useEffect(() => {
    if (status === "OPEN") {
      dispatch({ type: "WS_SEND", payload: ws });
      dispatch({ type: "SET_ONLINE" });
    }
  }, [status]);

  // Message Event Handler
  useEffect(() => {
    if (status === "OPEN") {
      if (store.connectionStatus) {
        dispatch({ type: "SET_MESSAGES", payload: onMessage });
        console.log("message occured");
      }
    }
  }, [onMessage]);
};

export default RealTimeManager;
