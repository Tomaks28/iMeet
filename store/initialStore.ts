import { Store, Message } from "../interfaces";

const initialStore: Store = {
  serverUrl: "http://192.168.1.49:4000",
  webSocketUrl: "ws://192.168.1.49:8080",
  wsStatus: "CLOSE",
  ws: null,
  wsSend: () => {},
  wsRead: () => {},
  wsOnMessage: () => {},
  wsReconnectionMs: 5000,
  authenticated: false,
  facebookAppID: "1234567890",
  token: "",
  username: "",
  email: "",
  messages: null,
};

export default initialStore;
