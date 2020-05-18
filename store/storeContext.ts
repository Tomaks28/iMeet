import React from "react";
import { Store, StoreActionType } from "../interfaces";

interface Context {
  store: Store;
  dispatch: React.Dispatch<StoreActionType>;
}

export default React.createContext({} as Context);
