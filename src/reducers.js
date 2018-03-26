import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import dishes from './containers/Dishes/reducer'
import appReducer from './containers/App/reducer'

import { fromJS } from 'immutable';


const initialState = fromJS(window.__INITIAL_STATE__);

function routeReducer(state = initialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return Object.assign({}, state, {state: action.payload})
    default:
      return state;
  }
}

export default function createReducer() {
  return combineReducers({
    route: routeReducer,
    app: appReducer,
    dishes: dishes,
  })
}
