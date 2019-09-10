import { StateType } from 'typesafe-actions';
import { Middleware } from 'redux';
import rootReducer from './root-reducer';

// Middlewares
import { fetchLanguageMiddleware } from './localization/middleware';

// Selectors
import * as localizationSelectors from './localization/selectors';

// Actions
import * as localizationActions from './localization/actions';
import * as menuActions from './menu/actions';

export { default } from './store';
export { default as rootReducer } from './root-reducer';

export const selectors = {
  localization: localizationSelectors
};

export const actions = {
  localization: localizationActions,
  menu: menuActions
}

export const middlewares: Middleware[] = [
  fetchLanguageMiddleware
]

export type RootState = StateType<typeof rootReducer>;