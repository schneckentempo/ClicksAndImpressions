import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import rootSaga from './sagas'
import dimensionMetricsViewerApp from './reducers'
import App from './App'

const sagaMiddleware = createSagaMiddleware()

// 2. arg of createStore should be initial State - put here or in reducer?
const store = createStore(
  dimensionMetricsViewerApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
