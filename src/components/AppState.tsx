import React, { createContext, useContext } from "react";
import { useState } from "react";

interface AppStateValue {
  cart: {
    items: { id: number; name: string; price: number; quantity: number }[];
  };
}

const defaultStateValue: AppStateValue = {
  cart: {
    items: [],
  },
};

export const AppStateContext = createContext(defaultStateValue);

export const AppSetStateContext = createContext<
  React.Dispatch<React.SetStateAction<AppStateValue>> | undefined
>(undefined);

export const useSetState = () => {
  const setState = useContext(AppSetStateContext);
  if (!setState) {
    throw new Error(
      "useSetState was called outside of the AppSetStateContext Component"
    );
  }
  return setState;
};

const AppStateProvider: React.FC = (props) => {
  const [state, setState] = useState(defaultStateValue);
  return (
    <AppStateContext.Provider value={state}>
      <AppSetStateContext.Provider value={setState}>
        {props.children}
      </AppSetStateContext.Provider>
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
