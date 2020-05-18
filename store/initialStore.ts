import { Store, Message } from "../interfaces";

const initialStore: Store = {
  connectionStatus: false,
  messages: null,
  onSend: () => {},
};

export default initialStore;
