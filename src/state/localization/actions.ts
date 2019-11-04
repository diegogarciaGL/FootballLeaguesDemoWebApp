import { ACTION_TYPES } from './reducer';
import { LocalizationState } from './types';
import { Language } from '../../graphql/generated/types';

export const useActions = (state: LocalizationState, dispatch: Function) => ({
  updateLanguage: (languageId: string) =>
    dispatch({ type: ACTION_TYPES.UPDATE_LANGUAGE, payload: languageId }),
  updateLanguages: (languages: Language[]) =>
    dispatch({ type: ACTION_TYPES.UPDATE_LANGUAGES, payload: languages })
});
