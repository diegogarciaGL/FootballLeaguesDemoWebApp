import React, { FC, useContext, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  LANGUAGES_QUERY,
  LanguagesQueryData
} from './graphql/queries/Languages';
import store from 'store';

// Contexts
import { LocalizationContext } from './state/localization/context';

const { REACT_APP_DEFAULT_LANGUAGE_ID: defaultLanguageId } = process.env;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Startup: FC<any> = ({ children }) => {
  const mounted = useRef<boolean>(false);
  const languageId = store.get('languageId') || defaultLanguageId || '';
  const localizationContext = useContext(LocalizationContext);
  const { updateLanguage, updateLanguages } = localizationContext;

  useEffect(() => {
    // Loads initial language only if component has not been "mounted"
    if (!mounted.current) {
      updateLanguage(languageId);
      mounted.current = true;
    }
  });

  function onLanguagesQueryCompleted(data: LanguagesQueryData): void {
    updateLanguages(data.languages);
  }

  useQuery<LanguagesQueryData>(LANGUAGES_QUERY, {
    onCompleted: onLanguagesQueryCompleted
  });

  return <>{children}</>;
};

export default Startup;
