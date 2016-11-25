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


export default new Updater(initialModel, saga)
  .case(ActionTypes.CSV_DATA_SUCCESS, (model, { csvData, mapping, badRequest }) => ({
    ...model,
    csvData,
    mapping,
    badRequest,
  }))
  .case(ActionTypes.CSV_DATA_ERROR, (model, { csvData, mapping, badRequest }) => ({
    ...model,
    csvData,
    mapping,
    badRequest,
  }))
  .case(ActionTypes.CHANGE_SELECTED_DIMENSIONVALUE, (model, { selectedDimensionValue }) => ({
    ...model,
    selectedDimensionValue,
  }))
  .toReducer()
