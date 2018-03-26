import {
  LOAD_DISHES_SUCCESS,
  LOAD_DISHES,
  LOAD_DISHES_ERROR,
} from '../constants';

// The initial state of the App
const initialState = {
  loading: false,
  error: false,
  dishes: [],
}

function dishes(state = initialState, action) {
  switch (action.type) {
    case LOAD_DISHES:
    return Object.assign({}, state, {
      loading: true,
    })
    case LOAD_DISHES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        dishes: action.payload
      })
    case LOAD_DISHES_ERROR:
    return Object.assign({}, state, {
      loading: false,
      error: true
    })
    default:
      return state;
  }
}

export default dishes;
