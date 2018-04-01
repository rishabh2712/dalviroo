import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';

import {dishesReducer as dishes} from './containers/Dishes/reducers'
import appReducer from './containers/App/reducers'

const initialState = {}

export default function createReducer() {
  return combineReducers({
    app: appReducer,
    dishes
  })
}
