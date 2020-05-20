export type MessageStatusType = "pending" | "sent" | "received" | "red";
export type HeaderType = "normal" | "back" | "strict-back" | "hide";
export type ActionType =
  | "RESET"
  | "SET_ONLINE"
  | "SET_USERNAME"
  | "SET_OFFLINE"
  | "GET_MESSAGES"
  | "SET_MESSAGES"
  | "WS_SEND";

export interface StoreActionType {
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
  facebookAppID: string;
  connectionStatus: boolean;
  token: string;
  username: string;
  messages: Message[] | null;
  webSocketRef: WebSocket | null;
}
