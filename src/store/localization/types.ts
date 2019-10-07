import { Language } from '../../graphql/generated/types';

export interface LocalizationState {
  languageId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  language?: any | null | undefined;
  languages: Language[];
}
