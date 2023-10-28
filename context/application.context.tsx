"use client";

import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";

type State = {
  currentRepo: { id: string; name: string } | null;
};
type Action =
  | { type: "add-current-repo"; payload: { id: string; name: string } }
  | { type: "reset-repo" };

const initialState: State = {
  currentRepo: { id: "", name: "Repositority" },
};

const ApplicationContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

type ApplicationProviderProps = {
  children: ReactNode;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "add-current-repo":
      return { ...state, currentRepo: action.payload };
    case "reset-repo":
      return { ...state, currentRepo: initialState.currentRepo };
    default:
      return state;
  }
}

function ApplicationProvider({ children }: ApplicationProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ApplicationContext.Provider value={{ state, dispatch }}>
      {children}
    </ApplicationContext.Provider>
  );
}

function useApplication() {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error("useApplication must be used within a CounterProvider");
  }
  return context;
}

export { ApplicationProvider, useApplication };