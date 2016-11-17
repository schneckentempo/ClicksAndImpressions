import React from 'react'
import { createStore } from 'redux'
import ReactDOM from 'react-dom'
import App from './App'

const initialState = {
  csvData: '',
  mapping: {},
  normalizedCsv: [],
  dimensionValues: [],
}

// reducer
const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'APPLY_DATA':
      return {
        csvData: action.csvData,
        mapping: action.mapping,
        normalizedCsv: action.normalizedCsv,
        dimensionValues: action.dimensionValues,
      }
    default:
      return state
  }
}

const store = createStore(dataReducer)

store.subscribe(() =>
  console.log(store.getState())
)

ReactDOM.render(<App store={store} />, document.getElementById('root'))
