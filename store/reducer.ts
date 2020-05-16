import initialStore from "./initialStore";
import { StoreActionType, Store } from "../interfaces";

const reducer = (state: Store, action: StoreActionType) => {
  switch (action.type) {
    case "reset":
      return initialStore;
    case "setOnline":
      return { ...state, connectionStatus: true };
    case "setOffline":
      return { ...state, connectionStatus: false };
    case "setMessages":
      return { ...state, messages: action.payload };
    default:
      return state;
  }
};

export default reducer;
