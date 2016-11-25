import * as types from '../constants/ActionTypes'

export const changeMapping = mapping => ({
  type: types.CHANGE_MAPPING,
  mapping,
})

export const changeSelectedDimensionValue = selectedDimensionValue => ({
  type: types.CHANGE_SELECTED_DIMENSIONVALUE,
  selectedDimensionValue,
})

export const fetchCsvDataSuccess = (csvData, mapping, badRequest) => ({
  type: types.CSV_DATA_SUCCESS,
  csvData,
  mapping,
  badRequest,
})

export const fetchCsvDataError = (csvData, mapping, badRequest) => ({
  type: types.CSV_DATA_ERROR,
  csvData,
  mapping,
  badRequest,
})

export const fetchCsvData = (dataSource, mapping) => ({
  type: types.CSV_DATA_REQUEST,
  dataSource,
  mapping,
})

export const addWidget = () => ({
  type: types.ADD_WIDGET,
})
