import { createContext, useReducer } from "react";
import { autoBidReducer } from "./Reducer";

const InitialState = {
  autoBids: [],
  isFetching: false,
  error: false,
};

export const autoBidContext = createContext(InitialState);

export const AutoBidsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(autoBidReducer, InitialState);
  return (
    <autoBidContext.Provider
      value={{
        autoBids: state.autoBids,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </autoBidContext.Provider>
  );
};
