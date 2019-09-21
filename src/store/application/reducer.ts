import * as application from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { ApplicationState } from './types';

export type ApplicationAction = ActionType<typeof application>;

const defaultState: ApplicationState = {
  showLeaguesSecondaryList: false,
  showLeaguesOnMenu: false
};

export default (
  state = defaultState,
  action: ApplicationAction
): ApplicationState => {
  switch (action.type) {
    case getType(application.toggleLeaguesSecondaryList):
      return {
        ...state,
        showLeaguesSecondaryList: !state.showLeaguesSecondaryList
      };
    case getType(application.toggleLeaguesOnMenu):
      return {
        ...state,
        showLeaguesOnMenu: !state.showLeaguesOnMenu
      };
    default:
      return state;
  }
};
