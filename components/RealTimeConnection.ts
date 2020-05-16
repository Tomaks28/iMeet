import React, { useState, useEffect } from "react";

import { useWebSocket, useTimer } from "../hooks";

const RealTimeConnection = () => {
  // useWebSocket("localhost:8080", 1000, true);
  // useEffect(() => {
  //   if (ws) {
  //     ws.onmessage = (e) => {
  //       const message = JSON.parse(e.data);
  //       console.log(message);
  //     };
  //   } else {
  //   }
  // }, []);
};

export default RealTimeConnection;
