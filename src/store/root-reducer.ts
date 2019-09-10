import { combineReducers } from 'redux';
import localization from './localization/reducer';
import menu from './menu/reducer';

const rootReducer = combineReducers({
  localization,
  menu
});

export default rootReducer;