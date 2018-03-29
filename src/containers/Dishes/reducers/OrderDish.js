import {
  ORDER_DISHES
} from '../constants';
import { handle } from 'redux-pack'
// The initial state of the App
const initialState = {
  requesting: false,
  error: false,
  success: false
}

export function orderDishReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case ORDER_DISHES:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          requesting: true,
          error: null,
          success: false
        }),
        finish: prevState => ({ ...prevState, requesting: false }),
        failure: prevState => ({ ...prevState, error:true, success: false, requesting: false}),
        success: prevState => ({ ...prevState, error: false, success:true, requesting: false }),
      });
    default:
      return state;
  }
}


export default orderDishReducer;
