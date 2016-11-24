import * as ActionTypes from '../constants/ActionTypes'
import { DATA_SOURCE_1 } from '../constants/DataSources'

const initialState = {
  defaultDataSource: DATA_SOURCE_1,
  mapping: {},
  csvData: '',
  badRequest: false,
  selectedDimensionValue: '',
}

const dimensionMetricsViewerApp = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CSV_DATA_SUCCESS: {
      const { csvData, mapping, badRequest } = action
      return {
        ...state,
        csvData,
        mapping,
        badRequest,
      }
    }
    case ActionTypes.CSV_DATA_ERROR: {
      const { csvData, mapping, badRequest } = action
      return {
        ...state,
        csvData,
        mapping,
        badRequest,
      }
    }
    case ActionTypes.CHANGE_MAPPING: {
      const { mapping } = action
      return {
        ...state,
        mapping,
      }
    }
    case ActionTypes.CHANGE_SELECTED_DIMENSIONVALUE: {
      const { selectedDimensionValue } = action
      return {
        ...state,
        selectedDimensionValue,
      }
    }
    default:
      return state
  }
}

export default dimensionMetricsViewerApp
