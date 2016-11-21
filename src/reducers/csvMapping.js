import { PROCESS_DATA_REQUEST, CHANGE_MAPPING } from '../constants/ActionTypes'
import { DATA_SOURCE_1 } from '../constants/DataSources'
import getMappingFromDatasource from '../utils/getMappingFromDatasource'

const initialState = {
  defaultDataSource: DATA_SOURCE_1,
  mapping: getMappingFromDatasource(DATA_SOURCE_1),
  csvData: '',
  badRequest: false,
}

const csvMapping = (state = initialState, action) => {
  switch (action.type) {
    case PROCESS_DATA_REQUEST: {
      const { csvData, mapping, badRequest } = action
      return {
        ...state,
        csvData,
        mapping,
        badRequest,
      }
    }
    case CHANGE_MAPPING: {
      const { mapping } = action
      return {
        ...state,
        mapping,
      }
    }
    default:
      return state
  }
}

export default csvMapping
