import { sum, map, some } from 'lodash'

function hasMatchingProperty(dimensions, adwordDataRow, value) {
  return some(dimensions, dim => adwordDataRow[dim] === value)
}

export default function getSum(adwordData, value, col, mapping) {
  const dimensions = mapping.dimensions.map(dimension => dimension.header)

  const sumTotal = sum(
    map(adwordData, (adwordDataRow) => {
      if (hasMatchingProperty(dimensions, adwordDataRow, value)) {
        return adwordDataRow[col]
      }

      return 0
    })
  )

  return sumTotal
}
