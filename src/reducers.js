import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';

import {dishesReducer as dishes} from './containers/Dishes/reducers'
import appReducer from './containers/App/reducers'

const initialState = {}

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
    app: appReducer,
    dishes,
  })
}
