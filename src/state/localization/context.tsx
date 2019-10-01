import React, { FC, createContext, useReducer } from 'react';
import { initialState, reducer } from './reducer';
import { applyMiddleware } from './middleware';
import { useActions } from './actions';
import { useSelectors } from './selectors';
import { LocalizationState } from './types';
import { Language } from '../../graphql/generated/types';

type ContextType = LocalizationState &
  ReturnType<typeof useActions> &
  ReturnType<typeof useSelectors>;

const initialContext: ContextType = {
  ...initialState,
  updateLanguage: (languageId: string) => languageId,
  updateLanguages: (languages: Language[]) => languages,
  localize: (key: string): string => key,
  activeLanguage: () => undefined,
  availableUnselectedLanguages: () => []
};

const LocalizationContext = createContext<ContextType>(initialContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LocalizationProvider: FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Attach middleware to capture every dispatch
  const enhancedDispatch = applyMiddleware(dispatch);
  const actions = useActions(state, enhancedDispatch);
  const selectors = useSelectors(state);
  return (
    <LocalizationContext.Provider
      value={{ ...state, ...actions, ...selectors }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export { LocalizationContext, LocalizationProvider };
