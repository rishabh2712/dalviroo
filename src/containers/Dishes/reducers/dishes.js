import {
  LOAD_DISHES
} from '../constants';
import { handle } from 'redux-pack'
// The initial state of the App
const initialState = {
  requesting: false,
  error: false,
  dishes: [],
}

export function fetchDishReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case LOAD_DISHES:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          requesting: true,
          error: null,
          dishes: []
        }),
        finish: prevState => ({ ...prevState, requesting: false }),
        failure: prevState => ({ ...prevState, error:true, success: false, dishes: []}),
        success: prevState => ({ ...prevState, error: false, success:true, dishes: payload }),
      });
    default:
      return state;
  }
}


export default fetchDishReducer;
