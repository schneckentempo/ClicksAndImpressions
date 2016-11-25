import { put, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import * as ActionTypes from '../constants/ActionTypes'
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

export function* processCsvDataRequest({ dataSource, mapping }) {
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

export default function* root() {
  yield takeEvery(ActionTypes.CSV_DATA_REQUEST, processCsvDataRequest)
}
