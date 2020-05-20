import { Store, StoreActionType } from "../interfaces";
import initialStore from "./initialStore";

export const reducer = (state: Store, action: StoreActionType) => {
  switch (action.type) {
    case "RESET":
      return initialStore;
    case "SET_ONLINE":
      return { ...state, connectionStatus: true };
    case "SET_OFFLINE":
      return { ...state, connectionStatus: false };
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    // case "setRealTimeSendFunction":
    // return { ...state, webSocketRef: action.payload };
    default:
      return state;
  }
};
