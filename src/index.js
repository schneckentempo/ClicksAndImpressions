import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import thunk from 'redux-thunk'
import App from './App'
import reducer from './reducers/csvDataReducer'

// 2. arg of createStore should be initial State - put here or in reducer?
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

store.subscribe(() =>
  console.log(store.getState())
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
