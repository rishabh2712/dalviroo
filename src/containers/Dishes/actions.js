import { CALL_API } from 'redux-api-middleware'
import {
  LOAD_DISHES,
  LOAD_DISHES_SUCCESS,
  LOAD_DISHES_ERROR,
} from './constants';
import { apiUrl } from '../../config.js'
import { buildUrl } from '../../utils/apiHelper.js'


export function fetchDishes(params) {
  console.log(buildUrl(apiUrl, params))
  return {
    [CALL_API]: {
      endpoint: buildUrl(apiUrl, params),
      method: 'GET',
      types: [LOAD_DISHES, LOAD_DISHES_SUCCESS, LOAD_DISHES_ERROR]
    }
  }
}
