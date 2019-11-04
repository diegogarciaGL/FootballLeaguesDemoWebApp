import { LocalizationState } from './types';

const { REACT_APP_DEFAULT_LANGUAGE_ID: defaultLanguageId } = process.env;

const initialState: LocalizationState = {
  languageId: defaultLanguageId || 'es-CR',
  language: undefined,
  languages: []
};

const ACTION_TYPES = {
  UPDATE_LANGUAGE: 'localization/UPDATE_LANGUAGE',
  FETCH_LANGUAGE: 'localization/FETCH_LANGUAGE',
  FETCH_LANGUAGE_REQUEST: 'localization/FETCH_LANGUAGE_REQUEST',
  FETCH_LANGUAGE_SUCCESS: 'localization/FETCH_LANGUAGE_SUCCESS',
  FETCH_LANGUAGE_FAILURE: 'localization/FETCH_LANGUAGE_FAILURE',
  UPDATE_LANGUAGES: 'localization/UPDATE_LANGUAGES'
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_LANGUAGE:
      return {
        ...state,
        languageId: action.payload
      };
    case ACTION_TYPES.FETCH_LANGUAGE_SUCCESS:
      return {
        ...state,
        language: action.payload
      };
    case ACTION_TYPES.UPDATE_LANGUAGES:
      return {
        ...state,
        languages: action.payload
      };
    default:
      return state;
  }
};

export { initialState, reducer, ACTION_TYPES };
