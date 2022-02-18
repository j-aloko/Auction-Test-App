import { createContext, useReducer } from "react";
import { productReducer } from "./Reducer";

const InitialState = {
  product: {},
  isFetching: false,
  error: false,
};

export const productContext = createContext(InitialState);

export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, InitialState);
  return (
    <productContext.Provider
      value={{
        product: state.product,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </productContext.Provider>
  );
};
