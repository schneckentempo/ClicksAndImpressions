import { sum, map, some } from 'lodash'

function hasMatchingProperty(dimensions, normalizedCsvRow, value) {
  return some(dimensions, dim => normalizedCsvRow[dim] === value)
}

export default function getSum(normalizedCsv, value, col, mapping) {
  const dimensions = mapping.dimensions.map(dimension => dimension.header)

  const sumTotal = sum(
    map(normalizedCsv, (normalizedCsvRow) => {
      if (hasMatchingProperty(dimensions, normalizedCsvRow, value)) {
        return normalizedCsvRow[col]
      }

      return 0
    })
  )

  return sumTotal
}
