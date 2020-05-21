import { Store, Message } from "../interfaces";

const initialStore: Store = {
  // serverUrl: "http://localhost:4000/",
  serverUrl: "http://192.168.1.49:4000",
  webSocketUrl: "http://localhost:8080",
  facebookAppID: "1234567890",
  connectionStatus: false,
  token: "",
  username: "",
  email: "",
  messages: null,
  webSocketRef: null,
};

export default initialStore;
