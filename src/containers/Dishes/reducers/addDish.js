import {
  REQUEST_POST_DISH,
  POST_REQUEST_SUCCESS,
  POST_DISH_ERROR
} from '../constants';

// The initial state of the App
const initialState = {
  requesting: false,
  success: false,
  error: false,
}

function addDish(state = initialState, action) {
  switch (action.type) {
    case REQUEST_POST_DISH:
    return Object.assign({}, state, {
      requesting: true,
    })
    case POST_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        requesting: false,
        success: true
      })
    case POST_DISH_ERROR:
      return Object.assign({}, state, {
        requesting: false,
        error: true
      })
    default:
      return state;
  }
}

export default addDish
