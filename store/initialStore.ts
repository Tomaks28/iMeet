import { Store, Message } from "../interfaces";

const initialStore: Store = {
  serverUrl: "http://localhost:4000/",
  webSocketUrl: "http://localhost:8080",
  facebookAppID: "1234567890",
  connectionStatus: false,
  token: "",
  username: "",
  messages: null,
  webSocketRef: null,
};

export default initialStore;
