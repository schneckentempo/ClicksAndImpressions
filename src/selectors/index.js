import { createSelector } from 'reselect'
import csvToJson from '../utils/csvToJson'

const getCsvData = ({ csvData }) => csvData
const getMapping = ({ mapping }) => mapping

export const computeNormalizedData = createSelector(
  [getCsvData, getMapping],
  (csvData, mapping) => csvToJson(csvData, mapping)
)
