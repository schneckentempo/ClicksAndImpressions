import * as types from '../constants/ActionTypes'

const axios = require('axios')

// should this be splitted into 2 actions?
export const processFetchedData = (csvData, badRequest) => ({
  type: types.PROCESS_DATA_REQUEST,
  csvData,
  badRequest,
})

export const changeMapping = mapping => ({
  type: types.CHANGE_MAPPING,
  mapping,
})

export const changeSelectedDimensionValue = selectedDimensionValue => ({
  type: types.SELECTED_DIMENSIONVALUE,
  selectedDimensionValue,
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
