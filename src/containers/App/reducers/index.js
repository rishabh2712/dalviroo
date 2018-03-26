import { fromJS } from 'immutable';

import {
  LOAD_APP_SUCCESS,
  LOAD_APP,
  LOAD_APP_ERROR,
} from '../constants';

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
      return Object.assign({}, state, {
        loading: true,
      })
    case LOAD_APP_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false
      })
    case LOAD_APP_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      })
    default:
      return state;
  }
}

export default appReducer;
