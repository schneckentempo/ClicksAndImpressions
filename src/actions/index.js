import * as types from '../constants/ActionTypes'
import csvToJson from '../utils/csvToJson'

const axios = require('axios')

export const applyData = (csvData, mapping) => {
  const { dimensionValues, normalizedCsv } = csvToJson(csvData, mapping)

  return {
    type: types.APPLY_DATA,
    normalizedCsv,
    dimensionValues,
  }
}

export const processFetchedData = (csvData, badRequest) => ({
  type: types.PROCESS_DATA_REQUEST,
  csvData,
  badRequest,
})

export const changeMapping = mapping => ({
  type: types.CHANGE_MAPPING,
  mapping,
})

export const fetchCsvData = dataSource => (dispatch) => {
  axios.get(dataSource).then((response) => {
    const csvData = response.data

    if (csvData !== '') {
      dispatch(processFetchedData(csvData, false))
    } else {
      dispatch(processFetchedData('', true))
    }
  })
  .catch(() => {
    dispatch(processFetchedData('', true))
  })
}
