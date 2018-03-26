import { CALL_API } from 'redux-api-middleware'
import {
  LOAD_DISHES,
  LOAD_DISHES_SUCCESS,
  LOAD_DISHES_ERROR,
} from './constants';
import { apiUrl } from '../../config.js'
import { buildUrl } from '../../utils/apiHelper.js'


export function fetchDishes() {
  return {
    [CALL_API]: {
      endpoint: apiUrl,
      method: 'GET',
      types: [LOAD_DISHES, LOAD_DISHES_SUCCESS, LOAD_DISHES_ERROR]
    }
  }
}
