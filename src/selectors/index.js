import { createSelector } from 'reselect'
import csvToJson from '../utils/csvToJson'
import getSum from '../utils/getSum'

const getCsvData = ({ csvData }) => csvData
const getMapping = ({ mapping }) => mapping

export const computeNormalizedData = createSelector(
  [getCsvData, getMapping],
  (csvData, mapping) => csvToJson(csvData, mapping)
)

const getNormalizedCsv = ({ normalizedCsv }) => normalizedCsv
const getSelectedDimensionValue = ({ selectedDimensionValue }) => selectedDimensionValue

export const computeSumMetrics = createSelector(
  [getNormalizedCsv, getMapping, getSelectedDimensionValue],
  (normalizedCsv, mapping, selectedDimensionValue) => {
    if (mapping.metrics) {
      const sumMetrics = mapping.metrics.map((metricObject) => {
        const sum = getSum(normalizedCsv, selectedDimensionValue, metricObject.header, mapping)
        return { name: metricObject.header, sum }
      })

      return sumMetrics
    }

    return []
  }
)
