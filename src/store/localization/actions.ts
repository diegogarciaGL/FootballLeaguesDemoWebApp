import { createAction, createAsyncAction } from 'typesafe-actions';
import { Language } from '../../graphql/generated/types';

export const fetchLanguage = createAsyncAction(
  'language/FETCH_REQUEST',
  'language/FETCH_SUCCESS',
  'language/FETCH_FAILURE'
)<void, object, Error>();

export const updateLanguage = createAction('language/UPDATE_LANGUAGE', resolve =>
  (languageId: string) => resolve(languageId)
)

export const updateLanguages = createAction('language/UPDATE_LANGUAGES', resolve =>
  (languages: Language[]) => resolve(languages)
)
