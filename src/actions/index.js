import * as types from '../constants/ActionTypes'

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
  type: types.CHANGE_SELECTED_DIMENSIONVALUE,
  selectedDimensionValue,
})

export const fetchCsvData = (dataSource) => {
  return {
    type: types.FETCH_CSV_DATA,
    dataSource,
  }
}
