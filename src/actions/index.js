import * as types from '../constants/ActionTypes'
import csvToJson from '../utils/csvToJson'
import getMappingFromDatasource from '../utils/getMappingFromDatasource'

const axios = require('axios')

export const applyData = (csvData, mapping) => {
  const { dimensionValues, normalizedCsv } = csvToJson(csvData, mapping)

  return {
    type: types.APPLY_DATA,
    normalizedCsv,
    dimensionValues,
  }
}

export const processFetchedData = (csvData, mapping, badRequest) => ({
  type: types.PROCESS_DATA_REQUEST,
  csvData,
  mapping,
  badRequest,
})

export const changeMapping = mapping => ({
  type: types.CHANGE_MAPPING,
  mapping,
})

export const fetchCsvData = dataSource => (dispatch) => {
  axios.get(dataSource).then((response) => {
    const csvData = response.data
    const mapping = response.data !== '' ? getMappingFromDatasource(dataSource) : {}

    if (csvData !== '') {
      dispatch(processFetchedData(csvData, mapping, false))
    } else {
      dispatch(processFetchedData('', {}, true))
    }
  })
  .catch(() => {
    dispatch(processFetchedData('', {}, true))
  })
}
