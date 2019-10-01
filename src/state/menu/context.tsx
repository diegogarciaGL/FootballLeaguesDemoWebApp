import React, { FC, createContext, useReducer } from 'react';
import { initialState, reducer } from './reducer';
import { useActions } from './actions';
import { MenuState } from './types';

type ContextType = MenuState & ReturnType<typeof useActions>;

const initialContext: ContextType = {
  ...initialState,
  toggleMenu: () => {}
};

const MenuContext = createContext<ContextType>(initialContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MenuProvider: FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Attach middleware to capture every dispatch
  const actions = useActions(state, dispatch);
  return (
    <MenuContext.Provider value={{ ...state, ...actions }}>
      {children}
    </MenuContext.Provider>
  );
};

export { MenuContext, MenuProvider };
