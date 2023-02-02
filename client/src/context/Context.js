import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

//Here we define an initial state
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

//We make INITIAL_STATE a global state
export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  // For our ContextProvider function we use useReducer method
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}{" "}
    </Context.Provider>
  );
};
