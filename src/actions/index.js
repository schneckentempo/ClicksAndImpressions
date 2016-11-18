import * as types from '../constants/ActionTypes'
import csvToJson from '../utils/csvToJson'

export const applyData = (csvData, mapping) => {
  const { dimensionValues, normalizedCsv } = csvToJson(csvData, mapping)

  return {
    type: types.APPLY_DATA,
    csvData,
    mapping,
    normalizedCsv,
    dimensionValues,
  }
}
