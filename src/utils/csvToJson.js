import { zipObject, sortBy, tail, concat, map, uniq } from 'lodash'
import parseRow from './parseRow'

export default function csvToJson(csv, model) {
  const content = csv.trim().split('\n')

  const header = content[0].split(',')
  const sortByHeaders = map(model.dimensions, 'header')

  const adwordData = sortBy(tail(content).map(row =>
    zipObject(header, parseRow(row.split(','), model))
  ), sortByHeaders)

  const uniques = uniq(concat(
    ...map(sortByHeaders, headerValue => map(adwordData, item => item[headerValue]))
  ))

  const options = uniques.map(value => ({ value, label: value }))

  return { options, adwordData }
}
