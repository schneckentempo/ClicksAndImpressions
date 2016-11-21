import { APPLY_DATA } from '../constants/ActionTypes'

const initialState = {
  normalizedCsv: [],
  dimensionValues: [],
}

const dataSource = (state = initialState, action) => {
  switch (action.type) {
    case APPLY_DATA: {
      const { normalizedCsv, dimensionValues } = action
      return {
        normalizedCsv,
        dimensionValues,
      }
    }
    default:
      return state
  }
}

export default dataSource
