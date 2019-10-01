import React, { FC, createContext, useReducer } from 'react';
import { initialState, reducer } from './reducer';
import { useActions } from './actions';
import { ApplicationState } from './types';

type ContextType = ApplicationState & ReturnType<typeof useActions>;

const initialContext: ContextType = {
  ...initialState,
  toggleLeaguesOnMenu: () => {},
  toggleLeaguesSecondaryList: () => {}
};

const ApplicationContext = createContext<ContextType>(initialContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ApplicationProvider: FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Attach middleware to capture every dispatch
  const actions = useActions(state, dispatch);
  return (
    <ApplicationContext.Provider value={{ ...state, ...actions }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export { ApplicationContext, ApplicationProvider };
