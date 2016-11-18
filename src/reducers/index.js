import { combineReducers } from 'redux'
import dataSource from './dataSource'
import csvMapping from './csvMapping'

const dimensionMetricsViewerApp = combineReducers({
  dataSource,
  csvMapping,
})

export default dimensionMetricsViewerApp
