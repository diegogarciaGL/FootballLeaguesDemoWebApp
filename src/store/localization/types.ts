import { Language } from '../../graphql/generated/types';

export interface LocalizationState {
  languageId: string;
  language?: any | null | undefined,
  languages: Language[]
}