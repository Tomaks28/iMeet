import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:8080");
ws.on("open", function () {
  ws.send("something");
});
ws.on("message", (data: any) => {
  console.log(data);
});
