export type MessageStatusType = "pending" | "sent" | "received" | "red";
export type HeaderType = "normal" | "back" | "strict-back" | "hide";
export type ActionType =
  | "RESET"
  | "USER_INFO"
  | "SET_WEBSOCKET"
  | "SET_ONLINE"
  | "SET_USERNAME"
  | "SET_TOKEN"
  | "SET_OFFLINE"
  | "GET_MESSAGES"
  | "SET_MESSAGES"
  | "SET_PICTURES"
  | "WS_SEND";

export interface StorePayload {
  type: ActionType;
  payload?: any;
}

export interface Message {
  from: string;
  to: string;
  date: number;
  message: string;
}

export interface Store {
  serverUrl: string;
  webSocketUrl: string;
  ws: WebSocket | null;
  wsStatus: string;
  wsSend: (name: string) => void;
  wsRead: () => void;
  wsOnMessage: () => void;
  wsReconnectionMs: number;
  authenticated: boolean;
  facebookAppID: string;
  token: string;
  username: string;
  email: string;
  messages: Message[] | null;
  pictures: Array<string>;
}

export interface IRealTime {
  store: Store;
  dispatch: React.Dispatch<StorePayload>;
}
