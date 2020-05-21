import initialStore from "./initialStore";
import { StorePayload, Store } from "../interfaces";

const reducer = (state: Store, { type, payload }: StorePayload) => {
  switch (type) {
    case "RESET":
      return initialStore;
    case "USER_INFO":
      return {
        ...state,
        authenticated: payload.auth,
        username: payload.username,
        token: payload.token,
        email: payload.email,
      };
    case "SET_WEBSOCKET":
      const { wsStatus, wsSend, wsRead, wsOnMessage } = payload;
      return { ...state, wsStatus, wsSend, wsRead, wsOnMessage };
    case "SET_TOKEN":
      return { ...state, token: payload };
    case "SET_USERNAME":
      return { ...state, username: payload };
    case "SET_ONLINE":
      return { ...state, connectionStatus: true };
    case "SET_OFFLINE":
      return { ...state, connectionStatus: false };
    case "SET_MESSAGES":
      return { ...state, messages: payload };
    default:
      return state;
  }
};

export default reducer;
