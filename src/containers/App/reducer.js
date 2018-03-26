import { fromJS } from 'immutable';

import {
  LOAD_APP_SUCCESS,
  LOAD_APP,
  LOAD_APP_ERROR,
} from './constants';

// The initial state of the App
const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    APPitories: false,
  },
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_APP:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'APPitories'], false);
    case LOAD_APP_SUCCESS:
      return state
        .setIn(['userData', 'APPitories'], action.APP)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_APP_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
