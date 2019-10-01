import { MenuState } from './types';

const initialState: MenuState = {
  open: false
};

const ACTION_TYPES = {
  TOGGLE_MENU: 'menu/TOGGLE_MENU'
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state = initialState, action: any): MenuState => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_MENU:
      return {
        open: !state.open
      };
    default:
      return state;
  }
};

export { initialState, reducer, ACTION_TYPES };
