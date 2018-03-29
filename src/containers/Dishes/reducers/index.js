import { combineReducers } from 'redux';
import fetchDishReducer from './fetchDishes'
import deleteDishReducer from './deleteDish'
import addDishReducer from './addDish'
import orderDishReducer from './OrderDish'

export const dishesReducer = combineReducers({fetchDishReducer, addDishReducer, deleteDishReducer, orderDishReducer})
