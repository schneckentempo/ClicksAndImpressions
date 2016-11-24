import { take, put, call } from 'redux-saga/effects'
import * as actionTypes from '../constants/ActionTypes'
import * as actions from '../actions'

const axios = require('axios')

export function fetchCsvDataApi(dataSource) {
  return axios.get(dataSource).then((response) => {
    const csvData = response.data

    if (csvData !== '') {
      return { csvData, badRequest: false }
    }

    return { csvData, badRequest: true }
  })
  .catch(() => (
    { csvData: '', badRequest: true })
  )
}


export default function* root() {
  while (true) {
    const { dataSource } = yield take(actionTypes.FETCH_CSV_DATA)
    const { csvData, badRequest } = yield call(fetchCsvDataApi, dataSource)
    yield put(actions.processFetchedData(csvData, badRequest))
  }
}
