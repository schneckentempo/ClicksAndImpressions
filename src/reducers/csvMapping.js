import { DATA_BAD_REQUEST, DATA_BAD_MAPPING } from '../constants/ActionTypes'

const initialState = {
  badRequest: true,
}

const csvMapping = (state = initialState, action) => {
  switch (action.type) {
    case DATA_BAD_REQUEST: {
      const { badRequest } = action
      return {
        ...state,
        badRequest,
      }
    }
    default:
      return state
  }
}

export default csvMapping
