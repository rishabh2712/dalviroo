import { combineReducers } from 'redux';
import dishes from './dishes'
import addDish from './addDish'

export const dishesReducer = combineReducers({dishes, addDish})
