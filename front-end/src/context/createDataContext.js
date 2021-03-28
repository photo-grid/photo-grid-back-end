/* eslint-disable import/no-anonymous-default-export */
import React, { useReducer } from "react";

/**
 * Links the given actions (Ex: CRUD operatiosn) with a
 * provided state (in this case as a reducer) and hooking it with the
 * application Context and the Provider.
 */
export default (reducer, actions, initialState) => {
  // creating a bare context
  const Context = React.createContext();

  // creating a custom provider
  const Provider = ({ children }) => {
    // creating a user reducer with the provided reducer fucntion
    // and assigning the provided initial state
    const [state, dispatch] = useReducer(reducer, initialState);

    // looping through every function provided while passing the
    // dispatch function of the jsut created reducer, whcih points to
    // a globel state
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    // passing the reducer state and functions linked with reducer's
    // dsipatch function, as values of a object, which is the
    // acessible value of the provider, from the context
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  // returning the context and provider
  return { Context, Provider };
};
