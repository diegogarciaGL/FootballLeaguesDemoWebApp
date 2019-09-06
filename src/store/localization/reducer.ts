import * as localization from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { LocalizationState } from './types';

const {
  REACT_APP_DEFAULT_LANGUAGE_ID: defaultLanguageId
} = process.env;

export type LocalizationAction = ActionType<typeof localization>;

const defaultState: LocalizationState = {
  languageId: defaultLanguageId || 'es-CR',
  language: undefined,
  languages: []
}

export default (state = defaultState, action: LocalizationAction): LocalizationState => {
  switch (action.type) {
    case getType(localization.fetchLanguage.success):
      return {
        ...state,
        language: action.payload
      }
    case getType(localization.updateLanguage):
      return {
        ...state,
        languageId: action.payload
      }
    case getType(localization.updateLanguages):
      return {
        ...state,
        languages: action.payload
      }
    default:
      return state;
  }
}