import { ACTION_TYPES } from './reducer';
import store from 'store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const applyMiddleware = (dispatch: Function) => async (action: any) => {
  dispatch(action);

  if (action.type !== ACTION_TYPES.UPDATE_LANGUAGE) {
    return;
  }

  dispatch({ type: ACTION_TYPES.FETCH_LANGUAGE_REQUEST });
  try {
    const url = `/locales/${action.payload}.json`;
    const response = await fetch(url);
    const language = await response.json();
    dispatch({
      type: ACTION_TYPES.FETCH_LANGUAGE_SUCCESS,
      payload: language
    });
    store.set('languageId', action.payload);
  } catch (e) {
    dispatch({
      type: ACTION_TYPES.FETCH_LANGUAGE_FAILURE,
      payload: e
    });
  }
};
