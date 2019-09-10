import React, { FunctionComponent } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { actions } from './store';
import {
  LANGUAGES_QUERY,
  LanguagesQueryData
} from './graphql/queries/Languages';
import { Language } from './graphql/generated/types';
import store from 'store';

const { REACT_APP_DEFAULT_LANGUAGE_ID: defaultLanguageId } = process.env;

const mapDispatchToProps = {
  updateLanguage: (languageId: string) =>
    actions.localization.updateLanguage(languageId),
  updateLanguages: (languages: Language[]) =>
    actions.localization.updateLanguages(languages)
};

type Props = typeof mapDispatchToProps;

const Startup: FunctionComponent<Props> = ({
  children,
  updateLanguage,
  updateLanguages
}) => {
  updateLanguage(store.get('languageId') || defaultLanguageId || '');

  function onLanguagesQueryCompleted(data: LanguagesQueryData): void {
    updateLanguages(data.languages);
  }

  useQuery<LanguagesQueryData>(LANGUAGES_QUERY, {
    onCompleted: onLanguagesQueryCompleted
  });

  return <>{children}</>;
};

export default connect(
  null,
  mapDispatchToProps
)(Startup);
