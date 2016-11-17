import { sum, map, some } from 'lodash'

function hasMatchingProperty(dimensions, normalizedDataRow, value) {
  return some(dimensions, dim => normalizedDataRow[dim] === value)
}

export default function getSum(normalizedData, value, col, mapping) {
  const dimensions = mapping.dimensions.map(dimension => dimension.header)

  const sumTotal = sum(
    map(normalizedData, (normalizedDataRow) => {
      if (hasMatchingProperty(dimensions, normalizedDataRow, value)) {
        return normalizedDataRow[col]
      }

      return 0
    })
  )

  return sumTotal
}
