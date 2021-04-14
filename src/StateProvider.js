import React, { createContext, useContext, useReducer } from "react";

// setup data layer
// DATA LAYER
export const StateContext = createContext();

// BUILD A PROVIDER
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// how you use inside component
export const useStateValue = () => useContext(StateContext);
