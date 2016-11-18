import { APPLY_DATA } from '../constants/ActionTypes'

const initialStateCsvDataReducer = {
  csvData: '',
  mapping: {},
  normalizedCsv: [],
  dimensionValues: [],
}

const csvDataReducer = (state = initialStateCsvDataReducer, action) => {
  switch (action.type) {
    case APPLY_DATA:
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

export default csvDataReducer
