import { expect } from 'chai'
import * as actions from '../../actions/'
import * as types from '../../constants/ActionTypes'

describe('actions', () => {
  it('should create an action to assign fetched data and success of request', () => {
    const badRequest = false
    const csvData = 'some csvData'
    const expectedAction = {
      type: types.PROCESS_DATA_REQUEST,
      csvData,
      badRequest,
    }
    expect(actions.processFetchedData(csvData, badRequest)).to.eql(expectedAction)
  })

  it('should create an action to assign the new selected dimensionvalue', () => {
    const selectedDimensionValue = 'some Value'
    const expectedAction = {
      type: types.SELECTED_DIMENSIONVALUE,
      selectedDimensionValue,
    }
    expect(actions.changeSelectedDimensionValue(selectedDimensionValue)).to.eql(expectedAction)
  })

  it('should create an action to assign a new mapping', () => {
    const mapping = { abc: 123 }
    const expectedAction = {
      type: types.CHANGE_MAPPING,
      mapping,
    }
    expect(actions.changeMapping(mapping)).to.eql(expectedAction)
  })
})
