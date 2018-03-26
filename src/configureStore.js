import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createReducer from './reducers'
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import { logger } from 'redux-logger'

export default function configureStore(initialState = {}, history) {
  const middlewares = (
      routerMiddleware(history),
      thunk,
      logger,
      apiMiddleware
    )

    const store = createStore(
      createReducer(),
      initialState,
      compose(applyMiddleware(middlewares))
    );

    return store
}
