import { combineReducers } from 'redux';
import fetchDishReducer from './dishes'
import changeDishReducer from './changeDish'

export const dishesReducer = combineReducers({fetchDishReducer, changeDishReducer})
