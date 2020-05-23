import { Store, Message } from "../interfaces";
import { serverUrl, webSocketUrl } from "../constants";

const initialStore: Store = {
  serverUrl,
  webSocketUrl,
  wsStatus: "CLOSE",
  ws: null,
  wsSend: (message: string) => {},
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
