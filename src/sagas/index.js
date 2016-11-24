import { take, put, call } from 'redux-saga/effects'
import * as actionTypes from '../constants/ActionTypes'
import * as actions from '../actions'

const axios = require('axios')

export function fetchCsvDataApi(dataSource) {
  return axios.get(dataSource).then(
    response => response
  )
  .then(
    response => ({ response }),
    error => ({ error: error.message || 'Something bad happened' })
  )
}


export default function* root() {
  while (true) {
    const { dataSource, mapping } = yield take(actionTypes.CSV_DATA_REQUEST)
    const { response, error } = yield call(fetchCsvDataApi, dataSource)

    if (response) {
      if (response.data !== '') {
        const csvData = response.data
        yield put(actions.fetchCsvDataSuccess(csvData, mapping, false))
      } else {
        yield put(actions.fetchCsvDataError('', {}, true))
      }
    } else if (error) {
      yield put(actions.fetchCsvDataError('', {}, true))
    }
  }
}
