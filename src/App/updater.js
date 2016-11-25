import { Updater } from 'redux-elm'
import saga from '../sagas'
import * as ActionTypes from '../constants/ActionTypes'
import { DATA_SOURCE_1 } from '../constants/DataSources'

export const initialModel = {
  defaultDataSource: DATA_SOURCE_1,
  mapping: {},
  csvData: '',
  badRequest: false,
  selectedDimensionValue: '',
}

const handleCsvDataSuccess = (model, { csvData, mapping, badRequest }) => ({
  ...model,
  csvData,
  mapping,
  badRequest,
})

const handleCsvDataError = (model, { csvData, mapping, badRequest }) => ({
  ...model,
  csvData,
  mapping,
  badRequest,
})

const handleChangeDimensionValue = (model, { selectedDimensionValue }) => ({
  ...model,
  selectedDimensionValue,
})

export default new Updater(initialModel, saga)
  .case(ActionTypes.CSV_DATA_SUCCESS, handleCsvDataSuccess)
  .case(ActionTypes.CSV_DATA_ERROR, handleCsvDataError)
  .case(ActionTypes.CHANGE_SELECTED_DIMENSIONVALUE, handleChangeDimensionValue)
  .toReducer()
