import { combineReducers } from 'redux';
import localization from './localization/reducer';

const rootReducer = combineReducers({
  localization
});

export default rootReducer;