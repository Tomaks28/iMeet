import { Store, StoreActionType } from "../interfaces";

export const initialStore: Store = {
  connectionStatus: false,
  messages: null,
  webSocketRef: null,
};

export const reducer = (state: Store, action: StoreActionType) => {
  switch (action.type) {
    case "reset":
      return initialStore;
    case "setOnline":
      return { ...state, connectionStatus: true };
    case "setOffline":
      return { ...state, connectionStatus: false };
    case "setMessages":
      return { ...state, messages: action.payload };
    case "setRealTimeSendFunction":
      return { ...state, webSocketRef: action.payload };
    default:
      return state;
  }
};
