import { fromJS } from 'immutable';

import {
  LOAD_DISHES_SUCCESS,
  LOAD_DISHES,
  LOAD_DISHES_ERROR,
} from './constants';

// The initial state of the App
const initialState = {
  loading: false,
  error: false,
  dishes: [],
}

function dishes(state = initialState, action) {
  switch (action.type) {
    case LOAD_DISHES:
      return state
        .set('loading', true)

    case LOAD_DISHES_SUCCESS:
      return state
        .setIn('dishes', action.dishes)
        .set('loading', false)
    case LOAD_DISHES_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default dishes;
