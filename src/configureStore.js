import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { middleware as reduxPackMiddleware } from 'redux-pack'
import createReducer from './reducers'
import thunk from 'redux-thunk';
import { logger } from 'redux-logger'

export default function configureStore(initialState = {}, history) {
  const middlewares = (
      thunk,
      reduxPackMiddleware
    )

    const store = createStore(
      createReducer(),
      initialState,
      applyMiddleware(middlewares)
    );

    return store
}
