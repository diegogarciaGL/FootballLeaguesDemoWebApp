import { ACTION_TYPES } from './reducer';
import { MenuState } from './types';

export const useActions = (state: MenuState, dispatch: Function) => ({
  toggleMenu: () => dispatch({ type: ACTION_TYPES.TOGGLE_MENU })
});
