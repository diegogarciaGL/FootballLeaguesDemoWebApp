import { createAction } from 'typesafe-actions';

export const toggleMenu = createAction('menu/TOGGLE_MENU', resolve =>
  () => resolve()
)