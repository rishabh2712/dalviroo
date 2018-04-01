import rp from 'request-promise'
import {
  LOAD_DISHES,
  ADD_DISH,
  DELETE_DISH,
  ORDER_DISHES
} from './constants';
import { apiUrl } from '../../config.js'
import { buildUrl } from '../../utils/apiHelper.js'
let Promise = require("bluebird")

function getApiPromise(body, url, method) {
  var myInit = {
             uri: url,
             method: method,
             headers: {
                 'Content-Type': 'application/json',
                 'User-Agent': 'Request-Promise'
             },
             json: true,
             cache: 'default' }
  return rp(myInit)
}

function postApiPromise(body, url, method) {
  var myInit = {
    body: JSON.stringify(body), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
    'user-agent': 'Mozilla/4.0 MDN Example',
    'content-type': 'application/json'
    },
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // *manual, follow, error
    referrer: 'no-referrer', // *client, no-referrer
    }
  return fetch(url, myInit)
}

export function fetchDishes() {
  return {
    type: LOAD_DISHES,
    promise: getApiPromise({}, apiUrl, 'GET')
  }
}

export function postDish(body, method, url) {
  return dispatch => {
    dispatch({
      type: ADD_DISH,
      promise: postApiPromise(body, apiUrl+url, method),
      meta: {
        onSuccess: (result, getState) => {
          dispatch(fetchDishes())
        }
      }
    })
  }
}

export function deleteDish(id) {
  let url = apiUrl+'/'+id
  return dispatch => {
    dispatch({
      type: DELETE_DISH,
      promise: postApiPromise({}, url, 'DELETE'),
      meta: {
        onSuccess: (result, getState) => {
        dispatch(fetchDishes())
        }
      }
    })
  }
}

export function orderDishes(dishes) {
  return {
    type: ORDER_DISHES,
    promise: Promise.map(dishes, item => {
      let url = apiUrl +'/'+item.dish._id+'/order'
      postApiPromise({quantity: item.counter}, url, 'POST')
    }),
    meta: {
           onSuccess: (result, getState) => {
          }
        }
    }
  }
