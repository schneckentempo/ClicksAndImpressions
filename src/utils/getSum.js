import { sumBy } from 'lodash'
import getColumn from './getColumn'

export default function getSum(adwordData, value, col, model) {
  const sum = sumBy(adwordData, (o) => {
    if (o[getColumn(o, 'campaign', model)] === value || o[getColumn(o, 'channel', model)] === value) {
      return o[getColumn(o, col, model)]
    }

    return 0
  })

  return sum
}
