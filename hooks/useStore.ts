import { useReducer, createContext } from "react";
import { initialStore, reducer } from "../store";

// export const StoreContext = createContext({});

const useStore = () => {
  const [store, dispatch] = useReducer(reducer, initialStore);
  // return { store, dispatch, StoreContext };
  return { store, dispatch };
};

export default useStore;
