import {
  ADD_DISH,
  DELETE_DISH
} from '../constants'
import { handle } from 'redux-pack'
// The initial state of the App
const initialState = {
  requesting: false,
  success: false,
  error: false,
  dish: {}
}


export function deleteDishReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case DELETE_DISH:
    return handle(state, action, {
      start: prevState => ({
        ...prevState,
        requesting: true,
        error: null,
        dish: {}
      }),
      finish: prevState => ({ ...prevState, requesting: false }),
      failure: prevState => ({ ...prevState, success: false, dish: {}}),
      success: prevState => ({ ...prevState, success:true, dish: payload }),
    });
    default:
      return state;
  }
}


export default deleteDishReducer
