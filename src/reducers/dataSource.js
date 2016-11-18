import { APPLY_DATA } from '../constants/ActionTypes'
import { DATA_SOURCE_1 } from '../constants/DataSources'
import getMappingFromDatasource from '../utils/getMappingFromDatasource'

const initialState = {
  defaultDataSource: DATA_SOURCE_1,
  mapping: getMappingFromDatasource(DATA_SOURCE_1),
  normalizedCsv: [],
  dimensionValues: [],
}

const dataSource = (state = initialState, action) => {
  switch (action.type) {
    case APPLY_DATA: {
      const { mapping, normalizedCsv, dimensionValues } = action
      return {
        mapping,
        normalizedCsv,
        dimensionValues,
      }
    }
    default:
      return state
  }
}

export default dataSource
