import { expect } from 'chai'
import * as actions from '../../actions/'
import * as types from '../../constants/ActionTypes'

describe('actions', () => {
  it('should create an action to fetch data, already carrying the mapping for success', () => {
    const mapping = {}
    const dataSource = 'www.datasource'
    const expectedAction = {
      type: types.CSV_DATA_REQUEST,
      dataSource,
      mapping,
    }
    expect(actions.fetchCsvData(dataSource, mapping)).to.eql(expectedAction)
  })

  it('should create an action to assign fetched data on success of request', () => {
    const csvData = 'some csv-data'
    const mapping = { map: 1 }
    const badRequest = false
    const expectedAction = {
      type: types.CSV_DATA_SUCCESS,
      csvData,
      mapping,
      badRequest,
    }
    expect(actions.fetchCsvDataSuccess(csvData, mapping, badRequest)).to.eql(expectedAction)
  })

  it('should create an action to reset data on fail of request', () => {
    const csvData = ''
    const mapping = {}
    const badRequest = true
    const expectedAction = {
      type: types.CSV_DATA_ERROR,
      csvData,
      mapping,
      badRequest,
    }
    expect(actions.fetchCsvDataError(csvData, mapping, badRequest)).to.eql(expectedAction)
  })

  it('should create an action to assign the new selected dimensionvalue', () => {
    const selectedDimensionValue = 'some Value'
    const expectedAction = {
      type: types.CHANGE_SELECTED_DIMENSIONVALUE,
      selectedDimensionValue,
    }
    expect(actions.changeSelectedDimensionValue(selectedDimensionValue)).to.eql(expectedAction)
  })
})
