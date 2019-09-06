import { LocalizationState } from './types';
import { Language } from '../../graphql/generated/types';

export function localize(state: LocalizationState, key: string): any | null | undefined {
  if (state.language && key) {
    const keys = key.split('.');
    const kNum = keys.length;
    let language = state.language;
    let _key = '';

    for (let k = 0; k < kNum; k++) {
      _key = keys[k];

      if (language) {
        language = language[_key];
      }
    }

    return language || '';
  }
  return '';
}

export function availableUnselectedLanguages(state: LocalizationState): Language[] {
  const { languageId: currentLanguageId } = state;
  return state.languages.filter(l => l.languageId !== currentLanguageId);
}

export function activeLanguage(state: LocalizationState): Language | undefined {
  const { languageId: currentLanguageId } = state;
  return state.languages.find(l => l.languageId === currentLanguageId);
}