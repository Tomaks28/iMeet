import initialStore from "./initialStore";
import { StoreActionType, Store } from "../interfaces";

const reducer = (state: Store, action: StoreActionType) => {
  switch (action.type) {
    case "RESET":
      return initialStore;
    case "SET_ONLINE":
      return { ...state, connectionStatus: true };
    case "SET_OFFLINE":
      return { ...state, connectionStatus: false };
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "WS_SEND":
      return { ...state, onSend: action.payload };
    default:
      return state;
  }
};

export default reducer;
