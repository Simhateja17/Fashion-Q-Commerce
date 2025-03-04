import { createContext, useContext, useReducer } from "react";

const GlobalStateContext = createContext();

const initialState = {
  cart: [],
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export function GlobalStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  return useContext(GlobalStateContext);
}
