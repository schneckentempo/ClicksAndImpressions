import { expect } from 'chai'
import reducer from '../../reducers'
import * as types from '../../constants/ActionTypes'
import { DATA_SOURCE_1 } from '../../constants/DataSources'

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.eql(
      {
        defaultDataSource: DATA_SOURCE_1,
        mapping: {},
        csvData: '',
        badRequest: false,
        selectedDimensionValue: '',
      }
    )
  })

  it('should handle PROCESS_DATA_REQUEST', () => {
    expect(
        reducer(undefined, {
          type: types.PROCESS_DATA_REQUEST,
          csvData: 'some csvData',
          badRequest: false,
        })
      ).to.eql(
      {
        defaultDataSource: DATA_SOURCE_1,
        mapping: {},
        csvData: 'some csvData',
        badRequest: false,
        selectedDimensionValue: '',
      }
      )
  })

  it('should handle CHANGE_MAPPING', () => {
    expect(
      reducer(undefined, {
        type: types.CHANGE_MAPPING,
        mapping: { abc: 123 },
      })
    ).to.eql(
      {
        defaultDataSource: DATA_SOURCE_1,
        mapping: { abc: 123 },
        csvData: '',
        badRequest: false,
        selectedDimensionValue: '',
      }
    )
  })

  it('should handle SELECTED_DIMENSIONVALUE', () => {
    expect(
      reducer(undefined, {
        type: types.SELECTED_DIMENSIONVALUE,
        selectedDimensionValue: 'some Value',
      })
    ).to.eql(
      {
        defaultDataSource: DATA_SOURCE_1,
        mapping: {},
        csvData: '',
        badRequest: false,
        selectedDimensionValue: 'some Value',
      }
    )
  })
})
