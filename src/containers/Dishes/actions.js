import { CALL_API } from 'redux-api-middleware'
import {
  LOAD_DISHES,
  LOAD_DISHES_SUCCESS,
  LOAD_DISHES_ERROR,
  INVALIDATE_DISHES,
  REQUEST_POST_DISH,
  POST_REQUEST_SUCCESS,
  POST_DISH_ERROR
} from './constants';
import { apiUrl } from '../../config.js'
import { buildUrl } from '../../utils/apiHelper.js'


export function fetchDishes() {
  return function (dispatch) {
     dispatch(loadDishes())
     return fetch(apiUrl)
     .then(
       res => dispatch(loadDishesSuccess(res.json()))
     )
     .catch(err => dispatch(loadDishesError) )
   }
}

function loadDishes() {
  return {
    type: 'LOAD_DISHES'
  }
}

function loadDishesSuccess() {
  return {
    type: 'LOAD_DISHES_SUCCESS'
  }
}

function loadDishesError(err) {
  return {
    type: 'LOAD_DISHES_ERROR'
  }
}
export function postDish(body) {
  return {
    [CALL_API]: {
      endpoint: apiUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      types: [REQUEST_POST_DISH, POST_REQUEST_SUCCESS, POST_DISH_ERROR]
    }
  }
}
