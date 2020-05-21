import React from "react";
import { Store, StorePayload } from "../interfaces";

interface Context {
  store: Store;
  dispatch: React.Dispatch<StorePayload>;
}

export default React.createContext({} as Context);
