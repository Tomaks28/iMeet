import initialStore from "./initialStore";
import { StoreActionType, Store } from "../interfaces";

const reducer = (state: Store, { type, payload }: StoreActionType) => {
  switch (type) {
    case "RESET":
      return initialStore;
    case "USER_INFO":
      return {
        ...state,
        username: payload.username,
        token: payload.token,
        email: payload.email,
      };
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
