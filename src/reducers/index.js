import { combineReducers } from 'redux'
import csvDataReducer from './csvDataReducer'

const dimensionMetricsViewerApp = combineReducers({
  csvDataReducer,
})

export default dimensionMetricsViewerApp
