/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import search from './search';
import home from './home';
import auth from './auth';
import favorites from './favorites';

const appReducer = combineReducers({ search, home, auth, favorites });

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
