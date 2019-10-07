import { ApplicationState } from './types';

const initialState: ApplicationState = {
  showLeaguesSecondaryList: false,
  showLeaguesOnMenu: false
  // appBarColor: 'primary',
  // appBarColors: ['default', 'inherit', 'primary', 'secondary']
};

const ACTION_TYPES = {
  TOGGLE_LEAGUES_SECONDARY_LIST: 'application/TOGGLE_LEAGUES_SECONDARY_LIST',
  TOGGLE_LEAGUES_ON_MENU: 'application/TOGGLE_LEAGUES_ON_MENU'
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state = initialState, action: any): ApplicationState => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_LEAGUES_SECONDARY_LIST:
      return {
        ...state,
        showLeaguesSecondaryList: !state.showLeaguesSecondaryList
      };
    case ACTION_TYPES.TOGGLE_LEAGUES_ON_MENU:
      return {
        ...state,
        showLeaguesOnMenu: !state.showLeaguesOnMenu
      };
    default:
      return state;
  }
};

export { initialState, reducer, ACTION_TYPES };
