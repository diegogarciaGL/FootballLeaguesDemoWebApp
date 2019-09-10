import * as menu from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { MenuState } from './types';

export type MenuAction = ActionType<typeof menu>;

const defaultState: MenuState = {
  open: false
}

export default (state = defaultState, action: MenuAction): MenuState => {
  switch (action.type) {
    case getType(menu.toggleMenu):
      return {
        open: !state.open
      }
    default:
      return state;
  }
}