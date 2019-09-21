import { combineReducers } from 'redux';
import localization from './localization/reducer';
import menu from './menu/reducer';
import application from './application/reducer';

const rootReducer = combineReducers({
  localization,
  menu,
  application
});

export default rootReducer;
