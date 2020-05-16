export type MessageStatusType = "pending" | "sent" | "received" | "red";
export type HeaderType = "normal" | "back" | "hide";
export type ActionType =
  | "reset"
  | "setOnline"
  | "setOffline"
  | "getMessages"
  | "setMessages";
export type StoreActionType = { type: ActionType; payload: any };

export interface Message {
  from: string;
  to: string;
  date: number;
  message: string;
}

export interface Store {
  connectionStatus: boolean;
  messages: Message[] | null;
}
