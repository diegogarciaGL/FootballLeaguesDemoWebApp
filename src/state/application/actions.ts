import { ACTION_TYPES } from './reducer';
import { ApplicationState } from './types';

export const useActions = (state: ApplicationState, dispatch: Function) => ({
  toggleLeaguesSecondaryList: () =>
    dispatch({ type: ACTION_TYPES.TOGGLE_LEAGUES_SECONDARY_LIST }),
  toggleLeaguesOnMenu: () =>
    dispatch({ type: ACTION_TYPES.TOGGLE_LEAGUES_ON_MENU })
});
