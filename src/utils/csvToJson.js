import { zipObject, sortBy, tail, concat, map, uniq } from 'lodash'
import parseRow from './parseRow'

export default function csvToJson(csv, mapping) {
  const content = csv.trim().split('\n')

  const header = map(sortBy(concat(mapping.metrics, mapping.dimensions), ['index']), 'header')

  const sortByHeaders = map(mapping.dimensions, 'header')

  const normalizedCsv = sortBy(tail(content).map(row =>
    zipObject(header, parseRow(row.split(','), mapping))
  ), sortByHeaders)

  const uniques = uniq(concat(
    ...map(sortByHeaders, headerValue => map(normalizedCsv, item => item[headerValue]))
  ))

  const options = uniques.map(value => ({ value, label: value }))

  return { options, normalizedCsv }
}
