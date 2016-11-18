import * as types from '../constants/ActionTypes'
import csvToJson from '../utils/csvToJson'

export const applyData = (csvData, mapping) => {
  const { dimensionValues, normalizedCsv } = csvToJson(csvData, mapping)

  return {
    type: types.APPLY_DATA,
    mapping,
    normalizedCsv,
    dimensionValues,
  }
}

export const fetchDataBadRequest = badRequest => ({
  type: types.DATA_BAD_REQUEST,
  badRequest,
})

export const parseDataMappingError = badMapping => ({
  type: types.DATA_BAD_MAPPING,
  badMapping,
})
