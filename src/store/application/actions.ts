import { createAction } from 'typesafe-actions';

export const toggleLeaguesSecondaryList = createAction(
  'application/TOGGLE_LEAGUES_SECONDARY_LIST',
  resolve => () => resolve()
);

export const toggleLeaguesOnMenu = createAction(
  'application/TOGGLE_LEAGUES_ON_MENU',
  resolve => () => resolve()
);
